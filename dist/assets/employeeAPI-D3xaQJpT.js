import{c as n}from"./index-DYAhuHJB.js";import{a}from"./apiClient-BmXS3_vS.js";/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],d=n("x",s),m=()=>a("get","/examinations/download",void 0,{responseType:"blob"}),r=(o,t)=>{const e=new FormData;return e.append("file",o),e.append("examination_batch_id",t),a("post","/examinations/import",e,{headers:{"Content-Type":"multipart/form-data"}})},l=o=>a("get",`/examination-results/${o}/download`,void 0,{responseType:"blob"});export{d as X,l as a,m as d,r as i};
