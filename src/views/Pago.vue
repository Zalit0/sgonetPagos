<script setup>


const checkPaymentStatus=async (paymentId)=>{
    return fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer TEST-1832942212664586-032214-893fff97eba29660b6e2b634a5d13443-1333094029`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Devolvemos el estado del pago (aprobado o rechazado)
      return data.status;
    })
    .catch(error => {
      console.error('Error checking payment status:', error);
      throw error;
    })
  }
 
   if (true) {
    // Consultamos el estado del pago
    checkPaymentStatus('1333094029-c4af64e7-f345-44d8-acbc-622d85d0376b')
      .then(status => {
        // Actualizamos el estado del pago en la UI
        console.log('Pago', status);
      })
      .catch(error => {
        console.error('Error checking payment status:', error);
      })
  }

</script>

<template>
    
        
    
</template>