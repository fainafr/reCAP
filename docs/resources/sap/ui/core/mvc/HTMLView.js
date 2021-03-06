/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./View","./HTMLViewRenderer","sap/base/util/merge","sap/ui/base/ManagedObject","sap/ui/core/DeclarativeSupport","sap/ui/core/library","sap/ui/model/resource/ResourceModel","sap/base/util/LoaderExtensions"],function(e,t,r,n,o,i,a,l,s){"use strict";var u=a.mvc.ViewType;var c=t.extend("sap.ui.core.mvc.HTMLView",{metadata:{library:"sap.ui.core"}});c.create=function(e){var r=n({},e);r.type=u.HTML;return t.create(r)};sap.ui.htmlview=function(e,t){return sap.ui.view(e,t,u.HTML)};c._sType=u.HTML;c.asyncSupport=true;c._mTemplates={};c._mAllowedSettings={viewName:true,controller:true,viewContent:true,definition:true,controllerName:true,resourceBundleName:true,resourceBundleUrl:true,resourceBundleLocale:true,resourceBundleAlias:true};c._getTemplate=function(e,t){var r=this._getViewUrl(e);var n=this._mTemplates[r];if(!n){n=this._loadTemplate(e,t);if(t&&t.async){var o=this;return n.then(function(e){o._mTemplates[r]=e;return Promise.resolve(e)})}else{this._mTemplates[r]=n}}return t.async?Promise.resolve(n):n};c.prototype.getControllerName=function(){return this._controllerName};c._getViewUrl=function(e){return sap.ui.require.toUrl(e.replace(/\./g,"/"))+".view.html"};c._loadTemplate=function(e,t){var r=e.replace(/\./g,"/")+".view.html";return s.loadResource(r,t)};c.prototype.initViewSettings=function(t){if(!t){throw new Error("mSettings must be given")}if(t.viewName&&t.viewContent){throw new Error("View name and view content are given. There is no point in doing this, so please decide.")}else if(!t.viewName&&!t.viewContent){throw new Error("Neither view name nor view content is given. One of them is required.")}var r=this;function n(){r._oTemplate=document.createElement("div");if(typeof o==="string"){r._oTemplate.innerHTML=o}else{var n=o;var a=document.createDocumentFragment();for(var s=0;s<n.length;s++){a.appendChild(n.item(s))}r._oTemplate.appendChild(a)}var u=r._oTemplate.getElementsByTagName("template")[0];var p=r.getMetadata().getAllProperties();if(u){e.each(u.attributes,function(e,n){var o=i.convertAttributeToSettingName(n.name,r.getId());var a=n.value;var l=p[o];if(!t[o]){if(l){t[o]=i.convertValueToType(i.getPropertyDataType(l),a)}else if(c._mAllowedSettings[o]){t[o]=a}}});r._oTemplate=u}if(r._oTemplate.content){var a=r._oTemplate.content;r._oTemplate=document.createElement("div");r._oTemplate.appendChild(a)}if(t.controllerName){r._controllerName=t.controllerName}if((t.resourceBundleName||t.resourceBundleUrl)&&(!t.models||!t.models[t.resourceBundleAlias])){var m=new l({bundleName:t.resourceBundleName,bundleUrl:t.resourceBundleUrl,bundleLocale:t.resourceBundleLocale,async:t.async});var d=m.getResourceBundle();if(d instanceof Promise){return d.then(function(){r.setModel(m,t.resourceBundleAlias)})}r.setModel(m,t.resourceBundleAlias)}}var o=t.viewContent;if(!o){o=c._getTemplate(t.viewName,{async:t.async})}if(t.async){return o.then(function(e){o=e;return n()})}n()};c.prototype.onControllerConnected=function(e){var t=this;o.runWithPreprocessors(function(){i.compile(t._oTemplate,t)},{settings:this._fnSettingsPreprocessor})};c.prototype.exit=function(){this._oTemplate=null;t.prototype.exit.call(this);if(this._connectedControls){for(var e=0;e<this._connectedControls.length;e++){this._connectedControls[e].destroy()}this._connectedControls=null}};c.prototype.connectControl=function(e){this._connectedControls=this._connectedControls||[];this._connectedControls.push(e)};return c});