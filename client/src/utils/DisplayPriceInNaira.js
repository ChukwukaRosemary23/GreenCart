export const DisplayPriceInNaira = (price)=>{
    return new Intl.NumberFormat('en-IN',{
        style : 'currency',
        currency : 'NGN'
    }).format(price)
}