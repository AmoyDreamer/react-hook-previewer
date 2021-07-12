import{useState,useMemo}from"react";function _slicedToArray(e,r){return _arrayWithHoles(e)||_iterableToArrayLimit(e,r)||_unsupportedIterableToArray(e,r)||_nonIterableRest()}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _iterableToArrayLimit(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,o,a=[],i=!0,l=!1;try{for(t=t.call(e);!(i=(n=t.next()).done)&&(a.push(n.value),!r||a.length!==r);i=!0);}catch(e){l=!0,o=e}finally{try{i||null==t.return||t.return()}finally{if(l)throw o}}return a}}function _unsupportedIterableToArray(e,r){if(e){if("string"==typeof e)return _arrayLikeToArray(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(t="Object"===t&&e.constructor?e.constructor.name:t)||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,r):void 0}}function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var FullScreenStyle={position:"fixed",top:0,bottom:0,left:0,right:0,backgroundColor:"rgba(0, 0, 0, .8)",zIndex:999},AbsoluteCenterStyle={position:"absolute",top:"50%",left:"50%",marginRight:"-50%",MsTransform:"translate(-50%, -50%)",MozTransform:"translate(-50%, -50%)",WebkitTransform:"translate(-50%, -50%)",OTransform:"translate(-50%, -50%)",transform:"translate(-50%, -50%)"},GetPreviewImageSize=function(e){var s=1<arguments.length&&void 0!==arguments[1]?arguments[1]:.7;return new Promise(function(l,r){var u=new Image;u.onload=function(){var e,r,t=u.width,n=u.height,o=window.screen.width,a=window.screen.height,i=t/n;o/a<=i?r=(e=n<t?o:o*s)/i:e=(r=a*s)*i,l({width:e+"px",height:r+"px"})},u.onerror=function(e){return r(e)},u.src=e})},usePreviewer=function(){function e(){n({open:!1,url:"",style:{}})}var r=_slicedToArray(useState(function(){return{open:!1,url:"",style:{}}}),2),t=r[0],n=r[1],o=t.open,a=t.url,i=t.style;return{OpenPreviewer:function(t){GetPreviewImageSize(t).then(function(e){var r=e.width,e=e.height;n({open:!0,url:t,style:{display:"block",width:r,height:e}})}).catch(function(){})},Previewer:useMemo(function(){return o?React.createElement("div",{style:FullScreenStyle,onClick:e},React.createElement("div",{style:AbsoluteCenterStyle},React.createElement("img",{style:i||{},src:a}))):null},[o])}};export default usePreviewer;
