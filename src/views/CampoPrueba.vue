<script setup>
import { ref } from 'vue';
// async function createPreference(amount, description, email) {
//   const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
//     method: 'POST',
//     headers: {
//       'Authorization': 'Bearer TEST-1832942212664586-032214-893fff97eba29660b6e2b634a5d13443-1333094029',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       items: [{
//         title: description,
//         quantity: 1,
//         currency_id: 'ARS',
//         unit_price: amount
//       }],
//       payer: {
//         email: email
//       }
//     })
//   });
//   const data = await response.json();
//   console.log(data)
//   return data;
// }
// const data=ref(createPreference(1000,'Articulo de Prueba', 'info@optiacroma.com.ar'))

// createPayment(amount, description) {
//     // ...
//     return fetch('https://api.mercadopago.com/checkout/preferences', {
//       // ...
//     })
//     .then(response => response.json())
//     .then(data => {
//       // ...
//       this.paymentId = data.id;
//       return data;
//     })

async function createPayment(amount, description) {
    // Definimos los datos del pago
    const paymentData = {
      transaction_amount: amount,
      description: description,
      payment_method_id: 'visa',
      payer: {
        email: 'test_user_123456@testuser.com'
      }
    }

    // Enviamos una solicitud a la API de MercadoPago para crear un pago
    try {
const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
method: 'POST',
headers: {
'Authorization': `Bearer ${this.accessToken}`,
'Content-Type': 'application/json'
},
body: JSON.stringify(paymentData)
});
const data = await response.json();
// Abrimos la ventana de pago de MercadoPago
window.open(data.init_point, '_blank');
return data;
} catch (error) {
console.error('Error creating payment:', error);
// Rechazamos la promesa con el error
throw error;
}
  }

</script>

<template>
    
    <h2>Cuenta Corriente</h2>
   
    <div>
    <button @click="createPayment(100,'Articulo 2 de Prueba')">Pagar</button>
    <div id="checkout"></div>
  </div>
</template>

