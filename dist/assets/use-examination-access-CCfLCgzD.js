import{c as m,r as i,s as l}from"./index-IQ2tqIO1.js";import{t as g}from"./examinationsApi-Dyv80Zp2.js";/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],y=m("circle-check-big",u);/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],w=m("circle-x",f);function S(c){if(!c)return"";const s=c.replace(/\D/g,"");return`https://wa.me/${s.startsWith("0")?"62"+s.slice(1):s}`}function x(c){const[s,o]=i.useState(()=>c.reduce((e,a)=>(e[a.id]=a.isVisibleToEmployee,e),{})),[d,n]=i.useState(new Set);return{accessState:s,toggleAccess:async e=>{const a=!s[e];try{n(t=>new Set(t).add(e)),await g(e,a?1:0),o(t=>({...t,[e]:a})),l({title:"Berhasil",text:`Hak akses ${a?"diaktifkan":"dinonaktifkan"}.`,icon:"success",timer:1200,showConfirmButton:!1})}catch(t){console.error(t),l({title:"Gagal",text:t?.meta?.message||"Gagal memperbarui hak akses",icon:"error"})}finally{n(t=>{const r=new Set(t);return r.delete(e),r})}},loadingIds:d}}export{y as C,w as a,S as f,x as u};
