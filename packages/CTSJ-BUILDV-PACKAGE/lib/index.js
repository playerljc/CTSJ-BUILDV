module.exports=function(n){var r={};function o(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}return o.m=n,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o(o.s=1)}([function(e,t){e.exports=require("moment")},function(e,t,n){"use strict";n.r(t);var r=function(){var n=this,e=n.$createElement,r=n._self._c||e;return r("div",{staticClass:"ctsj-buildv-package"},[r("a-table",{attrs:{columns:n.columns,"data-source":n.data},scopedSlots:n._u([{key:"name",fn:function(e){return r("a",{},[n._v(n._s(e))])}},{key:"tags",fn:function(e){return r("span",{},n._l(e,function(e){return r("a-tag",{key:e,attrs:{color:"loser"===e?"volcano":5<e.length?"geekblue":"green"}},[n._v(" "+n._s(e.toUpperCase())+" ")])}),1)}},{key:"action",fn:function(e,t){return r("span",{},[r("a",[n._v("Invite 一 "+n._s(t.name))]),r("a-divider",{attrs:{type:"vertical"}}),r("a",[n._v("Delete")]),r("a-divider",{attrs:{type:"vertical"}}),r("a",{staticClass:"ant-dropdown-link"},[n._v(" More actions "),r("a-icon",{attrs:{type:"down"}})],1)],1)}}])},[r("span",{attrs:{slot:"customTitle"},slot:"customTitle"},[r("a-icon",{attrs:{type:"smile-o"}}),n._v(" Name")],1)])],1)};r._withStripped=!0;var o,a,s=n(0),i=n.n(s),r=(n={name:"my-component",props:{data:{type:Array,default:[]}},data:function(){return{columns:[{dataIndex:"name",key:"name",slots:{title:"customTitle"},scopedSlots:{customRender:"name"}},{title:"Age",dataIndex:"age",key:"age"},{title:"Address",dataIndex:"address",key:"address"},{title:"Tags",key:"tags",dataIndex:"tags",scopedSlots:{customRender:"tags"}},{title:"Action",key:"action",scopedSlots:{customRender:"action"}}]}},computed:{time:function(){return i()().valueOf()}}},s=r,(r="function"==typeof n?n.options:n).render=s,r.staticRenderFns=[],r._compiled=!0,o&&(r.functional?(r._injectStyles=o,a=r.render,r.render=function(e,t){return o.call(t),a(e,t)}):(s=r.beforeCreate,r.beforeCreate=s?[].concat(s,o):[o])),{exports:n,options:r});r.options.__file="CTSJ-BUILDV-PACKAGE/src/index.vue";var u=r.exports;u.install=function(e){e.component(u.name,u)},t.default=u}]).default;
//# sourceMappingURL=index.js.map
