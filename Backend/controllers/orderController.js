const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const Stripe = require('stripe')
const stripe = new Stripe("sk_test_51POmj7DD8cIH01LEtZVOPCAGBkWLOLtlTvRysx1qTdCOnKox1A8Ix0IOuVWKvZhp70Z25eT0p0ah8DIPE7R07FML00vLCV76mJ");

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    
    try {
        const { userId, items, amount, address } = req.body;

        // Create a new order
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address
        });
        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Prepare line items for Stripe
        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount:Math.round(item.price * 100)
            },
            quantity: item.quantity
        }));
        console.log(line_items)

        // Add delivery charges to line items
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: Math.round(amount * 0.07 * 100)
            },
            quantity: 1
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        // // Send bill email
        // const userEmail = req.user.email; // Assuming you have middleware to extract user from token
        // const billContent = {
        //     to: userEmail,
        //     subject: 'Your Bill',
        //     text: `Hi ${req.user.name},\n\nHere is your bill for the order:\nTotal Amount: Rs ${amount}\nItems: ${items.map(item => `${item.name} x ${item.quantity}`).join('\n')}`
        // };
        // await sendMail(billContent);

        
        // Respond with the session URL
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error('Error generated:', error);
        res.json({ success: false, message: "Error placing order" });
    }
}

const verify=async(req,res)=>{
    const {orderId,success} = req.body;
    try {
        if(success==='true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"paid"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"not paid"});
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"});
    }
}

// user orders for frontend
const userOrder = async(req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        
        res.json({success:true,data:orders})
    } catch (error) {
        res.json({success:false,message:"error"})
        console.log("error");
    }
}

// listing orders for admin panel
const listOrder = async(req,res)=>{
    try {
        const order = await orderModel.find({})
        res.json({success:true,data:order})
    } catch (error) {
        res.json({success:false,message:"Error"})
    }
}
const updateStatus = async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"status updated"})
    }catch(error){
        res.json({success:false,message:"status not updated"})
    }
}
module.exports = {placeOrder,verify,userOrder,listOrder,updateStatus};
