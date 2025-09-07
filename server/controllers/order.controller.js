import paystackInstance from "../config/stripe.js";
import CartProductModel from "../models/cartproduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";
import crypto from "crypto";

 export async function CashOnDeliveryOrderController(request,response){
    try {
        const userId = request.userId // auth middleware 
        const { list_items, totalAmt, addressId,subTotalAmt } = request.body 

        const payload = list_items.map(el => {
            return({
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : el.productId._id, 
                product_details : {
                    name : el.productId.name,
                    image : el.productId.image
                } ,
                paymentId : "",
                payment_status : "CASH ON DELIVERY",
                delivery_address : addressId ,
                subTotalAmt  : subTotalAmt,
                totalAmt  :  totalAmt,
            })
        })

        const generatedOrder = await OrderModel.insertMany(payload)

        ///remove from the cart
        const removeCartItems = await CartProductModel.deleteMany({ userId : userId })
        const updateInUser = await UserModel.updateOne({ _id : userId }, { shopping_cart : []})

        return response.json({
            message : "Order successfully",
            error : false,
            success : true,
            data : generatedOrder
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error ,
            error : true,
            success : false
        })
    }
}

export const pricewithDiscount = (price,dis = 1)=>{
    const discountAmout = Math.ceil((Number(price) * Number(dis)) / 100)
    const actualPrice = Number(price) - Number(discountAmout)
    return actualPrice
}

export async function paymentController(request,response){
    try {
        console.log("Payment controller called with:", request.body);
        console.log("User ID from auth:", request.userId);
        
        const userId = request.userId // auth middleware 
        const { list_items, totalAmt, addressId, subTotalAmt } = request.body 

        const user = await UserModel.findById(userId)
        console.log("User found:", user?.email);

        // Calculate total amount in kobo (Paystack uses kobo for NGN)
        const amountInKobo = Math.round(totalAmt * 100)
        console.log("Amount in kobo:", amountInKobo);

        const initializeData = {
            amount: amountInKobo,
            email: user.email,
            currency: 'NGN',
            reference: `ORD-${new mongoose.Types.ObjectId()}`,
            callback_url: `${process.env.FRONTEND_URL}/success`,
            metadata: {
                userId: userId,
                addressId: addressId,
                list_items: JSON.stringify(list_items)
            }
        }
        console.log("Initializing Paystack with:", initializeData);

        const response_paystack = await paystackInstance.transaction.initialize(initializeData)
        console.log("Paystack response:", response_paystack);

        return response.status(200).json({
            success: true,
            data: response_paystack.data
        })

    } catch (error) {
        console.log("Payment controller error:", error);
        console.log("Error message:", error.message);
        console.log("Error stack:", error.stack);
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

const getOrderProductItems = async({
    list_items,
    userId,
    addressId,
    paymentId,
    payment_status,
    totalAmt
})=>{
    const productList = []

    if(list_items?.length){
        for(const item of list_items){
            const payload = {
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : item.productId._id, 
                product_details : {
                    name : item.productId.name,
                    image : item.productId.image
                },
                paymentId : paymentId,
                payment_status : payment_status,
                delivery_address : addressId,
                subTotalAmt  : pricewithDiscount(item.productId.price, item.productId.discount),
                totalAmt  :  totalAmt / 100, // Convert from kobo back to naira
            }

            productList.push(payload)
        }
    }

    return productList
}

//http://localhost:8080/api/order/webhook
export async function webhookStripe(request,response){
    try {
        const hash = crypto.createHmac('sha512', process.env.PAYSTACK_WEBHOOK_SECRET || '')
                          .update(JSON.stringify(request.body))
                          .digest('hex');
        
        if (hash !== request.headers['x-paystack-signature']) {
            return response.status(400).json({ error: 'Invalid signature' });
        }

        const event = request.body;
        
        // Handle the event
        switch (event.event) {
            case 'charge.success':
                const data = event.data;
                const metadata = data.metadata;
                
                if (metadata && metadata.userId && metadata.addressId && metadata.list_items) {
                    const list_items = JSON.parse(metadata.list_items);
                    
                    const orderProduct = await getOrderProductItems({
                        list_items: list_items,
                        userId: metadata.userId,
                        addressId: metadata.addressId,
                        paymentId: data.reference,
                        payment_status: 'PAID',
                        totalAmt: data.amount
                    });
                    
                    const order = await OrderModel.insertMany(orderProduct);
                    
                    if(Boolean(order[0])){
                        const removeCartItems = await UserModel.findByIdAndUpdate(metadata.userId, {
                            shopping_cart: []
                        });
                        const removeCartProductDB = await CartProductModel.deleteMany({ userId: metadata.userId });
                    }
                }
                break;
            default:
                console.log(`Unhandled event type ${event.event}`);
        }

        return response.json({received: true});
        
    } catch (error) {
        console.error('Webhook error:', error);
        return response.status(500).json({ error: 'Webhook processing failed' });
    }
}

export async function getOrderDetailsController(request,response){
    try {
        const userId = request.userId // order id

        const orderlist = await OrderModel.find({ userId : userId }).sort({ createdAt : -1 }).populate('delivery_address')

        return response.json({
            message : "order list",
            data : orderlist,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}