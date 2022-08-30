import express from "express";
import paypal from 'paypal-rest-sdk'


const paypalRouter = express.Router();

/*
const return_url = "https://human-relief-api.herokuapp.com/success";
const cancel_url = "https://human-relief-api.herokuapp.com/cancel";
*/
const return_url = "http://localhost:5000/success";
const cancel_url = "http://localhost:5000/cancel";


paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AaKWJXEL670WfVMvnA7dOiPm7yRlvg2ETiH-E6CcDjuGrbEYE9pT5TCXdS-JHyWCtxIqVo8MIgLEKN6_',
  'client_secret': 'EGczKasQAKWS-UqWHNj-3SM3BHnZ4omDg6DbxOf0_HVFqRjvl9GpyuHY1Qz7vf3rC_jBt-1unBIUG4AG'
});


paypalRouter.get("/", (req, res) => {
  res.render("index");
})

paypalRouter.get("/paypal", (req, res) => {
  var create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": return_url,
      "cancel_url": cancel_url
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "item",
          "sku": "item",
          "price": "1.00",
          "currency": "USD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "USD",
        "total": "1.00"
      },
      "description": "This is the payment description."
    }]
  };


  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log("Create Payment Response");
      console.log(payment);
      res.redirect(payment.links[1].href);
    }
  });
})


paypalRouter.get('/success',(req,res)=>{
  var PayerID = req.query.PayerID;
  var paymentId = req.query.paymentId;
  var execute_payment_json = {
      payer_id: PayerID,
      transactions: [
          {
              amount: {
                  currency: "USD",
                  total: "1.00"
              }
          }
      ]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function(
      error,
      payment
  ) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log("Get Payment Response");
          console.log(JSON.stringify(payment));
          console.log(JSON.stringify(payment.id));
          res.render("success",{paymentId:payment.id});
          window.ReactNativeWebView.postMessage('Sonu Verma');
      }
  });
})

paypalRouter.get('/cancel',(req,res)=>{
  res.render('cancel');
})


export default paypalRouter;
