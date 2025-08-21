import { Resend } from 'resend';
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.RESEND_API){
    console.log("Provide RESEND_API in side the .env file")
}

const resend = new Resend(process.env.RESEND_API);

// Rate limiting variables
let lastEmailTime = 0;
const MIN_EMAIL_INTERVAL = 1000; // 1 second between emails

const sendEmail = async({sendTo, subject, html })=>{
    try {
        // Rate limiting check
        const now = Date.now();
        const timeSinceLastEmail = now - lastEmailTime;
        
        if (timeSinceLastEmail < MIN_EMAIL_INTERVAL) {
            const waitTime = MIN_EMAIL_INTERVAL - timeSinceLastEmail;
            console.log(`Rate limiting: waiting ${waitTime}ms before sending email`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        
        // Update last email time
        lastEmailTime = Date.now();
        
        console.log(`Sending email to: ${sendTo}`);
        console.log(`Subject: ${subject}`);
        
        const { data, error } = await resend.emails.send({
            from: 'GreenCart <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });

        if (error) {
            console.error('Resend API error:', error);
            return { success: false, error };
        }

        console.log('Email sent successfully:', data);
        return { success: true, data };
        
    } catch (error) {
        console.log('SendEmail function error:', error);
        return { success: false, error };
    }
}

export default sendEmail