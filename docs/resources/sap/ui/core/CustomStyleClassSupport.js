/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Element","sap/base/assert","sap/base/Log","sap/ui/thirdparty/jquery"],function(s,t,e,i){"use strict";var a=function(){if(!(this instanceof s)){return}var a=this.clone;this.clone=function(){var s=a.apply(this,arguments);if(this.aCustomStyleClasses){s.aCustomStyleClasses=this.aCustomStyleClasses.slice()}if(this.mCustomStyleClassMap){s.mCustomStyleClassMap=i.extend({},this.mCustomStyleClassMap)}return s};var l=/\S+/g;this.addStyleClass=function(s,e){t(typeof s==="string","sStyleClass must be a string");var a,u=false;var f=[],h=n();if(!this.aCustomStyleClasses){this.aCustomStyleClasses=[]}if(!this.mCustomStyleClassMap){this.mCustomStyleClassMap={}}if(s&&typeof s==="string"){if(s.indexOf('"')>-1){return this}if(s.indexOf("'")>-1){return this}a=s.match(l)||[];a.forEach(function(s){if(!this.mCustomStyleClassMap[s]){this.mCustomStyleClassMap[s]=true;this.aCustomStyleClasses.push(s);if(h&&h.indexOf(s)>-1){f.push(s)}u=true}}.bind(this));if(!u){return this}var o=this.getDomRef();if(o){i(o).addClass(s)}else if(e===false){this.invalidate()}if(f.length>0){r(this,f,true)}}return this};this.removeStyleClass=function(s,e){t(typeof s==="string","sStyleClass must be a string");var a,u=false,f;var h=[],o=n();if(s&&typeof s==="string"&&this.aCustomStyleClasses&&this.mCustomStyleClassMap){a=s.match(l)||[];a.forEach(function(s){if(this.mCustomStyleClassMap[s]){u=true;f=this.aCustomStyleClasses.indexOf(s);if(f!==-1){this.aCustomStyleClasses.splice(f,1);delete this.mCustomStyleClassMap[s];if(o&&o.indexOf(s)>-1){h.push(s)}}}}.bind(this))}if(u){var C=this.getDomRef();if(C){i(C).removeClass(s)}else if(e===false){this.invalidate()}if(h.length>0){r(this,h,false)}}return this};this.toggleStyleClass=function(s,i){t(typeof s==="string","sStyleClass must be a string");if(s&&typeof s==="string"){if(i===true){this.addStyleClass(s)}else if(i===false){this.removeStyleClass(s)}else if(i===undefined){this.hasStyleClass(s)?this.removeStyleClass(s):this.addStyleClass(s)}else{e.warning(this.toString()+"- toggleStyleClass(): bAdd should be a boolean or undefined, but is '"+i+"'")}}return this};this.hasStyleClass=function(s){t(typeof s==="string","sStyleClass must be a string");var e;if(s&&typeof s==="string"&&this.mCustomStyleClassMap){e=s.match(l)||[];return e.length!==0&&e.every(function(s){return this.mCustomStyleClassMap[s]}.bind(this))}return false};this.getMetadata().addPublicMethods(["addStyleClass","removeStyleClass","toggleStyleClass","hasStyleClass"])};var l;function n(){if(!l){l=sap.ui.require("sap/ui/core/theming/Parameters")}if(l){return l._getScopes(true)}}function r(s,t,e){sap.ui.getCore().fireThemeScopingChanged({scopes:t,added:e,element:s})}return a},true);