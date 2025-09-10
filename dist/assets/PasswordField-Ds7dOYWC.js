import{c as o,j as e,r as l}from"./index-IQ2tqIO1.js";import{b as r}from"./FormInput-BfPccwuq.js";import{M as m}from"./mail-D1zeQPQn.js";/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],h=o("eye-off",w);/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],y=o("eye",p);/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],x=o("lock",u);function M({control:s}){return e.jsx(r,{control:s,name:"email",label:"Email",placeholder:"Masukkan email",type:"email",rules:{required:"Email wajib diisi"},leftIcon:e.jsx(m,{className:"w-5 h-5"})})}function E({control:s,name:c="password",label:t="Password",placeholder:i="Masukkan password"}){const[a,n]=l.useState(!1);return e.jsx(r,{control:s,name:c,label:t,placeholder:i,type:a?"text":"password",rules:{required:`${t} wajib diisi`},showToggle:!0,showValue:a,onToggle:()=>n(d=>!d),icon:a?e.jsx(h,{className:"w-5 h-5"}):e.jsx(y,{className:"w-5 h-5"}),leftIcon:e.jsx(x,{className:"w-5 h-5"})})}export{M as E,x as L,E as P,h as a,y as b};
