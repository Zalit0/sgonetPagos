<script setup>
import { ref } from 'vue';
const pago = ref(null);
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
    items: [
      {
        title: description,
        quantity: 1,
        currency_id: 'ARS',
        unit_price: amount,
      },
    ],
    auto_return: 'approved',
    back_urls: {
      failure:
        'https://vitejsvite4qjudq-5lwz--5173.local-corp.webcontainer.io/fallo',
      pending:
        'https://vitejsvite4qjudq-5lwz--5173.local-corp.webcontainer.io/pendiente',
      success:
        'https://vitejsvite4qjudq-5lwz--5173.local-corp.webcontainer.io/pago',
    },
    payer: {
      email: 'test@test.com.ar',
    },
  };

  // Enviamos una solicitud a la API de MercadoPago para crear un pago
  try {
    const response = await fetch(
      'https://api.mercadopago.com/checkout/preferences',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer TEST-1832942212664586-032214-893fff97eba29660b6e2b634a5d13443-1333094029`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      }
    );
    const data = await response.json();
    // Abrimos la ventana de pago de MercadoPago
    window.open(data.init_point, '_blank');
    pago.value = data;
    return data;
  } catch (error) {
    console.log('Error creating payment:', error);
    // Rechazamos la promesa con el error
    throw error;
  }
}
const checkPaymentStatus = async (paymentId) => {
  await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer TEST-1832942212664586-032214-893fff97eba29660b6e2b634a5d13443-1333094029`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Devolvemos el estado del pago (aprobado o rechazado)
      console.log(data.status);
    })
    .catch((error) => {
      console.error('Error checking payment status:', error);
      throw error;
    });
};
</script>

<template>
  <h2>Cuenta Corriente</h2>

  <div>
    <button @click="createPayment(100, 'Articulo 2 de Prueba')">Pagar</button>
    <div id="checkout">{{ pago }}</div>
  </div>
  <div>
    <button @click="checkPaymentStatus(pago.id)" class="btn btn-secondary">
      Comprobar Pago
    </button>
    <div></div>
  </div>
</template>
