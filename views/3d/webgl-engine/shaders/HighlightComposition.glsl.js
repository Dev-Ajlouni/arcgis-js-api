// COPYRIGHT © 2020 Esri
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
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/makeTemplateObjectHelper","../core/shaderModules/interfaces","../core/shaderModules/ShaderBuilder"],(function(e,n,i,t,o){var l,r,u,a,s,c,d,g,v,h,m;Object.defineProperty(n,"__esModule",{value:!0}),n.build=function(e){var n=new o.ShaderBuilder,f=n.vertex.code,x=n.fragment.code;return n.attributes.add("position","vec2"),2===e.highlightStage&&(f.add(t.glsl(l||(l=i(["\n    void main() {\n      gl_Position = vec4(vec2(1.0) - position * 2.0, 0.0, 1.0);\n    }"],["\n    void main() {\n      gl_Position = vec4(vec2(1.0) - position * 2.0, 0.0, 1.0);\n    }"])))),n.fragment.uniforms.add("tex","sampler2D"),n.fragment.uniforms.add("invFramebufferDim","vec2"),x.add(t.glsl(r||(r=i(["\n      void main() {\n        vec2 coord = gl_FragCoord.xy * invFramebufferDim;\n        vec4 value = texture2D(tex, coord);\n        float mx = floor(max(value.g, value.b));\n        gl_FragColor = vec4(ceil(value.r), mx, mx, 1.0);\n      }"],["\n      void main() {\n        vec2 coord = gl_FragCoord.xy * invFramebufferDim;\n        vec4 value = texture2D(tex, coord);\n        float mx = floor(max(value.g, value.b));\n        gl_FragColor = vec4(ceil(value.r), mx, mx, 1.0);\n      }"]))))),0===e.highlightStage&&(n.attributes.add("uv0","vec2"),e.gridOptimization?(n.vertex.uniforms.add("coverageTex","sampler2D"),n.fragment.uniforms.add("blurSize","vec2"),n.varyings.add("blurCoordinate","vec3")):(n.vertex.uniforms.add("blurSize","vec2"),n.varyings.add("blurCoordinates[5]","vec2")),f.add(t.glsl(s||(s=i(["\n    void main() {\n      gl_Position = vec4(position, 0.0, 1.0);\n      ","\n    }"],["\n    void main() {\n      gl_Position = vec4(position, 0.0, 1.0);\n      ","\n    }"])),e.gridOptimization?t.glsl(u||(u=i(["\n      vec4 cov = texture2D(coverageTex, uv0);\n      if (cov.r == 0.0) {\n        gl_Position = vec4(0.0);\n      }\n      blurCoordinate = vec3(gl_Position.xy * 0.5 + vec2(0.5), max(cov.g, cov.b));\n      "],["\n      vec4 cov = texture2D(coverageTex, uv0);\n      if (cov.r == 0.0) {\n        gl_Position = vec4(0.0);\n      }\n      blurCoordinate = vec3(gl_Position.xy * 0.5 + vec2(0.5), max(cov.g, cov.b));\n      "]))):t.glsl(a||(a=i(["\n      vec2 uv = position.xy * 0.5 + vec2(0.5);\n      blurCoordinates[0] = uv;\n      blurCoordinates[1] = uv + blurSize * 1.407333;\n      blurCoordinates[2] = uv - blurSize * 1.407333;\n      blurCoordinates[3] = uv + blurSize * 3.294215;\n      blurCoordinates[4] = uv - blurSize * 3.294215;\n          "],["\n      vec2 uv = position.xy * 0.5 + vec2(0.5);\n      blurCoordinates[0] = uv;\n      blurCoordinates[1] = uv + blurSize * 1.407333;\n      blurCoordinates[2] = uv - blurSize * 1.407333;\n      blurCoordinates[3] = uv + blurSize * 3.294215;\n      blurCoordinates[4] = uv - blurSize * 3.294215;\n          "]))))),n.fragment.uniforms.add("tex","sampler2D"),x.add(t.glsl(g||(g=i(["\n    void main() {\n      ","\n    }"],["\n    void main() {\n      ","\n    }"])),e.gridOptimization?t.glsl(c||(c=i(["\n          vec2 uv = blurCoordinate.xy;\n          vec4 center = texture2D(tex, uv);\n\n          // do not blur if no pixel or all pixels in neighborhood are set\n          if (blurCoordinate.z == 1.0) {\n            gl_FragColor = center;\n          } else {\n            vec4 sum = vec4(0.0);\n            sum += center * 0.204164;\n            sum += texture2D(tex, uv + blurSize * 1.407333) * 0.304005;\n            sum += texture2D(tex, uv - blurSize * 1.407333) * 0.304005;\n            sum += texture2D(tex, uv + blurSize * 3.294215) * 0.093913;\n            sum += texture2D(tex, uv - blurSize * 3.294215) * 0.093913;\n            gl_FragColor = sum;\n          }"],["\n          vec2 uv = blurCoordinate.xy;\n          vec4 center = texture2D(tex, uv);\n\n          // do not blur if no pixel or all pixels in neighborhood are set\n          if (blurCoordinate.z == 1.0) {\n            gl_FragColor = center;\n          } else {\n            vec4 sum = vec4(0.0);\n            sum += center * 0.204164;\n            sum += texture2D(tex, uv + blurSize * 1.407333) * 0.304005;\n            sum += texture2D(tex, uv - blurSize * 1.407333) * 0.304005;\n            sum += texture2D(tex, uv + blurSize * 3.294215) * 0.093913;\n            sum += texture2D(tex, uv - blurSize * 3.294215) * 0.093913;\n            gl_FragColor = sum;\n          }"]))):t.glsl(d||(d=i(["\n          vec4 sum = vec4(0.0);\n          sum += texture2D(tex, blurCoordinates[0]) * 0.204164;\n          sum += texture2D(tex, blurCoordinates[1]) * 0.304005;\n          sum += texture2D(tex, blurCoordinates[2]) * 0.304005;\n          sum += texture2D(tex, blurCoordinates[3]) * 0.093913;\n          sum += texture2D(tex, blurCoordinates[4]) * 0.093913;\n          gl_FragColor = sum;"],["\n          vec4 sum = vec4(0.0);\n          sum += texture2D(tex, blurCoordinates[0]) * 0.204164;\n          sum += texture2D(tex, blurCoordinates[1]) * 0.304005;\n          sum += texture2D(tex, blurCoordinates[2]) * 0.304005;\n          sum += texture2D(tex, blurCoordinates[3]) * 0.093913;\n          sum += texture2D(tex, blurCoordinates[4]) * 0.093913;\n          gl_FragColor = sum;"])))))),1===e.highlightStage&&(n.varyings.add("uv","vec2"),e.gridOptimization&&(n.attributes.add("uv0","vec2"),n.vertex.uniforms.add("coverageTex","sampler2D")),f.add(t.glsl(h||(h=i(["\n      void main() {\n        ","\n        gl_Position = vec4(position, 0.0, 1.0);\n        uv = position.xy * 0.5 + vec2(0.5);\n      }"],["\n      void main() {\n        ","\n        gl_Position = vec4(position, 0.0, 1.0);\n        uv = position.xy * 0.5 + vec2(0.5);\n      }"])),e.gridOptimization?t.glsl(v||(v=i(["\n            vec4 cov = texture2D(coverageTex, uv0);\n            // if no highlight pixel set in this block, hide block\n            if (cov.r == 0.0) {\n              gl_Position = vec4(0.0);\n              return;\n            }"],["\n            vec4 cov = texture2D(coverageTex, uv0);\n            // if no highlight pixel set in this block, hide block\n            if (cov.r == 0.0) {\n              gl_Position = vec4(0.0);\n              return;\n            }"]))):"")),n.fragment.uniforms.add("tex","sampler2D"),n.fragment.uniforms.add("origin","sampler2D"),n.fragment.uniforms.add("color","vec4"),n.fragment.uniforms.add("haloColor","vec4"),n.fragment.uniforms.add("outlineSize","float"),n.fragment.uniforms.add("blurSize","float"),n.fragment.uniforms.add("opacities","vec4"),x.add(t.glsl(m||(m=i(["\n      void main() {\n        // Read the highlight intensity from the blurred highlight image\n        vec4 blurredHighlightValue = texture2D(tex, uv);\n        float highlightIntensity = blurredHighlightValue.a;\n\n        // Discard all pixels which are not affected by highlight\n        if (highlightIntensity == 0.0) {\n          discard;\n        }\n\n        vec4 origin_color = texture2D(origin, uv);\n\n        float outlineIntensity;\n        float fillIntensity;\n\n        // if occluded\n        if (blurredHighlightValue.g > blurredHighlightValue.b) {\n          outlineIntensity = haloColor.w * opacities[1];\n          fillIntensity = color.w * opacities[3];\n        }\n        // if unoccluded\n        else {\n          outlineIntensity = haloColor.w * opacities[0];\n          fillIntensity = color.w * opacities[2];\n        }\n\n        float inner = 1.0 - outlineSize / 9.0;\n        float outer = 1.0 - (outlineSize + blurSize) / 9.0;\n\n        float outlineFactor = smoothstep(outer, inner, highlightIntensity);\n        //float fillFactor = smoothstep(0.6, 0.72, highlightIntensity);\n        float fillFactor = any(notEqual(origin_color, vec4(0.0, 0.0, 0.0, 0.0))) ? 1.0 : 0.0;\n        float intensity = outlineIntensity * outlineFactor * (1.0 - fillFactor) + fillIntensity * fillFactor;\n\n        // Blending equation: gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\n        // I.e., color should not be premultiplied with alpha\n        gl_FragColor = vec4(mix(haloColor.rgb, color.rgb, fillFactor), intensity);\n      }"],["\n      void main() {\n        // Read the highlight intensity from the blurred highlight image\n        vec4 blurredHighlightValue = texture2D(tex, uv);\n        float highlightIntensity = blurredHighlightValue.a;\n\n        // Discard all pixels which are not affected by highlight\n        if (highlightIntensity == 0.0) {\n          discard;\n        }\n\n        vec4 origin_color = texture2D(origin, uv);\n\n        float outlineIntensity;\n        float fillIntensity;\n\n        // if occluded\n        if (blurredHighlightValue.g > blurredHighlightValue.b) {\n          outlineIntensity = haloColor.w * opacities[1];\n          fillIntensity = color.w * opacities[3];\n        }\n        // if unoccluded\n        else {\n          outlineIntensity = haloColor.w * opacities[0];\n          fillIntensity = color.w * opacities[2];\n        }\n\n        float inner = 1.0 - outlineSize / 9.0;\n        float outer = 1.0 - (outlineSize + blurSize) / 9.0;\n\n        float outlineFactor = smoothstep(outer, inner, highlightIntensity);\n        //float fillFactor = smoothstep(0.6, 0.72, highlightIntensity);\n        float fillFactor = any(notEqual(origin_color, vec4(0.0, 0.0, 0.0, 0.0))) ? 1.0 : 0.0;\n        float intensity = outlineIntensity * outlineFactor * (1.0 - fillFactor) + fillIntensity * fillFactor;\n\n        // Blending equation: gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);\n        // I.e., color should not be premultiplied with alpha\n        gl_FragColor = vec4(mix(haloColor.rgb, color.rgb, fillFactor), intensity);\n      }"]))))),n}}));