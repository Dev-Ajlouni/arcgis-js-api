// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../../../../../core/tsSupport/declareExtendsHelper","../../../../../core/tsSupport/decorateHelper","../../../../../core/HandleRegistry","../../../../../core/StackedObjectPool","../../../../overlay/TextOverlayItem","../../../../overlay/LineOverlayItem","../../../lib/glMatrix","../../../webgl-engine/lib/Layer","../../../webgl-engine/lib/Object3D","../../../webgl-engine/lib/Geometry","../../../webgl-engine/lib/GeometryData","../../../webgl-engine/lib/GeometryUtil","../../../webgl-engine/lib/Selector","../../../webgl-engine/materials/Material","../../../webgl-engine/materials/ColorMaterial","../../../webgl-engine/materials/RibbonLineMaterial","../../../webgl-engine/materials/MeasurementArrowMaterial","../../../webgl-engine/parts/Model","../support/viewUtils","../support/PathSegmentInterpolator","./LaserLineRenderer","../../../support/mathUtils"],function(e,t,i,r,o,n,s,a,l,d,c,h,_,p,u,g,m,b,v,w,L,y,P,f){var j,O=l.vec2d,C=l.vec3d,T=l.mat4d,G=new n(function(){return C.create()}),M=[1,.5,0,.75],A={laserLineGlowColor:[1,.5,0],laserLineGlowWidth:8,laserLineInnerColor:[1,1,1],laserLineInnerWidth:.75,laserLineGlobalAlpha:.75,laserLineEnabled:!0,handleColor:[1,.5,0],handleRadius:10,triangleColor:M,triangleLineWidth:3,triangleCornerSize:32,triangleSubdivisions:128,arrowWidth:16,arrowOutlineColor:[1,.5,0,1],arrowOutlineWidth:.2,arrowStripeEvenColor:[1,1,1,1],arrowStripeOddColor:[1,.5,0,1],arrowStripeLength:16,arrowSubdivisions:128,geodesicProjectionLineWidth:2,geodesicProjectionLineColor:M,guideLineWidth:2,guideLineColor:M,guideStippleLengthPixels:6,labelDistance:25};!function(e){e[e.Small=12]="Small",e[e.Large=16]="Large"}(j||(j={}));var S=function(){function e(){this.text=new s({visible:!1}),this.callout=new a({visible:!1,width:2}),this._visible=!1}return Object.defineProperty(e.prototype,"visible",{get:function(){return this._visible},set:function(e){this._visible=e,this.text.visible=e,this.callout.visible=e},enumerable:!0,configurable:!0}),e.prototype.addToView=function(e){e.overlay.items.addMany([this.text,this.callout])},e.prototype.removeFromView=function(e){e.overlay.items.removeMany([this.text,this.callout])},e.prototype.update=function(e,t,i,r,o){void 0===o&&(o=j.Small);var n=t[0]-e[0],s=t[1]-e[1],a=Math.abs(n)>Math.abs(s)?n>0?"left":"right":s>0?"top":"bottom";this.text.position=[t[0],t[1]],this.text.text=i,this.text.fontSize=o,this.text.anchor=a,this.callout.startPosition=[e[0],e[1]],this.callout.endPosition=[t[0],t[1]],this.visible=r},e}(),V=function(){function e(){this.origin=C.create(),this.start=C.create(),this.end=C.create()}return e.prototype.update=function(e,t,i){C.set(e,this.start),C.set(t,this.end),i?C.set(i,this.origin):L.midpoint([e,t],this.origin)},e}(),H=function(){function e(e,t,i){void 0===i&&(i={}),this._visible=!1,this._laserLineRenderer=null,this._handleGeometry=new h(p.createSphereGeometry(1,32,32),"handle"),this._listenerHandles=null,this._cursorPosition=C.create(),this._startPosition=C.create(),this._endPosition=C.create(),this._centerPosition=C.create(),this._cornerPosition=C.create(),this._arrowLabelSegment=new V,this._horizontalLabelSegment=new V,this._verticalLabelSegment=new V,this._geodesicProjectionLabelSegment=new V,this._origin=C.create(),this._originTransform=T.create(),this._tempMat4=T.create(),this._model=e,this._sceneView=t,this._params=L.copyParameter(A,i),this._layer=new d("point-to-point-measurement",{},"point-to-point-measurement"),this._createMaterials(),this._createObjects(),this._createLabels(),this._selector=new u(this._sceneView.viewingMode)}return e.prototype.destroy=function(){this.hide()},Object.defineProperty(e.prototype,"cameraAboveGround",{get:function(){return this._sceneView.state.camera.aboveGround},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"visible",{get:function(){return this._visible},set:function(e){e?this.show():this.hide()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"testData",{get:function(){return{labels:{direct:this._directDistanceLabel,horizontal:this._horizontalDistanceLabel,vertical:this._verticalDistanceLabel},laserLineRenderer:this._laserLineRenderer}},enumerable:!0,configurable:!0}),e.prototype.show=function(){if(!this._visible){this._visible=!0;var e=this._sceneView._stage,t={glowColor:this._params.laserLineGlowColor,glowWidth:this._params.laserLineGlowWidth,innerColor:this._params.laserLineInnerColor,innerWidth:this._params.laserLineInnerWidth,globalAlpha:this._params.laserLineGlobalAlpha};this._laserLineRenderer=new P(this._sceneView.renderCoordsHelper,t),e.addExternalRenderer(this._laserLineRenderer.renderSlots,this._laserLineRenderer),this._addToStage(e),this._directDistanceLabel.addToView(this._sceneView),this._horizontalDistanceLabel.addToView(this._sceneView),this._verticalDistanceLabel.addToView(this._sceneView),this._initializeListeners(),this._updateCursorPosition(),this._updateStartPosition(),this._updateEndPosition(),this._updateMouseCursor(),this._updateView()}},e.prototype.hide=function(){if(this._visible){this._visible=!1;var e=this._sceneView._stage;e.removeExternalRenderer(this._laserLineRenderer),this._laserLineRenderer=null,this._removeFromStage(e),this._directDistanceLabel.removeFromView(this._sceneView),this._horizontalDistanceLabel.removeFromView(this._sceneView),this._verticalDistanceLabel.removeFromView(this._sceneView),this._destroyListeners(),this._sceneView.cursor=null}},e.prototype.pick=function(t){this._selector.enableTerrain=!t.pickHandles,this._selector.enableHUDSelection=!t.pickHandles;var i=[];if(t.pickHandles)i.push(this._layer.id);else for(var r=this._sceneView._stage,o=r.getViewContent(),n=this._sceneView._stage.getAll(w.ContentType.LAYER),s=0,a=o;s<a.length;s++){var l=a[s],d=n[l];d&&d!==this._layer&&"VISIBLE"===d.getState()&&i.push(d.id)}var c=this._sceneView.spatialReference,h=[t.screenPoint.x,this._sceneView.height-t.screenPoint.y],_=this._sceneView._stage.pick(h,i,!0,this._selector),p=_.getMinResult(),u=C.create();if(!p.getIntersectionPoint(u))return new e.PickResult;var g=this._sceneView.renderCoordsHelper.fromRenderCoords(u,c),m=null;p.target===this._startHandleObject?m="start":p.target===this._endHandleObject&&(m="end");var b="terrain"===p.intersector?"surface":"feature";return new e.PickResult(b,u,g,m)},e.prototype.getElevation=function(e){return this._sceneView.basemapTerrain.ready?this._sceneView.basemapTerrain.getElevation(e)||0:0},e.prototype.overlappingHandles=function(e,t){return L.pointToPointScreenDistance(e,t,this._sceneView)<=this._params.handleRadius},e.prototype._createMaterials=function(){this._handleMaterial=new g({diffuse:this._params.handleColor,castShadows:!1},"handle"),this._handleMaterial.setRenderOccluded(!0),this._handleMaterialHidden=new g({opacity:0,transparent:!0,castShadows:!1},"handle-hidden"),this._triangleLineMaterial=new b({width:this._params.triangleLineWidth,color:this._params.triangleColor,polygonOffset:!0},"triangle-line"),this._triangleLineMaterial.setRenderOccluded(!0),this._triangleCornerMaterial=new m({color:this._params.triangleColor,transparent:!0,polygonOffset:!0},"triangle-corner"),this._triangleCornerMaterial.setRenderOccluded(!0),this._arrowMaterial=new v({outlineColor:this._params.arrowOutlineColor,stripeEvenColor:this._params.arrowStripeEvenColor,stripeOddColor:this._params.arrowStripeOddColor,polygonOffset:!0},"arrow"),this._arrowMaterial.setRenderOccluded(!0),this._geodesicProjectionLineMaterial=new b({width:this._params.geodesicProjectionLineWidth,color:this._params.geodesicProjectionLineColor,polygonOffset:!0},"geodesic-line"),this._geodesicProjectionLineMaterial.setRenderOccluded(!0),this._geodesicGuideLineMaterial=new b({width:this._params.guideLineWidth,color:this._params.geodesicProjectionLineColor,polygonOffset:!0,stippleLength:0},"geodesic-guide"),this._geodesicGuideLineMaterial.setRenderOccluded(!0)},e.prototype._createObjects=function(){this._startHandleObject=new c,this._startHandleObject.addGeometry(this._handleGeometry,[this._handleMaterial],T.identity()),this._layer.addObject(this._startHandleObject),this._endHandleObject=new c,this._endHandleObject.addGeometry(this._handleGeometry,[this._handleMaterial],T.identity()),this._layer.addObject(this._endHandleObject),this._triangleLineObject=new c,this._layer.addObject(this._triangleLineObject),this._triangleCornerObject=new c,this._layer.addObject(this._triangleCornerObject),this._arrowObject=new c,this._layer.addObject(this._arrowObject),this._geodesicProjectionLineObject=new c,this._layer.addObject(this._geodesicProjectionLineObject),this._geodesicProjectionStartGuideObject=new c,this._layer.addObject(this._geodesicProjectionStartGuideObject),this._geodesicProjectionEndGuideObject=new c,this._layer.addObject(this._geodesicProjectionEndGuideObject)},e.prototype._createLabels=function(){this._directDistanceLabel=new S,this._horizontalDistanceLabel=new S,this._verticalDistanceLabel=new S},e.prototype._addToStage=function(e){e.add(w.ContentType.LAYER,this._layer),e.add(w.ContentType.MATERIAL,this._handleMaterial),e.add(w.ContentType.MATERIAL,this._handleMaterialHidden),e.add(w.ContentType.MATERIAL,this._triangleLineMaterial),e.add(w.ContentType.MATERIAL,this._triangleCornerMaterial),e.add(w.ContentType.MATERIAL,this._arrowMaterial),e.add(w.ContentType.MATERIAL,this._geodesicProjectionLineMaterial),e.add(w.ContentType.MATERIAL,this._geodesicGuideLineMaterial),e.add(w.ContentType.OBJECT,this._startHandleObject),e.add(w.ContentType.OBJECT,this._endHandleObject),e.add(w.ContentType.OBJECT,this._triangleLineObject),e.add(w.ContentType.OBJECT,this._triangleCornerObject),e.add(w.ContentType.OBJECT,this._arrowObject),e.add(w.ContentType.OBJECT,this._geodesicProjectionLineObject),e.add(w.ContentType.OBJECT,this._geodesicProjectionStartGuideObject),e.add(w.ContentType.OBJECT,this._geodesicProjectionEndGuideObject),e.addToViewContent([this._layer.id])},e.prototype._removeFromStage=function(e){e.removeFromViewContent([this._layer.id]),e.remove(w.ContentType.LAYER,this._layer.id),e.remove(w.ContentType.MATERIAL,this._handleMaterial.getId()),e.remove(w.ContentType.MATERIAL,this._handleMaterialHidden.getId()),e.remove(w.ContentType.MATERIAL,this._triangleLineMaterial.getId()),e.remove(w.ContentType.MATERIAL,this._triangleCornerMaterial.getId()),e.remove(w.ContentType.MATERIAL,this._arrowMaterial.getId()),e.remove(w.ContentType.MATERIAL,this._geodesicProjectionLineMaterial.getId()),e.remove(w.ContentType.MATERIAL,this._geodesicGuideLineMaterial.getId()),e.remove(w.ContentType.OBJECT,this._startHandleObject.id),e.remove(w.ContentType.OBJECT,this._endHandleObject.id),e.remove(w.ContentType.OBJECT,this._triangleLineObject.id),e.remove(w.ContentType.OBJECT,this._triangleCornerObject.id),e.remove(w.ContentType.OBJECT,this._arrowObject.id),e.remove(w.ContentType.OBJECT,this._geodesicProjectionLineObject.id),e.remove(w.ContentType.OBJECT,this._geodesicProjectionStartGuideObject.id),e.remove(w.ContentType.OBJECT,this._geodesicProjectionEndGuideObject.id)},e.prototype._mirrorLabelPosition=function(e){switch(e){case"top":return"bottom";case"right":return"left";case"bottom":return"top";case"left":return"right"}},e.prototype._getLabelPositions=function(e,t,i,r,o){var n=this._model.triangleView,s=n.collapsed;G.push();var a=G.allocate(),l=G.allocate();o.projectPoint(i,a),o.projectPoint(t,l);var d={direct:s?"top":"bottom",horizontal:"top",vertical:a[0]<l[0]?"left":"right"};if(!s){var c=G.allocate(),h=G.allocate();if(L.screenSpaceTangent(e,i,c,o),L.screenSpaceTangent(e,t,h,o),O.dot(c,h)>=E)d.direct=f.sign(c[1])===f.sign(h[1])?this._mirrorLabelPosition(d.vertical):d.vertical;else{var _=G.allocate();L.screenSpaceTangent(i,t,_,o),O.dot(_,h)>=E&&(d.direct=f.sign(_[0])===f.sign(h[0])?this._mirrorLabelPosition(d.horizontal):d.horizontal)}}if("below-the-surface"===r){var p=function(e){return"top"===e?"bottom":"top"};d.direct=p(d.direct),d.horizontal=p(d.horizontal),d.vertical=p(d.vertical)}return G.pop(),d},e.prototype._updateView=function(){if(this._sceneView.ready){var e=this._sceneView._stage,t=e.getCamera(),i=this._sceneView.renderCoordsHelper;this._updateHandleObject(this._startHandleObject,this._startPosition,null!==this._model.startPoint,0===this._model.draggedHandles.length&&"start"===this._model.hoveredHandle,this._model.draggedHandles.includes("start"),t),this._updateHandleObject(this._endHandleObject,this._endPosition,null!==this._model.endPoint,0===this._model.draggedHandles.length&&"end"===this._model.hoveredHandle,this._model.draggedHandles.includes("end")||"drawing"===this._model.state,t);var r=this._model.triangleView;if(!r.visible)return this._triangleLineObject.removeAllGeometries(),this._triangleCornerObject.removeAllGeometries(),this._arrowObject.removeAllGeometries(),this._geodesicProjectionLineObject.removeAllGeometries(),this._geodesicProjectionStartGuideObject.removeAllGeometries(),this._geodesicProjectionEndGuideObject.removeAllGeometries(),this._directDistanceLabel.visible=!1,this._horizontalDistanceLabel.visible=!1,void(this._verticalDistanceLabel.visible=!1);var o="camera-dependent"===this._model.measurementSurfaceLocation?this._sceneView.state.camera.aboveGround?"above-the-surface":"below-the-surface":this._model.measurementSurfaceLocation,n=this._startPosition,s=this._endPosition,a="above-the-surface"===o?1:-1,l=a*(i.getAltitude(s)-i.getAltitude(n));0>l&&(u=[s,n],n=u[0],s=u[1]);var d=this._cornerPosition;i.worldUpAtPosition(n,d),C.scale(d,a*Math.abs(l)),C.add(d,n);var c=this._centerPosition;L.midpoint([n,s,d],c),C.set(c,this._origin),T.identity(this._originTransform),T.translate(this._originTransform,this._origin),r.collapsed?(this._triangleLineObject.removeAllGeometries(),this._triangleCornerObject.removeAllGeometries()):this._updateTriangleObjects(this._triangleLineObject,this._triangleCornerObject,n,s,d,this._origin,this._originTransform,t,r.mode,this._horizontalLabelSegment,this._verticalLabelSegment),this._updateArrowObject(this._arrowObject,this._startPosition,this._endPosition,this._origin,this._originTransform,r.stripeLength,t,r.mode,this._arrowLabelSegment);var h=this._requiresGeodesicGuides(this._startPosition,this._endPosition,t,r.mode);this._updateGeodesicProjectionLineObject(this._geodesicProjectionLineObject,this._startPosition,this._endPosition,this._origin,this._originTransform,h,this._geodesicProjectionLabelSegment),this._updateGeodesicProjectionGuideObjects(t,h);var _=this._params.labelDistance,p=this._getLabelPositions(n,s,d,o,t);this._updateAuxiliaryMeasureLabels(r,t,p),"geodesic"!==r.mode?this._updateLabel(this._directDistanceLabel,this._arrowLabelSegment,_,p.direct,r.directLabel,r.visible,j.Large,t):(this._updateLabel(this._horizontalDistanceLabel,h?this._geodesicProjectionLabelSegment:this._arrowLabelSegment,_,p.horizontal,r.horizontalLabel,r.visible,j.Large,t),this._directDistanceLabel.visible=!1);var u}},e.prototype._updateAuxiliaryMeasureLabels=function(e,t,i){if(e.collapsed)return this._horizontalDistanceLabel.visible=!1,void(this._verticalDistanceLabel.visible=!1);var r=this._params.labelDistance;this._updateLabel(this._horizontalDistanceLabel,this._horizontalLabelSegment,r,i.horizontal,e.horizontalLabel,!0,j.Small,t),this._updateLabel(this._verticalDistanceLabel,this._verticalLabelSegment,r,i.vertical,e.verticalLabel,!0,j.Small,t)},e.prototype._updateHandleObject=function(e,t,i,r,o,n){e.removeAllGeometries(),i&&(L.scaleTranslateMatrix(this._params.handleRadius*n.computePixelSizeAt(t),t,this._tempMat4),e.addGeometry(this._handleGeometry,[r&&!o?this._handleMaterial:this._handleMaterialHidden],this._tempMat4))},e.prototype._updateTriangleObjects=function(e,t,i,r,o,n,s,a,l,d,c){G.push();var _=[C.subtract(i,n,G.allocate()),C.subtract(o,n,G.allocate()),C.subtract(r,n,G.allocate())];d.update(o,r),c.update(i,o);var u=new h(p.createPolylineGeometry(_),"triangle-line");e.removeAllGeometries(),e.addGeometry(u,[this._triangleLineMaterial],s);var g=G.allocate(),m=G.allocate();C.subtract(o,i,g),C.normalize(g,g),C.subtract(r,o,m),C.normalize(m,m);var b=.33*Math.min(C.dist(o,i),C.dist(o,r)),v=this._params.triangleCornerSize*a.computePixelSizeAt(o),w=Math.min(b,v),L=new h(this._quadGeometryData(o,g,m,w,n),"triangle-corner");t.removeAllGeometries(),t.addGeometry(L,[this._triangleCornerMaterial],s),G.pop()},e.prototype._updateArrowObject=function(e,t,i,r,o,n,s,a,l){this._createInterpolatedLineGeometry(e,this._arrowMaterial,"arrow",t,i,r,o,a,this._arrowLabelSegment);var d=s.computePixelSizeAt(l.origin);this._arrowMaterial.setParameterValues({width:this._params.arrowWidth*d,stripeLength:n})},e.prototype._getSegmentInterpolator=function(e,t){var i=this._sceneView.spatialReference,r=this._sceneView.renderCoordsHelper,o=r.spatialReference;return i.isWebMercator||i.isWGS84?new y.Spherical(e,t,o,o):new y.Linear(e,t)},e.prototype._updateGeodesicProjectionLineObject=function(e,t,i,r,o,n,s){if(!n)return void e.removeAllGeometries();G.push();var a=this._sceneView.renderCoordsHelper,l=C.set(t,G.allocate()),d=C.set(i,G.allocate());a.setAltitude(0,l),a.setAltitude(0,d),this._createInterpolatedLineGeometry(e,this._geodesicProjectionLineMaterial,"geodesicProjectionLine",l,d,r,o,"geodesic",s),G.pop()},e.prototype._requiresGeodesicGuides=function(e,t,i,r){return"geodesic"===r&&this._model.geodesicDistanceExceeded?this._requiresGeodesicGuideAt(e,i)||this._requiresGeodesicGuideAt(t,i):!1},e.prototype._requiresGeodesicGuideAt=function(e,t){var i=this._sceneView.renderCoordsHelper,r=t.computePixelSizeAt(e),o=i.getAltitude(e);return o/r>=10},e.prototype._updateGeodesicProjectionGuideObjects=function(e,t){if(!t)return this._geodesicProjectionStartGuideObject.removeAllGeometries(),void this._geodesicProjectionEndGuideObject.removeAllGeometries();G.push();var i=this._sceneView.renderCoordsHelper,r=C.set(this._startPosition,G.allocate()),o=C.set(this._endPosition,G.allocate());i.setAltitude(0,r),i.setAltitude(0,o),this._createInterpolatedLineGeometry(this._geodesicProjectionStartGuideObject,this._geodesicGuideLineMaterial,"geodesicGuideLine",r,this._startPosition,this._origin,this._originTransform,"euclidean"),this._createInterpolatedLineGeometry(this._geodesicProjectionEndGuideObject,this._geodesicGuideLineMaterial,"geodesicGuideLine",o,this._endPosition,this._origin,this._originTransform,"euclidean");var n=Math.min(e.computePixelSizeAt(this._startPosition),e.computePixelSizeAt(r),e.computePixelSizeAt(this._endPosition),e.computePixelSizeAt(o));this._geodesicGuideLineMaterial.setParameterValues({stippleLength:this._params.guideStippleLengthPixels*n}),G.pop()},e.prototype._createInterpolatedLineGeometry=function(e,t,i,r,o,n,s,a,l){G.push();var d=this._sceneView.renderCoordsHelper,c=[],_=[],u=function(e,t){var i=G.allocate();C.subtract(e,n,i),c.push(i),_.push(t)};if("euclidean"===a){var g=G.allocate();L.midpoint([r,o],g);var m=G.allocate();d.worldUpAtPosition(g,m),u(r,m),u(o,m),l&&l.update(r,o)}else{for(var b=this._getSegmentInterpolator(r,o),v=this._params.arrowSubdivisions+1&-2,w=null,y=null,P=0;v>P;++P){var f=P/(v-1),j=G.allocate(),m=G.allocate();b.eval(f,j),d.worldUpAtPosition(j,m),P===v/2-1?w=j:P===v/2&&(y=j),u(j,m)}l&&l.update(w,y)}var O=new h(p.createPolylineGeometry(c,_),i);e.removeAllGeometries(),e.addGeometry(O,[t],s),G.pop()},e.prototype._quadGeometryData=function(e,t,i,r,o){G.push();var n=G.allocate(),s=[],a=G.allocate();C.scale(i,r,a);var l=G.allocate();C.scale(t,-r,l);for(var d=0;4>d;++d)C.set(e,n),C.subtract(n,o),1&d&&C.add(n,a),2&d&&C.add(n,l),s.push(n[0],n[1],n[2]);var c=new _({position:{size:3,data:s}},{position:new Uint32Array([0,1,2,1,2,3])});return G.pop(),c},e.prototype._updateLabel=function(e,t,i,r,o,n,s,a){G.push();var l=G.allocate(),d=G.allocate(),c=this._computeLabelPosition(t.origin,t.start,t.end,i,r,l,d,a);e.update(l,d,o,c&&n,s),G.pop()},e.prototype._computeLabelPosition=function(e,t,i,r,o,n,s,a){G.push();var l=G.allocate();L.screenSpaceTangent(t,i,l,a);var d=G.allocate();O.set2(-l[1],l[0],d);var c=!1;switch(o){case"top":c=d[1]<0;break;case"bottom":c=d[1]>0;break;case"left":c=d[0]>0;break;case"right":c=d[0]<0}c&&O.negate(d);var h=G.allocate(),_=G.allocate();return a.projectPoint(e,h),h[2]<0||h[2]>1?(G.pop(),!1):(O.scale(d,r,_),O.add(_,h,_),n[0]=h[0],n[1]=this._sceneView.height-h[1],s[0]=_[0],s[1]=this._sceneView.height-_[1],G.pop(),!0)},e.prototype._updateMouseCursor=function(){if("drawing"===this._model.state||"initial"===this._model.state)this._sceneView.cursor="crosshair";else if("editing"===this._model.state||"measured"===this._model.state){var e=null!==this._model.hoveredHandle;this._sceneView.cursor=e?"pointer":"crosshair"}},e.prototype._updateCursorPosition=function(){this._model.cursorPoint&&this._sceneView.renderCoordsHelper.toRenderCoords(this._model.cursorPoint,this._cursorPosition),this._updateLaserLine()},e.prototype._updateStartPosition=function(){this._model.startPoint&&this._sceneView.renderCoordsHelper.toRenderCoords(this._model.startPoint,this._startPosition),this._updateLaserLine()},e.prototype._updateEndPosition=function(){this._model.endPoint&&this._sceneView.renderCoordsHelper.toRenderCoords(this._model.endPoint,this._endPosition),this._updateLaserLine()},e.prototype._getFocusPosition=function(){var e=this._model.triangleView.collapsed&&this._model.triangleView.visible&&this._model.horizontalDistance.value>this._model.verticalDistance.value;if(!e||1!==this._model.draggedHandles.length&&"drawing"!==this._model.state)return this._cursorPosition;var t=this._model.draggedHandles.getItemAt(0);return"drawing"===this._model.state||"end"===t?this._startPosition:this._endPosition},e.prototype._updateLaserLine=function(){var e="measured"===this._model.state,t=this._params.laserLineEnabled;this._laserLineRenderer.focusActive=t&&!!this._model.cursorPoint&&!e,this._laserLineRenderer.focusPosition=this._getFocusPosition(),this._laserLineRenderer.segmentActive=t&&this._model.triangleView.visible&&!this._model.triangleView.collapsed&&!e,this._laserLineRenderer.segmentStartPosition=this._startPosition,this._laserLineRenderer.segmentEndPosition=this._endPosition},e.prototype._initializeListeners=function(){var e=this;this._listenerHandles=new o,this._listenerHandles.add(this._model.watch("state",function(){e._updateMouseCursor()})),this._listenerHandles.add(this._model.watch("hoveredHandle",function(){e._updateMouseCursor(),e._updateView()})),this._listenerHandles.add(this._model.watch("cursorPoint",function(){e._updateCursorPosition()})),this._listenerHandles.add(this._model.watch("startPoint",function(){e._updateStartPosition(),e._updateView()})),this._listenerHandles.add(this._model.watch("endPoint",function(){e._updateEndPosition(),e._updateView()})),this._listenerHandles.add(this._model.watch("unit",function(){e._updateView()})),this._listenerHandles.add(this._sceneView.state.watch("camera",function(){e._updateView()}))},e.prototype._destroyListeners=function(){this._listenerHandles.destroy(),this._listenerHandles=null},e}();!function(e){var t=function(){function e(){}return e}();e.PickRequest=t;var i=function(){function e(e,t,i,r){void 0===e&&(e=null),void 0===t&&(t=null),void 0===i&&(i=null),void 0===r&&(r=null),this.type=e,this.scenePoint=t,this.mapPoint=i,this.handle=r}return e}();e.PickResult=i}(H||(H={}));var E=Math.cos(f.deg2rad(12));return H});