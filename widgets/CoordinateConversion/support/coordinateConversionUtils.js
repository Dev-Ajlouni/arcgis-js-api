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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../../../core/tsSupport/assignHelper","dojo/i18n","dojo/i18n!../nls/CoordinateConversion","dojo/number","dojo/_base/config","../../../core/Error","../../../core/promiseUtils","../../../geometry/Point","../../../geometry/SpatialReference","../../../geometry/support/webMercatorUtils","./Format"],function(t,e,n,i,r,o,a,u,s,c,d,p,f){function l(t,e){var n=b(e);return[t[0].toFixed(n),t[1].toFixed(n)]}function b(t){return t>=500?6:t<500&&t>=50?7:t<50&&t>=5?8:9}function g(t,e,n){var i,r;return function(){i&&(clearTimeout(i),i=null),r&&r.cancel(null);var o=arguments;return r=s.create(function(r,a){i=setTimeout(function(){i=null,t.apply(e,o).then(function(t){return r(t)}).catch(function(t){return a(t)})},n)})}}function h(t){var e=t.geometryServicePromise,n=t.coordinate,i=t.spatialReference,r=t.formatName;return e.then(function(t){return t.fromGeoCoordinateString({strings:[n],sr:i,conversionType:r}).then(function(t){var e=new c({x:t[0][0],y:t[0][1],spatialReference:i});if(!P(e))throw t;return e}).catch(function(t){throw new u("coordinate-conversion:from-geo-coordinate-string-failed","Failed to convert coordinate notation",{notationResult:t})})})}function m(t,e){var n=t.indexOf(",")>=0?",":" ",i=t.split(n).map(function(t){var e=t.trim();return e?Number(e):null}),r=i[0],o=i[1],a=i[2];if(!w(r)||!w(o))return null;var u=new c({x:r,y:o,spatialReference:e||d.WGS84});return a&&(u.z=a,u.hasZ=!0),u}function v(){return[new f({name:"basemap",coordinateSegments:[{alias:"X",description:"easting",searchPattern:G,substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}},{alias:"Y",description:"northing",searchPattern:G,substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}}],defaultPattern:"X, Y"}),new f({name:"dd",coordinateSegments:[{alias:"Y",description:"degrees latitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\"+W+"]?\\d*(?=\\D*?[N|S|"+N+"|"+j+"])","i"),substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}},{alias:r.abbreviatedDirections.north,description:"north/south indicator",searchPattern:Z,substitution:{input:function(t){return z[t]},output:function(t){return r.abbreviatedDirections[C[t]]}}},{alias:"X",description:"degrees longitude",searchPattern:new RegExp("\\d{1,3}[\\.|\\"+W+"]?\\d*(?=\\D*?[E|W|"+F+"|"+$+"])","i"),substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}},{alias:r.abbreviatedDirections.east,description:"east/west indicator",searchPattern:B,substitution:{input:function(t){return z[t]},output:function(t){return r.abbreviatedDirections[C[t]]}}}],defaultPattern:"Y°"+r.abbreviatedDirections.north+", X°"+r.abbreviatedDirections.east}),new f({name:"ddm",coordinateSegments:[{alias:"Y",description:"degrees latitude",searchPattern:new RegExp("\\d{1,2}(?=.*?\\s+.*?[N|S|"+N+"|"+j+"])","i"),substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}},{alias:"A",description:"minutes latitude",searchPattern:new RegExp("\\d{1,2}[\\.\\"+W+"]?\\d*(?=.*?[N|S|"+N+"||"+j+"])","i"),substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}},{alias:r.abbreviatedDirections.north,description:"north/south indicator",searchPattern:Z,substitution:{input:function(t){return z[t]},output:function(t){return r.abbreviatedDirections[C[t]]}}},{alias:"X",description:"degrees longitude",searchPattern:new RegExp("\\d{1,3}(?=\\D*?\\s+.*?[E|W|"+F+"|"+$+"])","i"),substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}},{alias:"B",description:"minutes longitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\|"+W+"]?\\d*(?=.*?[E|W|"+F+"|"+$+"])","i"),substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}},{alias:r.abbreviatedDirections.east,description:"east/west indicator",searchPattern:B,substitution:{input:function(t){return z[t]},output:function(t){return r.abbreviatedDirections[C[t]]}}}],defaultPattern:"Y° A'"+r.abbreviatedDirections.north+", X° B'"+r.abbreviatedDirections.east}),new f({name:"dms",coordinateSegments:[{alias:"Y",description:"degrees latitude",searchPattern:new RegExp("\\d{1,2}(?=.*?\\s+.*?[N|S|"+N+"|"+j+"])","i"),substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}},{alias:"A",description:"minutes latitude",searchPattern:new RegExp("\\d{1,2}(?=.*?[N|S|"+N+"|"+j+"])","i"),substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}},{alias:"B",description:"seconds latitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\"+W+"]?\\d*(?=.*?[N|S|"+N+"|"+j+"])","i"),substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}},{alias:r.abbreviatedDirections.north,description:"north/south indicator",searchPattern:Z,substitution:{input:function(t){return z[t]},output:function(t){return r.abbreviatedDirections[C[t]]}}},{alias:"X",description:"degrees longitude",searchPattern:new RegExp("\\d{1,3}(?=.*?\\s+.*?[E|W|"+F+"|"+$+"])","i"),substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}},{alias:"C",description:"minutes longitude",searchPattern:new RegExp("\\d{1,2}(?=.*?[E|W|"+F+"|"+$+"])","i"),substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}},{alias:"D",description:"seconds longitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\"+W+"]?\\d*(?=.*?[E|W|"+F+"|"+$+"])","i"),substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}},{alias:r.abbreviatedDirections.east,description:"east/west indicator",searchPattern:B,substitution:{input:function(t){return z[t]},output:function(t){return r.abbreviatedDirections[C[t]]}}}],defaultPattern:"Y° A' B\""+r.abbreviatedDirections.north+", X° C' D\""+r.abbreviatedDirections.east}),new f({name:"xy",coordinateSegments:[{alias:"X",description:"longitude",searchPattern:G,substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}},{alias:"Y",description:"latitude",searchPattern:G,substitution:{input:function(t){return R(t)},output:function(t){return x(t)}}}],defaultPattern:"X°, Y°"}),new f({name:"mgrs",coordinateSegments:[{alias:"Z",description:"grid zone",searchPattern:/\d{1,2}\w|[abyz]/i},{alias:"S",description:"grid square",searchPattern:/\w{2}/},{alias:"X",description:"easting",searchPattern:/^\d{5}(?=.?\d{5}$)|^\d{4}(?=.?\d{4}$)|^\d{3}(?=.?\d{3}$)|^\d{2}(?=.?\d{2}$)|^\d(?=.?\d$)/},{alias:"Y",description:"northing",searchPattern:/^\d{1,5}/}],defaultPattern:"Z S X Y"}),new f({name:"usng",coordinateSegments:[{alias:"Z",description:"grid zone",searchPattern:/\d{1,2}\w|[abyz]/i},{alias:"S",description:"grid square",searchPattern:/\w{2}/},{alias:"X",description:"easting",searchPattern:/^\d{5}(?=.?\d{5}$)|^\d{4}(?=.?\d{4}$)|^\d{3}(?=.?\d{3}$)|^\d{2}(?=.?\d{2}$)|^\d(?=.?\d$)/},{alias:"Y",description:"northing",searchPattern:/^\d{1,5}/}],defaultPattern:"Z S X Y"}),new f({name:"utm",coordinateSegments:[{alias:"Z",description:"zone number",searchPattern:/\d{1,2}|[abyz]/i},{alias:"B",description:"latitude band",searchPattern:/^\w/},{alias:"X",description:"easting",searchPattern:/\d{1,7}/},{alias:"Y",description:"northing",searchPattern:/\d{1,7}/}],defaultPattern:"ZB X Y"})]}function w(t){return"number"==typeof t&&isFinite(t)}function P(t){return w(t.x)&&w(t.y)}function S(t,e){if(t.spatialReference.isGeographic&&e){var n=l([t.x,t.y],e);return n[0]+", "+n[1]}return t.x.toFixed(3)+", "+t.y.toFixed(3)}function D(t){var e=t.spatialReference,n=t.geometryServicePromise,i=t.location,r=t.scale;if(!e||i.spatialReference.wkid===e.wkid)return s.resolve({location:i,coordinate:S(i,r)});if((i.spatialReference.isWGS84||i.spatialReference.isWebMercator)&&(e.isWGS84||e.isWebMercator))return s.resolve({location:p.project(i,e),coordinate:S(i,r)});if(X[0]===i&&X[1]===e.wkid)return X[2];X[0]=i,X[1]=e.wkid;var o=n.then(function(t){return t.project({geometries:[i],outSpatialReference:e}).then(function(t){if(!P(t[0]))throw t[0];return{location:t[0],coordinate:S(t[0],r)}}).catch(function(t){throw new u("coordinate-conversion:projection-failed","Failed to project point",{projectionResult:t})})});return X[2]=o,o}function x(t){var e=t.match(A),n=e?e[0]:"",i=t.indexOf(".")>=0?t.split(".")[1].length:0;return n+o.format(Number(t),{pattern:"###0.###",places:i,round:-1})}function R(t){return o.parse(t)}function E(t){var e=t.formatName,i=t.location,r=t.geometryServicePromise,o=y[e]||{},a=n({coordinates:[[i.x,i.y]],sr:i.spatialReference,conversionType:e},o);return r.then(function(t){return t.toGeoCoordinateString(a).then(function(t){var e=t[0];if(!e)throw t;return{location:i,coordinate:e}}).catch(function(t){throw new u("coordinate-conversion:to-geo-coordinate-string-failed","Failed to convert coordinate notation",{notationResult:t})})})}Object.defineProperty(e,"__esModule",{value:!0});var y={utm:{conversionMode:"utmDefault",addSpaces:!1},usng:{numOfDigits:5,rounding:!1,addSpaces:!1},mgrs:{rounding:!1}},X=new Array(3),Y=a.locale,W=i.getLocalization("dojo.cldr","number",Y).decimal,N=r.abbreviatedDirections.north,j=r.abbreviatedDirections.south,F=r.abbreviatedDirections.east,$=r.abbreviatedDirections.west,C={N:"north",S:"south",E:"east",W:"west"},z={};z[N]="N",z[j]="S",z[F]="E",z[$]="W";var G=new RegExp("-?\\d+[\\.|\\"+W+"]?\\d*"),Z=new RegExp("N|S|"+N+"|"+j,"i"),B=new RegExp("E|W|"+F+"|"+$,"i"),A=/^[\\0]+(?!\.)/;e.clipLonLat=l,e.getDegreePrecision=b,e.debounceDeferred=g,e.fromGeoCoordinateString=h,e.fromXY=m,e.generateDefaultFormats=v,e.isValidPoint=P,e.pointToCoordinate=S,e.project=D,e.toGeoCoordinateString=E});