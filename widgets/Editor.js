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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","@dojo/framework/shim/Map","dojo/i18n!../nls/common","dojo/i18n!./Editor/nls/Editor","dojo/i18n!./FeatureTemplates/nls/FeatureTemplates","dojo/keys","../core/HandleOwner","../core/lang","../core/watchUtils","../core/accessorSupport/decorators","./FeatureForm","./FeatureTemplates","./Widget","./Editor/EditorViewModel","./FeatureTemplates/ItemList","./support/widget"],function(e,t,r,i,a,n,o,l,s,d,c,u,p,f,w,h,y,v,g,k){function _(e){e.focus()}var m={base:"esri-editor esri-widget",header:"esri-editor__header",scroller:"esri-editor__scroller",content:"esri-editor__content",contentWrapper:"esri-editor__temp-wrapper",message:"esri-editor__message",controls:"esri-editor__controls",title:"esri-editor__title",backButton:"esri-editor__back-button",modeSelection:"esri-editor__mode-selection",progressBar:"esri-editor__progress-bar",warningCard:"esri-editor__warning-card",warningHeader:"esri-editor__warning-header",warningHeading:"esri-editor__warning-heading",warningMessage:"esri-editor__warning-message",warningDivider:"esri-editor__warning-divider",warningOption:"esri-editor__warning-option",warningOptionPrimary:"esri-editor__warning-option--primary",warningOptionNegative:"esri-editor__warning-option--negative",warningOptionPositive:"esri-editor__warning-option--positive",featureList:"esri-editor__feature-list",featureListItem:"esri-editor__feature-list-item",featureListItemDisabled:"esri-editor__feature-list-item--disabled",featureListName:"esri-editor__feature-list-name",featureListIcon:"esri-editor__feature-list-icon",featureListIndex:"esri-editor__feature-list-index",controlButton:"esri-editor__control-button",overlay:"esri-editor__overlay",errorIcon:"esri-icon-error2",basemapIcon:"esri-basemap",rightArrowIcon:"esri-icon-right",leftArrowIcon:"esri-icon-left",warningIcon:"esri-icon-notice-triangle",widgetIcon:"esri-icon-edit",button:"esri-button",buttonDisabled:"esri-button--disabled",buttonSecondary:"esri-button--secondary",buttonTertiary:"esri-button--tertiary",heading:"esri-heading",input:"esri-input",interactive:"esri-interactive",select:"esri-select"};return function(e){function t(t){var r=e.call(this)||this;return r._featureForm=new w,r._featureTemplates=new h,r._filterText="",r._prompt=null,r.activeWorkflow=null,r.allowedWorkflows=null,r.iconClass=m.widgetIcon,r.label=l.widgetLabel,r.layerInfos=null,r.supportingWidgetDefaults=null,r.view=null,r.viewModel=new v,r._handleSave=r._handleSave.bind(r),r._handleBack=r._handleBack.bind(r),r._handleDone=r._handleDone.bind(r),r._handleDelete=r._handleDelete.bind(r),r._handleAdd=r._handleAdd.bind(r),r._handleEdit=r._handleEdit.bind(r),r}return r(t,e),t.prototype.postInitialize=function(){var e=this;this.own([p.init(this,"viewModel",function(t){e._featureForm.viewModel=t?t.featureFormViewModel:null,e._featureTemplates.viewModel=t?t.featureTemplatesViewModel:null}),p.on(this,"viewModel.sketchViewModel","create",function(t){"active"===t.state&&e.scheduleRender()}),p.on(this,"viewModel.activeWorkflow","cancel-request",function(t){var r=t.controller;e._prompt={title:l.cancelRequestTitle,message:l.cancelRequestWarningMessage,options:[{label:o.form.no,type:"neutral",action:function(){return r.deny(),e._prompt=null}},{label:o.form.yes,type:"negative",action:function(){r.allow(),e._prompt=null}}]},e.scheduleRender()}),p.init(this,"supportingWidgetDefaults",function(t){t&&(e._featureForm.set(t.featureForm),e._featureTemplates.set(t.featureTemplates),e.viewModel.sketchViewModel.set(t.sketch))}),p.watch(this,"viewModel.failures",function(t){if(t){var r=t[0],i=r.error,a=r.retry,n=r.cancel;e._prompt={title:l.errorWarningTitle,message:u.substitute({errorMessage:i.message},l.errorWarningMessageTemplate),options:[{label:l.retry,type:"positive",action:function(){a(),e._prompt=null}},{label:l.ignore,type:"neutral",action:function(){return n(),e._prompt=null}}]}}}),p.whenNot(this,"viewModel.activeWorkflow",function(){return e._featureTemplates.filterText=""})])},t.prototype.startCreateWorkflowAtFeatureTypeSelection=function(){return null},t.prototype.startCreateWorkflowAtFeatureCreation=function(e){return null},t.prototype.startCreateWorkflowAtFeatureEdit=function(e){return null},t.prototype.startUpdateWorkflowAtFeatureSelection=function(){return null},t.prototype.startUpdateWorkflowAtMultipleFeatureSelection=function(e){return null},t.prototype.startUpdateWorkflowAtFeatureEdit=function(e){return null},t.prototype.deleteFeatureFromWorkflow=function(){return null},t.prototype.cancelWorkflow=function(e){return null},t.prototype.render=function(){var e=this.viewModel;if(!e)return k.tsx("div",{class:m.base});var t=e.state,r=this._prompt?k.tsx("div",{class:m.overlay,key:"overlay"},this.renderPrompt({message:this._prompt.message,title:this._prompt.title,options:this._prompt.options})):null;return k.tsx("div",{class:m.base},this.viewModel.syncing?this.renderProgressBar():null,"disabled"===t?null:"ready"===t?this.renderLanding():"awaiting-feature-creation-info"===t?this.renderTemplates():"editing-new-feature"===t||"editing-existing-feature"===t?this.renderAttributeEditing():"awaiting-feature-to-update"===t?this.renderFeatureUpdating():"awaiting-update-feature-candidate"===t?this.renderFeatureList():"awaiting-feature-to-create"===t?this.renderFeatureCreation():null,r)},t.prototype.renderTemplates=function(){return k.tsx("div",{class:m.contentWrapper,key:"wrapper"},this.renderHeader(l.selectTemplate,!0),k.tsx("div",{key:"content",class:m.content},this._featureTemplates.render()),this.renderControls([{label:o.back,type:"secondary",clickHandler:this._handleDone}]))},t.prototype.renderAttributeEditing=function(){var e=this.viewModel,t=e.activeWorkflow,r=e.featureFormViewModel,i=t.data.edits.feature,a="update"===t.type&&!t.data.edits.modified||r.inputFields.length>0&&!r.valid,n="create"===t.type?o.add:o.update,s=[{label:n,type:"primary",disabled:a,clickHandler:this._handleSave},{label:o.back,type:"secondary",clickHandler:this._handleBack}];"update"===t.type&&t.data.editableItem.supports.indexOf("delete")>-1&&s.push({label:o.delete,type:"tertiary",clickHandler:this._handleDelete});var d=this._getLabel(i);return k.tsx("div",{class:m.contentWrapper,key:"wrapper"},this.renderHeader(d,!0),k.tsx("div",{key:"content",class:this.classes(m.content,m.scroller)},r.inputFields.length>0?this._featureForm.render():this.renderMessage(u.substitute({button:n},l.clickToFinishTemplate))),this.renderControls(s))},t.prototype.renderFeatureUpdating=function(){return k.tsx("div",{class:m.contentWrapper,key:"wrapper"},this.renderHeader(l.selectFeature,!0),k.tsx("div",{key:"content",class:this.classes(m.content,m.scroller)},this.renderMessage(l.selectFeatureToEdit)),this.renderControls([{label:o.back,type:"secondary",clickHandler:this._handleDone}]))},t.prototype.renderMessage=function(e){return k.tsx("div",{class:m.message},e)},t.prototype.renderFeatureCreation=function(){var e=this.viewModel,t=e.activeWorkflow,r=t.data.creationInfo.layer,i=this._getSketchingTip(r.geometryType,e.sketchViewModel.createGraphic);return k.tsx("div",{class:m.contentWrapper,key:"wrapper"},this.renderHeader(l.placeFeature,!0),k.tsx("div",{key:"content",class:this.classes(m.content,m.scroller)},this.renderMessage(i)),this.renderControls([{label:o.back,type:"secondary",clickHandler:this._handleBack}]))},t.prototype.renderControls=function(e){var t=this;return k.tsx("div",{class:m.controls,key:"controls"},e.map(function(e,r){var i=e.disabled,a=void 0!==i&&i,n=e.label,o=e.type,l=e.clickHandler;return t.renderButton({label:n,class:t.classes(m.controlButton,m.button,"secondary"===o?m.buttonSecondary:"tertiary"===o?m.buttonTertiary:null,a?m.buttonDisabled:null),disabled:a,clickHandler:l,key:r})}))},t.prototype.renderPrompt=function(e){var t=this,r=e.title,i=e.message,a=e.options,n=void 0===a?[]:a;return k.tsx("div",{class:m.warningCard,role:"alert"},k.tsx("div",{class:m.warningHeader},k.tsx("span",{class:m.warningIcon,"aria-hidden":"true"}),k.tsx("h4",{class:this.classes(m.heading,m.warningHeading)},r)),k.tsx("div",{class:m.warningMessage},i),k.tsx("div",{class:m.warningDivider}),n.map(function(e,r){var i=e.label,a=e.action,n=e.type,o=0===r;return k.tsx("div",{afterCreate:o?_:null,class:t.classes(m.warningOption,o?m.warningOptionPrimary:null,"positive"===n?m.warningOptionPositive:"negative"===n?m.warningOptionNegative:null),key:r,onclick:a,onkeydown:function(e){e.keyCode!==d.ENTER&&e.keyCode!==d.SPACE||(e.preventDefault(),a.call(null))},tabIndex:0,role:"button"},i)}))},t.prototype.renderProgressBar=function(){return k.tsx("div",{class:this.classes(m.progressBar),key:"progress-bar"})},t.prototype.renderButton=function(e){return k.tsx("button",{class:e.class,disabled:e.disabled,key:e.key,onclick:e.clickHandler},e.label)},t.prototype.renderHeader=function(e,t){return void 0===t&&(t=!1),k.tsx("header",{class:m.header,key:"header"},t?k.tsx("div",{"aria-label":o.back,class:this.classes(m.backButton,m.interactive),key:"back-button",onclick:this._handleBack,onkeydown:this._handleBack,tabIndex:0,title:o.back},k.tsx("span",{"aria-hidden":"true",class:k.isRTL()?m.rightArrowIcon:m.leftArrowIcon})):null,k.tsx("h4",{class:this.classes(m.title,m.heading)},e))},t.prototype.renderLanding=function(){var e=this.viewModel,t=e.allowedWorkflows,r=e.canCreate,i=e.canUpdate,a=k.isRTL()?m.leftArrowIcon:m.rightArrowIcon;return k.tsx("div",{class:m.contentWrapper,key:"wrapper"},this.renderHeader(l.widgetLabel),k.tsx("div",{key:"content",class:m.content,role:"group"},k.tsx("div",{class:m.modeSelection,key:"mode-selection"},t.indexOf("update")>-1?k.tsx("div",{"aria-disabled":i?"false":"true",class:this.classes(m.featureListItem,i?null:m.featureListItemDisabled),key:"update",onclick:this._handleEdit,onkeydown:this._handleEdit,role:"button",tabIndex:i?0:-1},k.tsx("span",{class:m.featureListName},l.editFeature),k.tsx("span",{"aria-hidden":"true",class:this.classes(m.featureListIcon,a)})):null,t.indexOf("create")>-1?k.tsx("div",{class:this.classes(m.featureListItem,r?null:m.featureListItemDisabled),key:"create",onclick:this._handleAdd,onkeydown:this._handleAdd,role:"button",tabIndex:r?0:-1},k.tsx("span",{class:m.featureListName},l.addFeature),k.tsx("span",{"aria-hidden":"true",class:this.classes(m.featureListIcon,a)})):null)))},t.prototype.renderFeatureList=function(){var e=this,t=this.viewModel,r=t.editableItems,i=t.activeWorkflow,a=i,d=a.data.candidates,c=u.substitute({total:d.length},l.multipleFeaturesTemplate),p=new n.default;d.map(function(t){return{label:e._getLabel(t),id:t.attributes[t.layer.objectIdField],data:t}}).filter(function(t){var r=t.label,i=t.data,a=e._filterText.toLowerCase(),n=i.layer.title;return e.viewModel.editableItems.find(function(e){return e.layer===i.layer}).supports.indexOf("update")>-1&&(!a||r.toLowerCase().indexOf(a)>-1||n.toLowerCase().indexOf(a)>-1)}).forEach(function(e){var t=e.data.layer;if(!p.has(t))return void p.set(t,{id:t.id,label:t.title,items:[e]});p.get(t).items.push(e)});var f=r.filter(function(e){var t=e.layer;return p.has(t)}).map(function(e){var t=e.layer;return p.get(t)}).toArray();return k.tsx("div",{class:m.contentWrapper,key:"wrapper"},this.renderHeader(c,!0),k.tsx("div",{key:"content",class:this.classes(m.content,m.scroller)},g.ItemList({id:this.id,filterText:this._filterText,items:f,messages:{filterPlaceholder:s.filterPlaceholder,noItems:s.noItems,noMatches:s.noMatches},onItemMouseEnter:function(e){var t=e.data;a.data.edits.feature=t},onItemMouseLeave:function(){a.data.edits.feature=null},onItemSelect:function(e){var t=e.data;a.data.edits.feature=t,a.next()},onFilterChange:function(t){e._filterText=t}})),this.renderControls([{label:o.back,type:"secondary",clickHandler:this._handleBack}]))},t.prototype._getSketchingTip=function(e,t){if("point"===e)return l.tips.clickToAddPoint;if("polygon"===e||"polyline"===e){if(!t)return l.tips.clickToStart;var r=t.geometry,i="polygon"===e?"rings":"paths",a=r[i][0];return"polygon"===e&&a<4?l.tips.clickToContinue:l.tips.clickToContinueThenDoubleClickToEnd}return l.tips.clickToAddFeature},t.prototype._getLabel=function(e){var t=e.layer,r=t.displayField,i=t.objectIdField,a=e.attributes;return r&&a[r]||u.substitute({id:a[i]},l.untitledFeatureTemplate)},t.prototype._handleDelete=function(){var e=this;this._prompt={title:l.deleteWarningTitle,message:l.deleteWarningMessage,options:[{label:l.keep,type:"neutral",action:function(){return e._prompt=null}},{label:o.delete,type:"positive",action:function(){e.viewModel.deleteFeatureFromWorkflow(),e._prompt=null}}]}},t.prototype._handleSave=function(){var e=this.viewModel.activeWorkflow;e.commit(),e.reset()},t.prototype._handleAdd=function(){this.viewModel.canCreate&&this.viewModel.startCreateWorkflowAtFeatureTypeSelection()},t.prototype._handleEdit=function(){this.viewModel.canUpdate&&this.viewModel.startUpdateWorkflowAtFeatureSelection()},t.prototype._handleDone=function(){this.viewModel.cancelWorkflow({force:!0})},t.prototype._handleBack=function(){var e=this,t=this.viewModel.activeWorkflow,r=t.stepId,i=t.data,a=t.type,n=function(){if(t.hasPreviousStep)return void t.previous();e.viewModel.cancelWorkflow({force:!0})};if("editing-new-feature"===r||"editing-existing-feature"===r&&i.edits.modified){var o=l.cancelWarningTitle,s="create"===a?l.cancelCreateWarningMessage:l.cancelUpdateWarningMessage;return void(this._prompt={title:o,message:s,options:[{label:l.keep,type:"neutral",action:function(){return e._prompt=null}},{label:l.discard,type:"negative",action:function(){n(),e._prompt=null}}]})}n()},i([f.aliasOf("viewModel.activeWorkflow")],t.prototype,"activeWorkflow",void 0),i([f.aliasOf("viewModel.allowedWorkflows")],t.prototype,"allowedWorkflows",void 0),i([f.property()],t.prototype,"iconClass",void 0),i([f.property()],t.prototype,"label",void 0),i([f.aliasOf("viewModel.layerInfos")],t.prototype,"layerInfos",void 0),i([f.property()],t.prototype,"supportingWidgetDefaults",void 0),i([f.aliasOf("viewModel.view")],t.prototype,"view",void 0),i([f.property(),k.renderable(["viewModel.canCreate","viewModel.canUpdate","viewModel.failures","viewModel.state","viewModel.syncing","viewModel.activeWorkflow.data.edits.modified"])],t.prototype,"viewModel",void 0),i([f.aliasOf("viewModel.startCreateWorkflowAtFeatureTypeSelection")],t.prototype,"startCreateWorkflowAtFeatureTypeSelection",null),i([f.aliasOf("viewModel.startCreateWorkflowAtFeatureCreation")],t.prototype,"startCreateWorkflowAtFeatureCreation",null),i([f.aliasOf("viewModel.startCreateWorkflowAtFeatureEdit")],t.prototype,"startCreateWorkflowAtFeatureEdit",null),i([f.aliasOf("viewModel.startUpdateWorkflowAtFeatureSelection")],t.prototype,"startUpdateWorkflowAtFeatureSelection",null),i([f.aliasOf("viewModel.startUpdateWorkflowAtMultipleFeatureSelection")],t.prototype,"startUpdateWorkflowAtMultipleFeatureSelection",null),i([f.aliasOf("viewModel.startUpdateWorkflowAtFeatureEdit")],t.prototype,"startUpdateWorkflowAtFeatureEdit",null),i([f.aliasOf("viewModel.deleteFeatureFromWorkflow")],t.prototype,"deleteFeatureFromWorkflow",null),i([f.aliasOf("viewModel.cancelWorkflow")],t.prototype,"cancelWorkflow",null),i([k.accessibleHandler()],t.prototype,"_handleDelete",null),i([k.accessibleHandler()],t.prototype,"_handleAdd",null),i([k.accessibleHandler()],t.prototype,"_handleEdit",null),i([k.accessibleHandler()],t.prototype,"_handleDone",null),i([k.accessibleHandler()],t.prototype,"_handleBack",null),t=i([f.subclass("esri.widgets.Editor")],t)}(f.declared(y,c))});