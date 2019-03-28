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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/Accessor","../../core/arrayUtils","../../core/Evented","../../core/lang","../../core/ReentrantObjectPool","../../core/accessorSupport/decorators","../../core/accessorSupport/decorators/cast","./FieldConfig","./FieldGroupConfig","./InputField","./InputFieldGroup"],function(e,t,r,n,i,o,u,l,a,p,s,f,d,c,y){function g(e){return!!e.inputFields}function h(e){return!!e.fieldConfig}return function(e){function t(t){var r=e.call(this)||this;return r._fieldPool=new a.ReentrantObjectPool(c),r._fieldGroupPool=new a.ReentrantObjectPool(y),r._featureClone=null,r.fieldConfig=null,r.strict=!1,r}return r(t,e),Object.defineProperty(t.prototype,"_allInputFields",{get:function(){return this.inputFields.reduce(function(e,t){return g(t)?e.concat(t.inputFields):e.concat([t])},[])},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"feature",{get:function(){return this._get("feature")},set:function(e){this._featureClone=e?e.clone():null,this._set("feature",e)},enumerable:!0,configurable:!0}),t.prototype.castFieldConfig=function(e){return e?e.map(function(e){return e instanceof f||e instanceof d?e:h(e)?new d(e):new f(e)}):null},Object.defineProperty(t.prototype,"inputFields",{get:function(){var e=this,t=this,r=t._fieldPool,n=t._fieldGroupPool,i=t._featureClone,u=t.layer,l=i&&i.clone(),a=this._get("inputFields");if(a&&a.forEach(function(t){return e._disposeInputOrGroup(t)}),"ready"!==this.state)return[];var p,s=this.get("layer.fields")||[],f=this.fieldConfig||[];return p=0!==f.length?f.map(function(t){if(h(t)){var i=n.acquire(),a=t.fieldConfig.map(function(t){var n=o.find(s,function(e){return e.name===t.name}),a=r.acquire();return a.set({field:n,config:t,feature:l,group:i,layer:u,value:e.getValue(n.name)}),a}).filter(function(t){var r=t.visible;return r||e._disposeInputOrGroup(t),r});return i.set({config:t,feature:l,inputFields:a}),i}var p=o.find(s,function(e){return e.name===t.name}),f=r.acquire();return f.set({field:p,config:t,feature:l,group:null,layer:u,value:e.getValue(p.name)}),f}):s.map(function(t){var n=r.acquire();return n.set({config:null,field:t,feature:l,group:null,layer:u,value:e.getValue(t.name)}),n}),p.filter(function(t){var r=t.visible;return r||e._disposeInputOrGroup(t),r})},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"layer",{get:function(){return this.get("feature.layer")},set:function(e){if(!e)return void this._clearOverride("layer");this._override("layer",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){return this.get("layer.loaded")&&this.feature?"ready":"disabled"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"valid",{get:function(){var e=this._allInputFields;return e.length>0&&e.every(function(e){return e.valid})},enumerable:!0,configurable:!0}),t.prototype.findField=function(e){return o.find(this._allInputFields,function(t){return t.name===e})},t.prototype.getValue=function(e){var t=this._featureClone;return t&&t.get("attributes."+e)},t.prototype.setValue=function(e,t){var r=this,n=this,i=n._featureClone,o=n.strict;if(i&&i.attributes){var u=this.findField(e);if(u&&i.attributes[e]!==t){u.value=t;if(this.get("layer.typeIdField")===u.name){var l=new Set;this.layer.types.forEach(function(e){return Object.keys(e.domains).forEach(function(e){return l.add(e)})}),l.forEach(function(e){var t=r.findField(e);t&&t.notifyChange("domain")})}o&&!u.valid||(i.attributes[e]=t,this.notifyChange("inputFields"),this._emitChangeEvent(u))}}},t.prototype.getValues=function(){var e=this._featureClone;return e&&l.clone(e.attributes)||null},t.prototype.submit=function(){var e=this._allInputFields,t=e.filter(function(e){return e.valid}).map(function(e){return e.name}),r=e.filter(function(e){return!e.valid}).map(function(e){return e.name}),n=this.getValues();this.emit("submit",{valid:t,invalid:r,values:n})},t.prototype._disposeInputOrGroup=function(e){g(e)?this._disposeGroup(e):this._disposeInput(e)},t.prototype._disposeGroup=function(e){var t=this;e.inputFields.forEach(function(e){return t._disposeInput(e)}),this._fieldGroupPool.release(e)},t.prototype._disposeInput=function(e){this._fieldPool.release(e)},t.prototype._emitChangeEvent=function(e){var t=e.name,r=e.valid,n=e.value;this.emit("value-change",{layer:this.layer,feature:this.feature,fieldName:t,value:n,valid:r})},n([p.property({readOnly:!0,dependsOn:["inputFields"]})],t.prototype,"_allInputFields",null),n([p.property()],t.prototype,"feature",null),n([p.property()],t.prototype,"fieldConfig",void 0),n([s.cast("fieldConfig")],t.prototype,"castFieldConfig",null),n([p.property({readOnly:!0,dependsOn:["feature","fieldConfig","layer.fields","layer.loaded"]})],t.prototype,"inputFields",null),n([p.property({dependsOn:["feature.layer"]})],t.prototype,"layer",null),n([p.property({dependsOn:["layer.loaded","feature"]})],t.prototype,"state",null),n([p.property()],t.prototype,"strict",void 0),n([p.property({dependsOn:["_allInputFields"]})],t.prototype,"valid",null),n([p.property()],t.prototype,"getValues",null),n([p.property()],t.prototype,"submit",null),t=n([p.subclass("esri.widgets.FeatureForm.FeatureFormViewModel")],t)}(p.declared(i,u))});