import{u as c,s as d,r as u,o as v,c as _,a as e,w as p,v as b,b as m}from"./index-99ec7279.js";const f={class:"container p-5"},g=e("div",{class:"row"},[e("div",{class:"col-12 text-center"},[e("h1",null,"Por favor ingrese el numero de DNI del abonado.")])],-1),h={class:"row justify-content-center"},w={class:"col-md-12 col-xl-4"},x={class:"col-md-12 col-xl-2 d-grid gap-2"},I=["disabled"],N={__name:"HomeView",setup(y){const t=c(),{getCliente:l}=t,{cliente:r}=d(t),s=u(null),i=async n=>{await l(n),r.value||alert("El DNI no corresponde a un abonado en Servicio")};return(n,o)=>(v(),_("div",f,[g,e("form",{onSubmit:o[1]||(o[1]=m(a=>i(s.value),["prevent"]))},[e("div",h,[e("div",w,[p(e("input",{type:"text","onUpdate:modelValue":o[0]||(o[0]=a=>s.value=a),class:"form-control",placeholder:"Ingrese su DNI","aria-label":"Ingrese su DNI","aria-describedby":"button-addon2"},null,512),[[b,s.value]])]),e("div",x,[e("button",{class:"btn btn-primary",disabled:!s.value},"Ingresar",8,I)])])],32)]))}};export{N as default};
