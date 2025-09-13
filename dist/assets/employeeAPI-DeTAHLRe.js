import{c as n}from"./index-BIIL7VVf.js";import{a as e}from"./apiClient-C4E4e5VJ.js";/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],r=n("x",p),s=()=>e("get","/examinations/download-format",void 0,{responseType:"blob"}),d=(a,t)=>{const o=new FormData;return o.append("file",a),o.append("examination_batch_id",t),e("post","/examinations/import",o,{headers:{"Content-Type":"multipart/form-data"}})};export{r as X,s as d,d as i};
