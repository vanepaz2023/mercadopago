import mercadopage from "mercadopago";
import { ACCESS_TOKEN } from "../../config.js";

export const createOrder = async (req, res) => {

  mercadopage.configure({
    access_token: ACCESS_TOKEN,
  });

  for (let i = 0; i < req.body.cart.length; i++) {
    req.body.cart[i].unit_price= req.body.cart[i].price;
    req.body.cart[i].title= req.body.cart[i].productName;
    req.body.cart[i].currency_id= "ARS";


    
  }


for (let i = 0; i < req.body.cart.length; i++) {
   delete req.body.cart[i].price;
   delete req.body.cart[i].productName;
   delete req.body.cart[i].description;
   delete req.body.cart[i].descrp;
   delete req.body.cart[i].img;
   delete req.body.cart[i].id;



    
  }



  try {
    const result = await mercadopage.preferences.create({
      items: req.body.cart,
      payer: {
        name: req.body.user.name,
        surname: req.body.user.surname,
        email: "user@email.com",
        phone: {
            area_code: "54",
            number:  Number(req.body.user.phone)
        },
      },
   /*    items: [
        {
   
          currency_id: 'ARS',
          
          title: 'Thermogen',
       
          unit_price: 26,
          quantity: 1
        },
      ], */
      notification_url: "https://mercadopagos.onrender.com/webhook",
      back_urls: {
        success: "https://san2025chez.github.io/new-ecomerce/",
        // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
        // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
      },
    });



    // res.json({ message: "Payment creted" });
    res.json(result.body);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
   
    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(payment["data.id"]);
   /*    console.log("Guardo en BD",data.body.status);
      console.log("Guardo en BD",data.body.status_detail); */
      //store in bd
    }

 
  } catch (error) {

    return res.status(500).json({ message: "Something goes wrong" });
  }
};