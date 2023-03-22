<script setup>
const access_token = "TEST-2831508562254801-060417-704099359de51fbd47b702f7dac1a8cc-89431232";
const url = "https://api.mercadopago.com/checkout/preferences";

const realizarPago= async()=>{
    try {
       // Crear la preferencia de pago
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: [
                    {
                        title: "Producto 1",
                        quantity: 1,
                        currency_id: "ARS",
                        unit_price: 100,
                    },
                ],
                back_urls: {success:"localhost",pendig:'pendiente',failure:'localhost/failure  '},
            }),
        });
        
        // Obtener la respuesta y redirigir al usuario a la página de pago
        const preference = await response.json();
        window.location.href = preference.init_point;
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    
    <h2>Cuenta Corriente</h2>
<button class="btn bt-primary" @click="realizarPago">Pagar</button>


</template>

