/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/InvisibleRenderer"],function(e,t){"use strict";var s=e.TextDirection;var i={apiVersion:2};i.render=function(e,a){var n=a.getButtons(),l=n.filter(function(e){return e.getVisible()}),r=0,o=a.getSelectedButton(),g,c,d,f;if(l.length){l[l.length-1].addStyleClass("sapMSegBtnLastVisibleButton")}if(a._bInOverflow){e.openStart("div",a);e.openEnd();e.renderControl(a.getAggregation("_select"));e.close("div");return}e.openStart("ul",a);if(i._addAllIconsClass(n)){e.class("sapMSegBIcons")}e.class("sapMSegB");e.style("width",a.getWidth());c=a.getTooltip_AsString();if(c){e.attr("title",c)}e.accessibilityState(a,{role:"radiogroup"});e.openEnd();for(var p=0;p<n.length;p++){g=n[p];if(g.getVisible()){var u=g.getText(),S=g.getIcon(),B="",I;++r;if(S){I=g._getImage(g.getId()+"-img",S);if(I instanceof sap.m.Image){a._overwriteImageOnload(I)}else if(!g.getTooltip()){B=a._getIconAriaLabel(I)}}e.openStart("li",g);e.attr("aria-posinset",r);e.attr("aria-setsize",l.length);e.class("sapMSegBBtn");if(g.aCustomStyleClasses!==undefined&&g.aCustomStyleClasses instanceof Array){for(var b=0;b<g.aCustomStyleClasses.length;b++){e.class(g.aCustomStyleClasses[b])}}if(g.getEnabled()){e.class("sapMSegBBtnFocusable")}else{e.class("sapMSegBBtnDis")}if(o===g.getId()){e.class("sapMSegBBtnSel")}if(S&&u!==""){e.class("sapMSegBBtnMixed")}d=g.getWidth();e.style("width",d);c=g.getTooltip_AsString();if(c){e.attr("title",c)}e.attr("tabindex",g.getEnabled()?"0":"-1");f=g.getTextDirection();if(f!==s.Inherit){e.attr("dir",f.toLowerCase())}e.accessibilityState(g,{role:"radio",checked:o===g.getId()});if(I&&B!==""){if(u!==""){B+=" "+u}else{e.attr("title",B)}e.attr("aria-label",B)}e.openEnd();e.openStart("div");e.class("sapMSegBBtnInner");e.openEnd();if(S&&I){e.renderControl(I)}if(u!==""){e.text(u)}e.close("div");e.close("li")}else{t.render(e,g,"li")}}e.close("ul")};i._addAllIconsClass=function(e){for(var t=0;t<e.length;t++){if(!e[t].getIcon()){return false}}return true};return i},true);