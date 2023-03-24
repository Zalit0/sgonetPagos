<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';

const userStore=useUserStore()
const {cliente}=storeToRefs(userStore)

const popUp = (URL) => {
  window.open(
    URL,
    'Medidor de Velocidad',
    'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=650,height=650,left = 390,top = 50'
  );
};
</script>

<template>
  <section
    data-bs-version="5.1"
    class="features12 cid-tixrF8YTgI"
    id="features13-v"
  >
    <div class="container-fluid">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-lg-8">
          <div class="card-wrapper">
            <div class="card-box align-center">
              <h3 class="card-title mb-4">
                <strong>Línea de Contacto! 3855027759</strong>
              </h3>
              <p class="mbr-text mbr-fonts-style mb-4 display-7">
                También les recordamos los horario de atención son de
                <strong>Lunes a Viernes: 08:30hs a 21hs</strong> y
                <strong>Sábados de: 09hs a 18hs</strong>, días feriados no hay
                operadores.<br /><br /><strong>COMUNICADO</strong>: Nuevos
                Abonos desde <strong>Enero 2023 </strong><br /><strong
                  >5 Megas: $1700 | 6 Megas: $2100 | 7 Megas: $2600 | 8 Megas:
                  $3000</strong
                ><br />
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div
            class="item mbr-flex"
            data-aos="fade-left"
            data-aos-easing="ease-in-sine"
          >
            <div class="icon-box">
              <span class="mbr-iconfont mobi-mbri-globe-2 mobi-mbri"></span>
            </div>
            <div class="text-box">
              <h4 class="icon-title mbr-black mbr-fonts-style display-7">
                <strong>Medidor de Velocidad</strong>
              </h4>
              <h5 class="icon-text mbr-black mbr-fonts-style display-4">
                <a
                  @click="popUp('https://sgonet.speedtestcustom.com')"
                  class="text-secondary"
                  target="_blank"
                  ><strong>Mide la velocidad de tu Internet</strong></a
                >
              </h5>
            </div>
          </div>
          <div
            class="item mbr-flex"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-delay="200"
            data-aos-easing="ease-in-sine"
          >
            <div class="icon-box">
              <span class="mbr-iconfont mobi-mbri-update mobi-mbri"></span>
            </div>
            <div class="text-box">
              <h5 class="icon-text mbr-black mbr-fonts-style display-4">
                <a @click="popUp(`https://api.whatsapp.com/send?phone=+543855212030&text=Hola!!%20Mi%20nombre%20es%20${cliente.name}%20y%20quisiera%20pedir%20un%20cambio%20de%20servicio.%20Actualmente%20tengo%20el%20abono%20de%20${cliente.abono}.%20Aguardo%20su%20respuesta.%20Muchas%20Gracias!`)" class="btn btn-success btn-sm"
                  >Solicitar o Modificar Servicios</a
                >
              </h5>
            </div>
          </div>
          <div
            class="item mbr-flex"
            data-aos="fade-left"
            data-aos-offset="300"
            data-aos-delay="400"
            data-aos-easing="ease-in-sine"
          >
            <div class="icon-box">
              <span class="mbr-iconfont mobi-mbri-user-2 mobi-mbri"></span>
            </div>
            <div class="text-box">
              <h4 class="icon-title mbr-black mbr-fonts-style display-7">
                <strong>PAGO POR TRANSFERENCIA</strong>
              </h4>
              <h5 class="icon-text mbr-black mbr-fonts-style display-4">
                <strong>CVU</strong>: 0000003100079804271431
                <div><strong>ALIAS</strong>: santiagonet.mp</div>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
