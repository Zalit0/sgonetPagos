<script setup>

import InfoClient from '../components/InfoClient.vue';
import SectionMsj from '../components/SectionMsj.vue';
import PagoMes from '../components/PagoMes.vue';
import { useAdminStore } from '../stores/adminStore';
import {useUserStore} from '../stores/userStore'
const adminStore=useAdminStore()
const {ctaCte}=adminStore
const userStore=useUserStore()
const {cliente}=userStore

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
            <template v-for="(cta, index) in ctaCte" :key="index">
              <div class="item features-image сol-12 col-md-6 col-lg-4" v-if="cta.dni==cliente.id">
              <PagoMes :cta="cta" />
              </div>
            </template>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
