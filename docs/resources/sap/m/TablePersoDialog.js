/*
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Button","./Dialog","./InputListItem","./List","./Toolbar","sap/ui/base/ManagedObject","sap/ui/base/ManagedObjectRegistry","sap/base/Log","sap/m/library","sap/ui/Device","sap/ui/model/Sorter","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/json/JSONModel","sap/m/CheckBox","sap/m/SearchField","sap/m/ScrollContainer","sap/ui/thirdparty/jquery"],function(t,e,o,i,s,n,l,a,r,h,c,u,d,_,g,p,f,m){"use strict";var S=r.ButtonType;var C=r.ToolbarDesign;var b=r.ListMode;var I=n.extend("sap.m.TablePersoDialog",{constructor:function(t,e){n.apply(this,arguments)},metadata:{properties:{contentWidth:{type:"sap.ui.core.CSSSize"},contentHeight:{type:"sap.ui.core.CSSSize",since:"1.22"},persoMap:{type:"object"},columnInfoCallback:{type:"object",since:"1.22"},initialColumnState:{type:"object",since:"1.22"},hasGrouping:{type:"boolean",since:"1.22"},showSelectAll:{type:"boolean",since:"1.22"},showResetAll:{type:"boolean",since:"1.22"}},aggregations:{persoService:{type:"Object",multiple:false,deprecated:true}},associations:{persoDialogFor:"sap.m.Table"},events:{confirm:{},cancel:{}},library:"sap.m"}});l.apply(I,{onDuplicate:function(t,e,o){if(e._sapui_candidateForDestroy){a.debug("destroying dangling template "+e+" when creating new object with same ID");e.destroy()}else{var i="adding TablePersoDialog with duplicate id '"+t+"'";if(sap.ui.getCore().getConfiguration().getNoDuplicateIds()){a.error(i);throw new Error("Error: "+i)}else{a.warning(i)}}}});I.prototype.init=function(){var n=this,l=0;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oP13nModel=new _;this._oP13nModel.setSizeLimit(Number.MAX_VALUE);this._fnUpdateCheckBoxes=m.proxy(function(t){var e=t.getParameter("selected"),o=this._oP13nModel.getData();if(t.getSource().getId()===this._getSelectAllCheckboxId()){o.aColumns.forEach(function(t){t.visible=e})}else{var i=!o.aColumns.some(function(t){return!t.visible});o.oHeader.visible=i}this._oP13nModel.setData(o)},this);this._oColumnItemTemplate=new o(this.getId()+"-li",{label:"{Personalization>text}",content:new g(this.getId()+"-cb",{selected:"{Personalization>visible}",select:this._fnUpdateCheckBoxes})}).addStyleClass("sapMPersoDialogLI");this._oButtonUp=new t(this.getId()+"-buttonUp",{icon:"sap-icon://arrow-top",enabled:false,tooltip:n._oRb.getText("PERSODIALOG_UP"),press:function(){n._moveItem(-1)}});this._oButtonDown=new t(this.getId()+"-buttonDown",{icon:"sap-icon://arrow-bottom",enabled:false,tooltip:n._oRb.getText("PERSODIALOG_DOWN"),press:function(){n._moveItem(1)}});this._fnHandleResize=function(){if(n._oDialog){var t=n._oDialog.$("cont");var e=n._oDialog.$("scroll");if(t.children().length>0){var o=t.children()[0].clientHeight;var i=e[0].clientHeight-o;var s=n.getShowSelectAll()?n._oSelectAllToolbar.$().outerHeight():0;n._oScrollContainer.setHeight(o-s-i+"px")}}};this._fnUpdateArrowButtons=function(t){var e=true,o=true,i=n._oSearchField.getValue(),s=n._oList.getItems().length;if(!!i||n._oList.getSelectedItems().length===0){o=false;e=false}else{if(n._oList.getItems()[0].getSelected()){o=false;if(t&&n._oButtonDown.getDomRef()){n._oButtonDown.getDomRef().focus()}}if(n._oList.getItems()[s-1].getSelected()){e=false;if(t&&n._oButtonUp.getDomRef()){n._oButtonUp.getDomRef().focus()}}}n._oButtonUp.setEnabled(o);n._oButtonDown.setEnabled(e)};this._fnListUpdateFinished=function(){var t=n._oList.$().find(".sapMCb"),e=t.length;for(var o=0;o<e;o++){var i=m(t[o]).parent(),s=i.siblings(),l=s.length==1?m(s[0]):null;if(l){i=i.detach();i[0].className="sapMLIBSelectM";i.insertBefore(l)}}if(n._sLastSelectedItemId){var a=function(t){var e=t.getBindingContext("Personalization")&&t.getBindingContext("Personalization").getProperty("id")===n._sLastSelectedItemId;if(e){n._oList.setSelectedItem(t)}return e};n._oList.getItems().some(a);n._sLastSelectedItemId=null;if(n._fnUpdateArrowButtons){n._fnUpdateArrowButtons.call(this)}}};this._fnAfterDialogOpen=function(){n._fnUpdateArrowButtons.call(n)};this._fnAfterScrollContainerRendering=function(){n._oScrollContainer.$().attr("tabindex","-1")};this._oList=new i(this.getId()+"-colList",{includeItemInSelection:true,noDataText:this._oRb.getText("PERSODIALOG_NO_DATA"),mode:b.SingleSelectMaster,selectionChange:function(){this._fnUpdateArrowButtons.call(this)}.bind(this),updateFinished:this._fnListUpdateFinished});this._oList.addDelegate({onAfterRendering:this._fnListUpdateFinished});this._oSearchField=new p(this.getId()+"-searchField",{width:"100%",liveChange:function(t){var e=t.getSource().getValue(),o=e?300:0;clearTimeout(l);if(o){l=setTimeout(function(){n._executeSearch()},o)}else{n._executeSearch()}},search:function(){n._executeSearch()}});this._oScrollContainer=new f({horizontal:false,vertical:true,content:[this._oList],width:"100%"});this._oScrollContainer.addDelegate({onAfterRendering:this._fnAfterScrollContainerRendering});this._resetAllButton=new t(this.getId()+"-buttonUndo",{icon:"sap-icon://undo",tooltip:this._oRb.getText("PERSODIALOG_UNDO"),press:function(){this._resetAll()}.bind(this)}).addStyleClass("sapMPersoDialogResetBtn");this._oSelectAllCheckbox=new g(this._getSelectAllCheckboxId(),{selected:"{Personalization>/oHeader/visible}",select:this._fnUpdateCheckBoxes,text:"{Personalization>/oHeader/text}"}).addStyleClass("sapMPersoDialogSelectAllCb");this._oSelectAllToolbar=new s(this.getId()+"-toolbarSelAll",{active:false,design:C.Transparent,content:[this._oSelectAllCheckbox,this._resetAllButton]}).addStyleClass("sapMPersoDialogFixedBar");this._oDialog=new e(this.getId()+"-Dialog",{title:this._oRb.getText("PERSODIALOG_COLUMNS_TITLE"),stretch:h.system.phone,horizontalScrolling:false,verticalScrolling:false,initialFocus:h.system.desktop?this._oList:null,content:[this._oSelectAllToolbar,this._oScrollContainer],subHeader:new s(this.getId()+"-toolbar",{active:false,content:[this._oButtonUp,this._oButtonDown,this._oSearchField]}),leftButton:new t(this.getId()+"-buttonOk",{text:this._oRb.getText("PERSODIALOG_OK"),press:function(){n._oDialog.close();n._oSearchField.setValue("");n._oSelectAllToolbar.setVisible(true);h.resize.detachHandler(n._fnHandleResize);n.fireConfirm()},type:S.Emphasized}),rightButton:new t(this.getId()+"-buttonCancel",{text:this._oRb.getText("PERSODIALOG_CANCEL"),press:function(){n._oDialog.close();n._oSearchField.setValue("");n._oSelectAllToolbar.setVisible(true);h.resize.detachHandler(n._fnHandleResize);n.fireCancel()}}),afterOpen:this._fnAfterDialogOpen}).addStyleClass("sapMPersoDialog")};I.prototype.retrievePersonalizations=function(){return this._oP13nModel.getData()};I.prototype.open=function(){var t=null;if(this.getHasGrouping()){t=[new c("group",false,true)]}this._readCurrentSettingsFromTable();this._oDialog.setModel(this._oP13nModel,"Personalization");this._oList.bindAggregation("items",{path:"Personalization>/aColumns",sorter:t,template:this._oColumnItemTemplate});if(!this._oList.getSelectedItem()){var e=this._oList.getItems();if(this.getHasGrouping()){e=e.filter(function(t){return t.getMetadata().getName()!="sap.m.GroupHeaderListItem"})}if(e.length>0){this._sLastSelectedItemId=e[0].getBindingContext("Personalization").getProperty("id")}}this._fnUpdateArrowButtons.call(this);this._oDialog.open();this._fnHandleResize.call(this);h.resize.attachHandler(this._fnHandleResize)};I.prototype.setContentHeight=function(t){this.setProperty("contentHeight",t,true);this._oDialog.setContentHeight(t);return this};I.prototype.setContentWidth=function(t){this.setProperty("contentWidth",t,true);this._oDialog.setContentWidth(t);return this};I.prototype.exit=function(){this._oRb=null;this._oP13nModel=null;if(this._oColumnItemTemplate){this._oColumnItemTemplate.destroy();this._oColumnItemTemplate=null}if(this._oSelectAllToolbar){this._oSelectAllToolbar.destroy();this._oSelectAllToolbar=null}if(this._oList){this._oList.destroy();this._oList=null}if(this._oSearchField){this._oSearchField.destroy();this._oSearchField=null}if(this._oScrollContainer){this._oScrollContainer.destroy();this._oScrollContainer=null}if(this._oDialog){this._oDialog.destroy();this._oDialog=null}if(this._oButtonDown){this._oButtonDown.destroy();this._oButtonDown=null}if(this._oButtonUp){this._oButtonUp.destroy();this._oButtonUp=null}};I.prototype._resetAll=function(){if(this.getInitialColumnState()){var t=m.extend(true,[],this.getInitialColumnState()),e=this;var o=this._oList.getSelectedItem();this._sLastSelectedItemId=o&&o.getBindingContext("Personalization")&&o.getBindingContext("Personalization").getProperty("id");if(this._mColumnCaptions){t.forEach(function(t){t.text=e._mColumnCaptions[t.id]})}this._oP13nModel.getData().aColumns=t;this._oP13nModel.getData().oHeader.visible=!this.getInitialColumnState().some(function(t){return!t.visible});this._oP13nModel.updateBindings();sap.ui.getCore().applyChanges()}};I.prototype._moveItem=function(t){var e=this._oList.getSelectedItem();if(!e){return}var o=this._oP13nModel.getData();var i=e.getBindingContext("Personalization").getPath().split("/").pop()*1;var s=i+t;if(s<0||s>=o.aColumns.length){return}var n=o.aColumns[s];o.aColumns[s]=o.aColumns[i];o.aColumns[s].order=s;o.aColumns[i]=n;o.aColumns[i].order=i;this._oList.removeSelections(true);this._oP13nModel.updateBindings();var l=this._oList.getItems()[s];this._oList.setSelectedItem(l,true);sap.ui.getCore().applyChanges();if(l.getDomRef()){var a=l.$().position().top,r=18,h=this._oScrollContainer.$().height(),c=this._oScrollContainer.$().offset().top-this._oList.$().offset().top,u=c+h;if(a<c){this._oScrollContainer.scrollTo(0,Math.max(0,c-h+r))}else if(a+r>u){this._oScrollContainer.scrollTo(0,a)}}this._fnUpdateArrowButtons.call(this,true)};I.prototype._readCurrentSettingsFromTable=function(){var t=sap.ui.getCore().byId(this.getPersoDialogFor()),e=this,o=this.getColumnInfoCallback().call(this,t,this.getPersoMap());this._oP13nModel.setData({aColumns:o,oHeader:{text:this._oRb.getText("PERSODIALOG_SELECT_ALL"),visible:!o.some(function(t){return!t.visible}),id:this._getSelectAllCheckboxId()}});this._mColumnCaptions={};o.forEach(function(t){e._mColumnCaptions[t.id]=t.text})};I.prototype._getSelectAllCheckboxId=function(){return this.getId()+"_SelectAll"};I.prototype._executeSearch=function(){var t=this._oSearchField.getValue(),e=new u("text",d.Contains,t),o=this._oList.getBinding("items");this._oSelectAllToolbar.setVisible(!t&&this.getShowSelectAll());o.filter([e]);this._fnUpdateArrowButtons.call(this);return this};I.prototype.setHasGrouping=function(t){this.setProperty("hasGrouping",t,true);var e=this._oDialog.getSubHeader();if(!t){if(e.getContent().length===1){e.insertContent(this._oButtonDown,0);e.insertContent(this._oButtonUp,0)}}else{e.removeContent(this._oButtonUp);e.removeContent(this._oButtonDown)}return this};I.prototype.setShowSelectAll=function(t){this.setProperty("showSelectAll",t,true);this._oSelectAllToolbar.setVisible(t);this._fnHandleResize.call(this);return this};I.prototype.setShowResetAll=function(t){this.setProperty("showResetAll",t,true);this._resetAllButton.setVisible(t);return this};return I});