import{u as _,s as m,m as h,Z as d,Y as i,o as t,c as a,d as c,l as f,a as o,aa as v,h as l}from"./index-99ec7279.js";const w={class:"row"},P={key:0,class:"row"},k=o("div",{class:"col-md-12"},[o("p",null,[o("img",{src:"https://www.santiagonet.com.ar/sitio/pagos/mercadopago-pago-no.jpg",alt:"Pago Rechazado"})])],-1),y=[k],j={key:1,align:"row"},x=o("div",{class:"col-md-12"},[o("p",null,[o("img",{src:"https://www.santiagonet.com.ar/sitio/pagos/mercadopago-pago-ok.jpg",alt:"Pago Ok"})])],-1),R=[x],b={key:2,align:"row"},S=o("div",{class:"col-md-12"},[o("p",null,[o("img",{src:"https://www.santiagonet.com.ar/sitio/pagos/mercadopago-pago-proceso.jpg",alt:"Pago en Proceso"})])],-1),z=[S],V={__name:"Pago",setup(B){const p=_(),{cliente:u}=m(p),n=h(),g=()=>{u.value=JSON.parse(localStorage.getItem("cliente")),v.push("/client-area")},e=n.query.status,r=n.query.external_reference;if(e=="approved"){const s=d(l,"facturas",r);i(s,{estado:"Pagado"}),console.log("documento actualizado")}else{const s=d(l,"facturas",r);i(s,{estado:"Pendiente"}),console.log("documento actualizado")}return(s,C)=>(t(),a("div",w,[c(e)=="rejected"?(t(),a("div",P,y)):c(e)=="approved"?(t(),a("div",j,R)):c(e)=="pending"?(t(),a("div",b,z)):f("",!0),o("div",{class:"row d-flex justify-content-center"},[o("div",{class:"col-md-6 d-flex justify-content-center"},[o("button",{class:"btn btn-success",onClick:g},"Volver a su apartado Privado")])])]))}};export{V as default};