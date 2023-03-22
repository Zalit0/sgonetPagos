<script setup>
import { storeToRefs } from 'pinia';
import { useFirebaseHook } from '../composables/useFirebase';
import { useUserStore } from '../stores/userStore';
import { useAdminStore } from '../stores/adminStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const adminStore = useAdminStore()
const { admin } = storeToRefs(adminStore)
const { $reset } = userStore
const { cliente } = storeToRefs(userStore)
const anio = new Date().getFullYear()
const firebase = useFirebaseHook()
const { cerrarSesion } = firebase
const router=useRouter()

const logOut=()=>{
    cerrarSesion();
    router.push('/')
}

</script>
<template>
    <section data-bs-version="5.1" class="menu cid-s48OLK6784" once="menu" id="menu1-h">

        <nav class="navbar navbar-dropdown navbar-expand-lg">
            <div class="container">
                <div class="navbar-brand">
                    <span class="navbar-logo">

                        <img src="../assets/images/mbr-121x91.jpg" alt="" title="" style="height: 3.8rem;">

                    </span>
                    <span class="navbar-caption-wrap"><span v-if="cliente"
                            class="navbar-caption text-black align-items-center text-transform-capitalize text-primary display-7">Cliente:
                            {{ cliente?.name }} <button @click="$reset()" class="btn btn-danger">Salir</button></span><span
                            v-if="admin"
                            class="navbar-caption text-black align-items-center text-transform-capitalize text-primary display-7">Admin:
                            {{ admin }} </span></span>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-bs-toggle="collapse"
                    data-target="#navbarSupportedContent" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <div class="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
                <div v-if="!cliente">
                    <div class="containter">
                        <div class="row">
                            <div class="col-12 align-items-right">
                                <button class="btn-secondary" v-if="admin" @click="logOut">Cerrar Sesion</button>
                                <!-- <button class="btn btn-success">Ir a la Pagina Principal de SantiagoNet</button> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="cliente" class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="false">
                        <li class="nav-item"><span class="nav-link link text-black text-primary display-4"><span
                                    class="socicon socicon-rss mbr-iconfont mbr-iconfont-btn"></span>SECTOR:
                                {{ cliente?.zona.toUpperCase() }}</span></li>
                        <li class="nav-item"><span class="nav-link link text-black text-primary display-4"><span
                                    class="mobi-mbri mobi-mbri-globe-2 mbr-iconfont mbr-iconfont-btn"></span>ABONO:
                                {{ cliente?.abono.toUpperCase() }}</span>
                        </li>
                        <li class="nav-item"><span class="nav-link link text-black text-primary display-4"><span
                                    class="mobi-mbri mobi-mbri-cash mbr-iconfont mbr-iconfont-btn"></span>COBRO:
                                ONLINE</span>
                        </li>
                        <li class="nav-item"><span class="nav-link link text-black text-primary display-4">
                                AÑO: {{ anio }}</span></li>
                    </ul>


                </div>
            </div>
        </nav>

</section></template>