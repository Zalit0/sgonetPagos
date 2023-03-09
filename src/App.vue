<script setup>
import {RouterView}from'vue-router'
import FooterComponent from './components/FooterComponent.vue';
import NavComponent from './components/NavComponent.vue';

</script>

<template>
<NavComponent/>
  <div class="container">
<RouterView/>
  </div>
<FooterComponent/>
</template>

<style>

</style>
