<script setup>
import { storeToRefs } from 'pinia';
import {RouterView}from'vue-router'
import FooterComponent from './components/FooterComponent.vue';
import NavComponent from './components/NavComponent.vue';
import { useUserStore } from './stores/userStore';

const userStore=useUserStore()
const {loading}=storeToRefs(userStore)

</script>

<template>
<NavComponent v-if="!loading"/>
<div v-if="loading" class="d-flex justify-content-center align-items-center">
  <strong>Loading...</strong>
  <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
</div>
  <div v-if="!loading" class="container">
<RouterView/>
  </div>
<FooterComponent/>
</template>

<style>

</style>
