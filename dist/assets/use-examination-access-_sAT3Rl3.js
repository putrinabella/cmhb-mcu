import{c as m,r,s as l}from"./index-BIIL7VVf.js";import{a as u}from"./apiClient-C4E4e5VJ.js";/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],w=m("circle-check-big",d);/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],x=m("circle-x",g);function S(a){if(!a)return"";const e=a.replace(/\D/g,"");return`https://wa.me/${e.startsWith("0")?"62"+e.slice(1):e}`}const f=(a,e)=>u("post","/examinations/access",{examinations:[{id:a,is_visible_to_employee:e}]});function _(a){const[e,o]=r.useState(()=>a.reduce((t,c)=>(t[c.id]=c.isVisibleToEmployee,t),{})),[p,n]=r.useState(new Set);return{accessState:e,toggleAccess:async t=>{const c=!e[t];try{n(s=>new Set(s).add(t)),await f(t,c?1:0),o(s=>({...s,[t]:c})),l({title:"Berhasil",text:`Hak akses ${c?"diaktifkan":"dinonaktifkan"}.`,icon:"success",timer:1200,showConfirmButton:!1})}catch(s){console.error(s),l({title:"Gagal",text:s?.meta?.message||"Gagal memperbarui hak akses",icon:"error"})}finally{n(s=>{const i=new Set(s);return i.delete(t),i})}},loadingIds:p}}export{w as C,x as a,S as f,_ as u};
