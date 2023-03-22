<script setup>
import Mercadopago from 'mercadopago';
const props = defineProps(['cta'])
const informarPago=(cta)=>{
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

     window.open(`https://api.whatsapp.com/send?phone=+543855212030&text=Quiero%20informar%20el%20pago%20del%20Cliente%20${cta.name}%20correspondiente%20al%20mes%20${cta.mes}%20del%20abono%20${cta.abono}%20MEGAS%20con%20vencimiento%20el%20dia%206%20de%20${cta.mes}`, "Informar Pago", params);
}
Mercadopago.setPublishableKey('TEST-def54012-a6a2-4358-9fc9-4c7bd3a5cb71');

</script>
<template>
    <div class="item-wrapper">
        <div class="item-img">
            <img :src="`/img/${cta.abono}MEGAS.jpg`" alt="SGONET DIGITAL">
        </div>
        <div class="item-content">
            <h3 class="item-title mbr-fonts-style display-9 color-success"><strong>{{ cta.mes }}</strong></h3>

            <p class="mbr-text mbr-fonts-style mt-3 display-7"><strong>Vencimiento</strong>: 06 de {{ cta.mes }}<br><strong>ABONO {{
                cta.abono }} MEGAS</strong>: ${{ cta.precio }}&nbsp;<br><strong>NOTA</strong>: Una vez realizado el pago
                enviar comprobante de pago.</p>
        </div>
        <div class="mbr-section-btn item-footer mt-2"><div v-if="cta.estado == 'Pendiente'" class="input-group">
         <button class="btn item-btn btn-success display-7 text-transform-capitalize"> Pagar </button>  
         <button class="btn item-btn btn-sm btn-black display-7 text-transform-capitalize" @click="informarPago(cta)"> Informar Pago </button>  
         </div>
            <button class="btn item-btn btn-black display-7 text-transform-capitalize" v-else-if="cta.estado != 'Pagado'">{{ cta.estado }} </button>  <button class="btn item-btn btn-black display-7 text-transform-capitalize" v-else disabled>Pagado</button></div>
    </div>
</template>