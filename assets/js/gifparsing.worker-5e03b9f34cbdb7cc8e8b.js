!function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="/",t(t.s=0)}([function(e,r){self.onmessage=e=>{try{const r=function(e){let r=0;const t=[];let n=null;const o=[],a=[];let s=0;if(71!==e[0]||73!==e[1]||70!==e[2]||56!==e[3]||57!==e[4]||97!==e[5])throw new Error("parseGIF: no GIF89a");{r+=+!!(128&e[10])*Math.pow(2,1+(7&e[10]))*3+13;const u=e.subarray(0,r);for(;e[r]&&59!==e[r];){const l=r,f=e[r];if(33===f){const o=e[++r];if(-1===[1,254,249,255].indexOf(o))throw new Error("parseGIF: unknown label");for(249===o&&t.push(10*(e[r+3]+(e[r+4]<<8))),255===o&&(s=e[r+15]+(e[r+16]<<8));e[++r];)r+=e[r];249===o&&(n=e.subarray(l,r+1),a.push(n[3]>>2&7))}else{if(44!==f)throw new Error("parseGIF: unknown blockId");{for(r+=9,r+=+!!(128&e[r])*(3*Math.pow(2,1+(7&e[r])))+1;e[++r];)r+=e[r];const t=e.subarray(l,r+1);o.push(URL.createObjectURL(new Blob([u,n,t])))}}r++}}return{delayTimes:t,loopCnt:s,frames:o,disposals:a}}(new Uint8Array(e.data.payload));self.postMessage({id:e.data.id,result:r})}catch(r){self.postMessage({id:e.data.id,err:r.message})}}}]);
//# sourceMappingURL=gifparsing.worker-5e03b9f34cbdb7cc8e8b.js.map