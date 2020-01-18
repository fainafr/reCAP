/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Button","./Dialog","./List","./SearchField","./library","./TitleAlignmentMixin","sap/ui/core/Control","sap/ui/Device","sap/ui/base/ManagedObject","sap/m/Toolbar","sap/m/Label","sap/m/BusyIndicator","sap/m/Bar","sap/m/Title","sap/ui/core/theming/Parameters","./SelectDialogRenderer","sap/base/Log"],function(t,e,i,s,o,n,a,l,r,h,u,d,g,p,c,_,f){"use strict";var y=o.ListMode;var S=o.ButtonType;var C=o.TitleAlignment;var m=a.extend("sap.m.SelectDialog",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Appearance",defaultValue:null},noDataText:{type:"string",group:"Appearance",defaultValue:null},multiSelect:{type:"boolean",group:"Dimension",defaultValue:false},growingThreshold:{type:"int",group:"Misc",defaultValue:null},growing:{type:"boolean",group:"Behavior",defaultValue:true},contentWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},rememberSelections:{type:"boolean",group:"Behavior",defaultValue:false},contentHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},showClearButton:{type:"boolean",group:"Behavior",defaultValue:false},confirmButtonText:{type:"string",group:"Appearance"},draggable:{type:"boolean",group:"Behavior",defaultValue:false},resizable:{type:"boolean",group:"Behavior",defaultValue:false},titleAlignment:{type:"sap.m.TitleAlignment",group:"Misc",defaultValue:C.Auto}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.ListItemBase",multiple:true,singularName:"item",forwarding:{idSuffix:"-list",aggregation:"items",forwardBinding:true}},_dialog:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{confirm:{parameters:{selectedItem:{type:"sap.m.StandardListItem"},selectedItems:{type:"sap.m.StandardListItem[]"},selectedContexts:{type:"object[]"}}},search:{parameters:{value:{type:"string"},itemsBinding:{type:"any"},clearButtonPressed:{type:"boolean"}}},liveChange:{parameters:{value:{type:"string"},itemsBinding:{type:"any"}}},cancel:{}}}});m.prototype.init=function(){var t=this,n=0,a=null;this._bAppendedToUIArea=false;this._bInitBusy=false;this._bFirstRender=true;this._bAfterCloseAttached=false;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oList=new i(this.getId()+"-list",{growing:t.getGrowing(),growingScrollToLoad:t.getGrowing(),mode:y.SingleSelectMaster,sticky:[o.Sticky.InfoToolbar],infoToolbar:new h({visible:false,active:false,content:[new u({text:this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS",[0])})]}),selectionChange:this._selectionChange.bind(this)});this._oList.getInfoToolbar().addEventDelegate({onAfterRendering:function(){t._oList.getInfoToolbar().$().attr("aria-live","polite")}});this._list=this._oList;this._oList.attachUpdateStarted(this._updateStarted,this);this._oList.attachUpdateFinished(this._updateFinished,this);this._oBusyIndicator=new d(this.getId()+"-busyIndicator").addStyleClass("sapMSelectDialogBusyIndicator",true);this._oSearchField=new s(this.getId()+"-searchField",{width:"100%",liveChange:function(e){var i=e.getSource().getValue(),s=i?300:0;clearTimeout(n);if(s){n=setTimeout(function(){t._executeSearch(i,false,"liveChange")},s)}else{t._executeSearch(i,false,"liveChange")}},search:function(e){var i=e.getSource().getValue(),s=e.getParameters().clearButtonPressed;t._executeSearch(i,s,"search")}});this._searchField=this._oSearchField;this._oSubHeader=new g(this.getId()+"-subHeader",{contentMiddle:[this._oSearchField]});var r=new g(this.getId()+"-dialog-header",{contentMiddle:[new p(this.getId()+"-dialog-title",{level:"H2"})]});this._setupBarTitleAlignment(r,this.getId()+"_customHeader");this._oDialog=new e(this.getId()+"-dialog",{customHeader:r,stretch:l.system.phone,contentHeight:"2000px",subHeader:this._oSubHeader,content:[this._oBusyIndicator,this._oList],leftButton:this._getCancelButton(),initialFocus:l.system.desktop?this._oSearchField:null,draggable:this.getDraggable()&&l.system.desktop,resizable:this.getResizable()&&l.system.desktop}).addStyleClass("sapMSelectDialog",true);this._dialog=this._oDialog;this.setAggregation("_dialog",this._oDialog);a=this._oDialog.onsapescape;this._oDialog.onsapescape=function(e){if(a){a.call(t._oDialog,e)}t._onCancel()};this._oDialog._iVMargin=8*(parseInt(c.get("sapUiFontSize"))||16);this._sSearchFieldValue="";this._bFirstRequest=true;this._bLiveChange=false;this._iListUpdateRequested=0};m.prototype.setGrowing=function(t){this._oList.setGrowing(t);this._oList.setGrowingScrollToLoad(t);this.setProperty("growing",t,true);return this};m.prototype.setDraggable=function(t){this._setInteractionProperty(t,"draggable",this._oDialog.setDraggable);return this};m.prototype.setResizable=function(t){this._setInteractionProperty(t,"resizable",this._oDialog.setResizable);return this};m.prototype._setInteractionProperty=function(t,e,i){this.setProperty(e,t,true);if(!l.system.desktop&&t){f.warning(e+" property works only on desktop devices!");return}if(l.system.desktop&&this._oDialog){i.call(this._oDialog,t)}};m.prototype.setBusy=function(){this._oDialog.setBusy.apply(this._oDialog,arguments);return this};m.prototype.getBusy=function(){return this._oDialog.getBusy.apply(this._oDialog,arguments)};m.prototype.setBusyIndicatorDelay=function(t){this._oList.setBusyIndicatorDelay(t);this._oDialog.setBusyIndicatorDelay(t);this.setProperty("busyIndicatorDelay",t,true);return this};m.prototype.exit=function(){this._oList=null;this._oSearchField=null;this._oSubHeader=null;this._oClearButton=null;this._oBusyIndicator=null;this._sSearchFieldValue=null;this._iListUpdateRequested=0;this._bFirstRequest=false;this._bInitBusy=false;this._bFirstRender=false;this._bFirstRequest=false;if(this._bAppendedToUIArea){var t=sap.ui.getCore().getStaticAreaRef();t=sap.ui.getCore().getUIArea(t);t.removeContent(this,true)}if(this._oDialog){this._oDialog.destroy();this._oDialog=null}if(this._oOkButton){this._oOkButton.destroy();this._oOkButton=null}this._oSelectedItem=null;this._aSelectedItems=null;this._list=null;this._searchField=null;this._dialog=null};m.prototype.onAfterRendering=function(){if(this._bInitBusy&&this._bFirstRender){this._setBusy(true);this._bInitBusy=false}return this};m.prototype.invalidate=function(){if(this._oDialog&&(!arguments[0]||arguments[0]&&arguments[0].getId()!==this.getId()+"-dialog")){this._oDialog.invalidate(arguments)}else{a.prototype.invalidate.apply(this,arguments)}return this};m.prototype.open=function(t){if((!this.getParent()||!this.getUIArea())&&!this._bAppendedToUIArea){var e=sap.ui.getCore().getStaticAreaRef();e=sap.ui.getCore().getUIArea(e);e.addContent(this,true);this._bAppendedToUIArea=true}this._bFirstRequest=true;this._oSearchField.setValue(t);this._oDialog.open();if(this._bInitBusy){this._setBusy(true)}this._updateSelectionIndicator();this._aInitiallySelectedContextPaths=this._oList.getSelectedContextPaths();return this};m.prototype.setGrowingThreshold=function(t){this._oList.setGrowingThreshold(t);this.setProperty("growingThreshold",t,true);return this};m.prototype.setMultiSelect=function(t){this.setProperty("multiSelect",t,true);if(t){this._oList.setMode(y.MultiSelect);this._oList.setIncludeItemInSelection(true);this._oDialog.setEndButton(this._getCancelButton());this._oDialog.setBeginButton(this._getOkButton())}else{this._oList.setMode(y.SingleSelectMaster);this._oDialog.setEndButton(this._getCancelButton());this._oDialog.destroyBeginButton();delete this._oOkButton}return this};m.prototype.setTitle=function(t){this.setProperty("title",t,true);this._oDialog.getCustomHeader().getAggregation("contentMiddle")[0].setText(t);return this};m.prototype.setConfirmButtonText=function(t){this.setProperty("confirmButtonText",t,true);this._oOkButton&&this._oOkButton.setText(t||this._oRb.getText("SELECT_CONFIRM_BUTTON"));return this};m.prototype.setNoDataText=function(t){this._oList.setNoDataText(t);return this};m.prototype.getNoDataText=function(){return this._oList.getNoDataText()};m.prototype.getContentWidth=function(){return this._oDialog.getContentWidth()};m.prototype.setContentWidth=function(t){this._oDialog.setContentWidth(t);return this};m.prototype.getContentHeight=function(){return this._oDialog.getContentHeight()};m.prototype.setShowClearButton=function(t){this.setProperty("showClearButton",t,true);if(t){var e=this._oDialog.getCustomHeader();e.addContentRight(this._getClearButton())}if(this._oClearButton){this._oClearButton.setVisible(t)}return this};m.prototype.setContentHeight=function(t){this._oDialog.setContentHeight(t);return this};m.prototype.addStyleClass=function(){this._oDialog.addStyleClass.apply(this._oDialog,arguments);return this};m.prototype.removeStyleClass=function(){this._oDialog.removeStyleClass.apply(this._oDialog,arguments);return this};m.prototype.toggleStyleClass=function(){this._oDialog.toggleStyleClass.apply(this._oDialog,arguments);return this};m.prototype.hasStyleClass=function(){return this._oDialog.hasStyleClass.apply(this._oDialog,arguments)};m.prototype.getDomRef=function(){if(this._oDialog){return this._oDialog.getDomRef.apply(this._oDialog,arguments)}else{return null}};m.prototype.clearSelection=function(){this._removeSelection();this._updateSelectionIndicator();this._oDialog.focus();return this};m.prototype._setModel=m.prototype.setModel;m.prototype.setModel=function(t,e){var i=Array.prototype.slice.call(arguments);this._setBusy(false);this._bInitBusy=false;this._iListUpdateRequested+=1;this._oList.setModel(t,e);m.prototype._setModel.apply(this,i);this._updateSelectionIndicator();return this};m.prototype._setBindingContext=m.prototype.setBindingContext;m.prototype.setBindingContext=function(t,e){var i=Array.prototype.slice.call(arguments);this._oList.setBindingContext(t,e);m.prototype._setBindingContext.apply(this,i);return this};m.prototype._executeSearch=function(t,e,i){var s=this._oList,o=s?s.getBinding("items"):undefined,n=this._sSearchFieldValue!==t;if(i==="liveChange"){this._bLiveChange=true}if(this._oDialog.isOpen()&&(n&&i==="liveChange"||i==="search")){this._sSearchFieldValue=t;if(o){this._iListUpdateRequested+=1;if(i==="search"){this.fireSearch({value:t,itemsBinding:o,clearButtonPressed:e})}else if(i==="liveChange"){this.fireLiveChange({value:t,itemsBinding:o})}}else{if(i==="search"){this.fireSearch({value:t,clearButtonPressed:e})}else if(i==="liveChange"){this.fireLiveChange({value:t})}}}return this};m.prototype._setBusy=function(t){if(this._iListUpdateRequested){if(t){this._oList.addStyleClass("sapMSelectDialogListHide");this._oBusyIndicator.$().css("display","inline-block")}else{this._oList.removeStyleClass("sapMSelectDialogListHide");this._oBusyIndicator.$().css("display","none")}}};m.prototype._updateStarted=function(t){if(this.getModel()&&this.getModel()instanceof sap.ui.model.odata.ODataModel){if(this._oDialog.isOpen()&&this._iListUpdateRequested){this._setBusy(true)}else{this._bInitBusy=true}}};m.prototype._updateFinished=function(t){this._updateSelectionIndicator();if(this.getModel()&&this.getModel()instanceof sap.ui.model.odata.ODataModel){this._setBusy(false);this._bInitBusy=false}if(l.system.desktop){if(this._oList.getItems()[0]){this._oDialog.setInitialFocus(this._oList.getItems()[0])}else{this._oDialog.setInitialFocus(this._oSearchField)}if(this._bFirstRequest&&!this._bLiveChange){var e=this._oList.getItems()[0];if(!e){e=this._oSearchField}if(e.getFocusDomRef()){e.getFocusDomRef().focus()}}}this._bFirstRequest=false;this._iListUpdateRequested=0;this._oList.getItems().forEach(function(t){t.addEventDelegate(this._getListItemsEventDelegates())},this)};m.prototype._getOkButton=function(){var e=this,i=null;i=function(){e._oSelectedItem=e._oList.getSelectedItem();e._aSelectedItems=e._oList.getSelectedItems();e._oDialog.detachAfterClose(i);e._fireConfirmAndUpdateSelection()};if(!this._oOkButton){this._oOkButton=new t(this.getId()+"-ok",{type:S.Emphasized,text:this.getConfirmButtonText()||this._oRb.getText("SELECT_CONFIRM_BUTTON"),press:function(){e._oDialog.attachAfterClose(i);e._oDialog.close()}})}return this._oOkButton};m.prototype._getCancelButton=function(){var e=this;if(!this._oCancelButton){this._oCancelButton=new t(this.getId()+"-cancel",{text:this._oRb.getText("MSGBOX_CANCEL"),press:function(t){e._onCancel()}})}return this._oCancelButton};m.prototype._getClearButton=function(){if(!this._oClearButton){this._oClearButton=new t(this.getId()+"-clear",{text:this._oRb.getText("SELECTDIALOG_CLEARBUTTON"),press:this.clearSelection.bind(this)})}return this._oClearButton};m.prototype._onCancel=function(t){var e=this,i=null;i=function(){e._oSelectedItem=null;e._aSelectedItems=[];e._sSearchFieldValue=null;e._oDialog.detachAfterClose(i);e._resetSelection();e.fireCancel()};this._oDialog.attachAfterClose(i);this._oDialog.close()};m.prototype._updateSelectionIndicator=function(){var t=this._oList.getSelectedContextPaths(true).length,e=this._oList.getInfoToolbar();if(this.getShowClearButton()&&this._oClearButton){this._oClearButton.setEnabled(t>0)}e.setVisible(!!t&&this.getMultiSelect());e.getContent()[0].setText(this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS",[t]))};m.prototype._fireConfirmAndUpdateSelection=function(){var t={selectedItem:this._oSelectedItem,selectedItems:this._aSelectedItems};Object.defineProperty(t,"selectedContexts",{get:this._oList.getSelectedContexts.bind(this._oList,true)});this.fireConfirm(t);this._updateSelection()};m.prototype._selectionChange=function(){if(!this._oDialog){return}if(this.getMultiSelect()){this._updateSelectionIndicator();return}if(!this._bAfterCloseAttached){this._oDialog.attachEventOnce("afterClose",this._resetAfterClose,this);this._bAfterCloseAttached=true}this._oDialog.close()};m.prototype._resetAfterClose=function(){this._oSelectedItem=this._oList.getSelectedItem();this._aSelectedItems=this._oList.getSelectedItems();this._bAfterCloseAttached=false;this._fireConfirmAndUpdateSelection()};m.prototype._updateSelection=function(){if(!this.getRememberSelections()&&!this.bIsDestroyed){this._removeSelection()}};m.prototype._removeSelection=function(){this._oList.removeSelections(true);delete this._oSelectedItem;delete this._aSelectedItems};m.prototype._resetSelection=function(){if(!this.bIsDestroyed){this._oList.removeSelections(true);this._oList.setSelectedContextPaths(this._aInitiallySelectedContextPaths);this._oList.getItems().forEach(function(t){var e=t.getBindingContextPath();if(e&&this._aInitiallySelectedContextPaths.indexOf(e)>-1){t.setSelected(true)}},this)}};m.prototype._getListItemsEventDelegates=function(){var t=function(t){if(t&&t.isDefaultPrevented&&t.isMarked&&(t.isDefaultPrevented()||t.isMarked("preventSelectionChange"))){return}this._selectionChange(t)}.bind(this);return{ontap:t,onsapselect:t}};n.mixInto(m.prototype);return m});