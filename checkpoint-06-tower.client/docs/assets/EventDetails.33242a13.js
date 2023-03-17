import{_ as y,w as g,d as v,l as n,P as r,j as k,e as f,c as s,a as t,t as d,k as l,F as p,r as C,f as w,u as b,i as E,o as c,A as _,p as I,h as x}from"./index.c3077319.js";const S={setup(){const o=b();async function i(){try{const e=o.params.id;await k.get_selected_event(e)}catch(e){r.error(e.message),n.error(e)}}async function h(){try{const e=o.params.id;n.log(e),await f.get_selected_event_tickets(e)}catch(e){r.error(e.message),n.error(e)}}return g(()=>{i(),h()}),{events:v(()=>_.event),account:v(()=>_.account),tickets:v(()=>_.tickets),foundTicket:v(()=>_.tickets.find(e=>e.accountId==_.account.id)),async cancel_selected_event(){try{const e=o.params.id;n.log(e,"EVENT ID"),await r.confirm()&&await k.cancel_selected_event(e)}catch(e){r.error(e.message),n.error(e)}},async create_ticket(){try{const e=o.params.id;n.log("event id for ticket",e),await f.create_ticket(e)}catch(e){r.error(e.message),n.error(e)}},async delete_ticket(e){try{await f.delete_ticket(e)}catch(m){r.error(m.message),n.error(m)}}}}},N=o=>(I("data-v-08120739"),o=o(),x(),o),T={key:0,class:"component"},D={class:"container-fluid card mt-3"},V={class:"row"},j={class:"col-5 p-0"},A=["src"],L=["src"],B={class:"col-7"},F={class:"row justify-content-between"},P={class:"col-6 fs-2"},R={class:"col-6 text-end"},G={class:"row justify-content-between"},W={class:"col-6 fs-5"},q={class:"row"},z={class:"col-12"},H={class:"py-2"},J={class:"row mt-5 justify-content-between"},K={key:0,class:"col-6 text-start"},M={key:1,class:"col-6 text-start"},O=N(()=>t("span",{class:"fs-2 text-danger"}," EVENT IS CANCELLED!",-1)),Q=[O],U={class:"col-6 text-end"},X={key:0,class:"btn btn-danger"},Y={class:"container-fluid p-0 my-3 card"},Z={class:"d-flex flex-row"},$={class:"p-2 profile-picture"},ee=["src","alt","title"],te=["onClick"],se={class:"container-fluid p-0"},ce={class:"card"};function oe(o,i,h,e,m,ne){const u=E("CommentsComp");return e.events?(c(),s("div",T,[t("div",D,[t("div",V,[t("div",j,[e.events.isCanceled==!1?(c(),s("img",{key:0,class:"img-fluid",src:e.events.coverImg,alt:""},null,8,A)):(c(),s("img",{key:1,class:"img-fluid event-img-c",src:e.events.coverImg,alt:""},null,8,L))]),t("div",B,[t("div",F,[t("div",P,d(e.events.name),1),t("div",R," Starts: "+d(e.events.startDate),1)]),t("div",G,[t("div",W," Where?: "+d(e.events.location),1)]),t("div",q,[t("div",z,[t("b",null,d(e.events.type),1),t("div",H,d(e.events.description),1)])]),t("div",J,[e.events.isCanceled==!1?(c(),s("div",K," Capacity left: "+d(e.events.capacity),1)):(c(),s("div",M,Q)),t("div",U,[e.events.isCanceled==!0||e.events.capacity==0?(c(),s("button",X,"Event is unavailable")):l("",!0),e.events.isCanceled==!1&&e.events.capacity>=1&&!e.foundTicket?(c(),s("button",{key:1,onClick:i[0]||(i[0]=a=>e.create_ticket()),class:"btn btn-info"},"Get Tickets")):l("",!0),e.events.creatorId===e.account.id&&e.events.isCanceled==!1?(c(),s("button",{key:2,onClick:i[1]||(i[1]=a=>e.cancel_selected_event()),class:"btn btn-danger"},"CANCEL EVENT")):l("",!0)])])])])]),t("div",Y,[t("div",Z,[(c(!0),s(p,null,C(e.tickets,a=>(c(),s("div",$,[t("img",{class:"img-fluid",src:a.profile.picture,alt:a.profile.name+" picture",title:a.profile.name},null,8,ee),a.accountId==e.account.id?(c(),s("button",{key:0,onClick:ae=>e.delete_ticket(a.id)},"Revoke Ticket",8,te)):l("",!0)]))),256))])]),t("div",se,[t("div",ce,[w(u,{comments:o.comments},null,8,["comments"])])])])):l("",!0)}const re=y(S,[["render",oe],["__scopeId","data-v-08120739"]]);export{re as default};