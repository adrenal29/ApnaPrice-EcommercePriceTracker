//components->MakePaymentComponent.js
"use client"
import React from 'react'

const MakePaymentComponent = (props) => {
    const makePayment = async () => {
        //console.log("here...");
        console.log(props.price)
        const res = await initializeRazorpay();
        if (!res) {
          alert("Razorpay SDK Failed to load");
          return;
        }
        // Make API call to the serverless API
        const data = await fetch("/api/razorpay",
        {
             method: "POST",
             headers: {
                'Content-Type': 'application/json',
            },
             body: JSON.stringify({
                taxAmt:props.price
             })
         }
        )
        const detail=await data.json();
        console.log(detail);

        var options = {
          key: "rzp_test_b3VDdZqg6seeiK", // Enter the Key ID generated from the Dashboard
          name: "Apna Price",
          currency: detail.currency,
          amount: +detail.amount,
          order_id: detail.id,
          description: "Thankyou for your purchase",
          image: "",
          handler: function (response) {
            // Validate payment at server - using webhooks is a better idea.
            alert("Razorpay Response: "+response.razorpay_payment_id);
            //alert(response.razorpay_order_id);
            //alert(response.razorpay_signature);
          },
          prefill: {
            name:"Apna Price",
            email:"mohit@apnaPrice.ac.in",
            contact:'9853785519'

          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };
      const initializeRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          // document.body.appendChild(script);

          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };

          document.body.appendChild(script);
        });
      }
  return (
    <div>
        <button onClick={()=>makePayment()}>Buy now with apnaCash</button>
    </div>
  )
}

export default MakePaymentComponent;