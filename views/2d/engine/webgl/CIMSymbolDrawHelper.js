// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.11/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/decorateHelper","../../../../geometry/support/jsonUtils","../cim/CIMEffects","../cim/CIMOperators","../cim/CIMPlacements","./GeometryUtils","./Rect"],function(t,r,e,o,p,s,f,h,y,a){Object.defineProperty(r,"__esModule",{value:!0});var m=function(){function o(t){this._t=t}return o.createIdentity=function(){return new o([1,0,0,0,1,0])},o.prototype.clone=function(){return new o(this._t.slice())},o.prototype.transform=function(t){var r=this._t;return[r[0]*t[0]+r[1]*t[1]+r[2],r[3]*t[0]+r[4]*t[1]+r[5]]},o.createScale=function(t,r){return new o([t,0,0,0,r,0])},o.prototype.scale=function(t,r){var e=this._t;return e[0]*=t,e[1]*=t,e[2]*=t,e[3]*=r,e[4]*=r,e[5]*=r,this},o.prototype.scaleRatio=function(){return Math.sqrt(this._t[0]*this._t[0]+this._t[1]*this._t[1])},o.createTranslate=function(t,r){return new o([0,0,t,0,0,r])},o.prototype.translate=function(t,r){var e=this._t;return e[2]+=t,e[5]+=r,this},o.createRotate=function(t){var r=Math.cos(t),e=Math.sin(t);return new o([r,-e,0,e,r,0])},o.prototype.rotate=function(t){return this.multiply(o.createRotate(t))},o.prototype.multiply=function(t){var r=this._t,e=t._t,o=r[0]*e[0]+r[3]*e[1],a=r[1]*e[0]+r[4]*e[1],i=r[2]*e[0]+r[5]*e[1]+e[2],n=r[0]*e[3]+r[3]*e[4],s=r[1]*e[3]+r[4]*e[4],f=r[2]*e[3]+r[5]*e[4]+e[5];return r[0]=o,r[1]=a,r[2]=i,r[3]=n,r[4]=s,r[5]=f,this},o}();r.Transformation=m;var i=function(){function t(t){this._transfos=[],this._sizeTransfos=[],this._transfos.push(t||m.createIdentity()),this._sizeTransfos.push(t?t.scaleRatio():1)}return t.prototype.transformPt=function(t){return this._transfos[this._transfos.length-1].transform(t)},t.prototype.transformSize=function(t){return t*this._sizeTransfos[this._sizeTransfos.length-1]},t.prototype.back=function(){return this._transfos[this._transfos.length-1]},t.prototype.push=function(t){var r=t.scaleRatio();t.multiply(this.back()),this._transfos.push(t),this._sizeTransfos.push(this._sizeTransfos[this._sizeTransfos.length-1]*r)},t.prototype.pop=function(){this._transfos.splice(-1,1),this._sizeTransfos.splice(-1,1)},t.prototype.drawSymbol=function(t,r){if(t)switch(t.type){case"CIMPointSymbol":case"CIMLineSymbol":case"CIMPolygonSymbol":this.drawMultiLayerSymbol(t,r)}},t.prototype.drawMultiLayerSymbol=function(t,r){if(t){var e=t.symbolLayers;if(e){var o=t.effects;if(o){var a=this.executeEffects(o,r);if(a)for(var i=a.next();i;)this.drawSymbolLayers(e,i),i=a.next()}else this.drawSymbolLayers(e,r)}}},t.prototype.executeEffects=function(t,r){for(var e=new s.SimpleGeometryCursor(r),o=t?t.length:0,a=0;a<o;++a){var i=t[a];if(i){var n=f.getEffectOperator(i);n&&(e=n.execute(e,i,96/72))}}return e},t.prototype.drawSymbolLayers=function(t,r){for(var e=t.length;e--;){var o=t[e];if(o&&!1!==o.enable){var a=o.effects;if(a){var i=this.executeEffects(a,r);if(i)for(var n=i.next();n;)this.drawSymbolLayer(o,n),n=i.next()}else this.drawSymbolLayer(o,r)}}},t.prototype.drawSymbolLayer=function(t,r){switch(t.type){case"CIMSolidFill":this.drawSolidFill(r,t.color);break;case"CIMSolidStroke":this.drawSolidStroke(r,t.color,t.width);break;case"CIMCharacterMarker":case"CIMPictureMarker":case"CIMVectorMarker":this.drawMarkerLayer(t,r)}},t.prototype.drawMarkerLayer=function(t,r){var e=t.markerPlacement;if(e){var o=f.getPlacementOperator(e);if(o){var a=o.execute(r,e,96/72);if(a)for(var i=a.next();i;)this.drawMarker(t,i),i=a.next()}}else{var n=new h.Placement;n.tx=r.x,n.ty=r.y,this.drawMarker(t,n)}},t.prototype.drawMarker=function(t,r){switch(t.type){case"CIMCharacterMarker":case"CIMPictureMarker":case"CIMVectorMarker":this.drawVectorMarker(t,r)}},t.prototype.drawVectorMarker=function(t,r){if(t){var e=t.markerGraphics;if(e){var o=t.size,a=t.frame,i=a?a.ymax-a.ymin:0,n=o&&i?o/i:1,s=m.createIdentity();a&&s.translate(.5*-(a.xmax+a.xmin),.5*-(a.ymax+a.ymin));var f=t.anchorPoint;if(f){var h=f.x,c=f.y;"Absolute"!==t.anchorPointUnits&&a&&(h*=a.xmax-a.xmin,c*=a.ymax-a.ymin),s.translate(-h,-c)}1!==n&&s.scale(n,n),t.rotation&&s.rotate(t.rotation*y.C_DEG_TO_RAD),s.translate(t.offsetX||0,t.offsetY||0),s.translate(r.tx,r.ty),this.push(s);for(var l=0,p=e;l<p.length;l++){var u=p[l];u&&this.drawSymbol(u.symbol,u.geometry)}this.pop()}}},t.prototype.drawSolidFill=function(t,r){},t.prototype.drawSolidStroke=function(t,r,e){},t}(),n=function(r){function t(){var t=r.call(this)||this;return t._xmin=t._ymin=1/0,t._xmax=t._ymax=-1/0,t}return e(t,r),t.prototype.envelope=function(){return new a(this._xmin,this._ymin,this._xmax-this._xmin,this._ymax-this._ymin)},t.prototype._merge=function(t,r){t[0]-r<this._xmin&&(this._xmin=t[0]-r),t[0]+r>this._xmax&&(this._xmax=t[0]+r),t[1]-r<this._ymin&&(this._ymin=t[1]-r),t[1]+r>this._ymax&&(this._ymax=t[1]+r)},t.prototype.drawSolidFill=function(t,r){for(var e=0,o=t.rings;e<o.length;e++){var a=o[e],i=a?a.length:0;if(2<i){this._merge(this.transformPt(a[0]),0);for(var n=1;n<i;++n)this._merge(this.transformPt(a[n]),0)}}},t.prototype.drawSolidStroke=function(t,r,e){for(var o=.5*this.transformSize(e),a=0,i=p.isPolygon(t)?t.rings:t.paths;a<i.length;a++){var n=i[a],s=n?n.length:0;if(1<s){this._merge(this.transformPt(n[0]),o);for(var f=1;f<s;++f)this._merge(this.transformPt(n[f]),o)}}},t}(r.CIMSymbolDrawHelper=i);r.EnvDrawHelper=n;var c=function(o){function t(t,r){var e=o.call(this,r)||this;return e._ctx=t,e}return e(t,o),t.prototype.drawSolidFill=function(t,r){var e=this._ctx;e.fillStyle="string"==typeof r?r:"rgba("+Math.round(r[0])+","+Math.round(r[1])+","+Math.round(r[2])+","+r[3]/255+")",e.beginPath();for(var o=0,a=t.rings;o<a.length;o++){var i=a[o],n=i?i.length:0;if(2<n){var s=this.transformPt(i[0]);e.moveTo(s[0],s[1]);for(var f=1;f<n;++f)s=this.transformPt(i[f]),e.lineTo(s[0],s[1]);e.closePath()}}e.fill("evenodd")},t.prototype.drawSolidStroke=function(t,r,e){var o=this._ctx;o.strokeStyle="string"==typeof r?r:"rgba("+Math.round(r[0])+","+Math.round(r[1])+","+Math.round(r[2])+","+r[3]/255+")",o.lineWidth=this.transformSize(e)+.5,o.beginPath();var a,i=!1;p.isPolygon(t)?(a=t.rings,i=!0):a=t.paths;for(var n=0,s=a;n<s.length;n++){var f=s[n],h=f?f.length:0;if(1<h){var c=this.transformPt(f[0]);o.moveTo(c[0],c[1]);for(var l=1;l<h;++l)c=this.transformPt(f[l]),o.lineTo(c[0],c[1]);i&&o.closePath()}}o.stroke()},t}(i);r.CanvasDrawHelper=c});