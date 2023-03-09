<script setup>
import InfoClient from '../components/InfoClient.vue';
import SectionMsj from '../components/SectionMsj.vue';
import PagoMes from '../components/PagoMes.vue';
</script>

<template>
  <div class="container-fluid">
    <div class="row justify content center">
      <div class="col-12">
        <SectionMsj />
      </div>
      <div class="col-12">
        <InfoClient />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <section
          data-bs-version="5.1"
          class="features3 cid-tpo5eY0ypl"
          id="features3-z"
        >
          <div class="container">
            <div class="row mt-4">
              <PagoMes />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
