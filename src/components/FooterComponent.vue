<script setup>
const anio = new Date().getFullYear();
</script>

<template>
  <footer
    data-bs-version="5.1"
    class="footer3 cid-s48P1Icc8J mt-4 position-sticky bottom-0"
    once="footers"
    id="footer3-i"
  >
    <div class="container">
      <div class="media-container-row align-center mbr-white">
        <div class="row row-copirayt">
          <p
            class="
              mbr-text
              mb-0
              mbr-fonts-style mbr-white
              align-center
              display-7
            "
          >
            © Copyright 2018 - {{ anio }} |<strong> SANTIAGO[NET]</strong> -
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
<style>
/* .footer3 {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 30px;
}
.row-copirayt {
  position: relative;
  bottom: 10px;
} */
</style>
