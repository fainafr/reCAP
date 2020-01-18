/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/unified/Calendar","sap/ui/unified/CalendarRenderer","sap/ui/unified/calendar/Header","sap/ui/unified/DateRange","sap/ui/dom/containsOrEquals"],function(e,t,i,n,a,r){"use strict";var s=e.extend(i);s.apiVersion=2;var o=t.extend("sap.ui.unified.internal.CustomMonthPicker",{renderer:s});o.prototype._initializeHeader=function(){var e=new n(this.getId()+"--Head",{visibleButton1:false});e.attachEvent("pressPrevious",this._handlePrevious,this);e.attachEvent("pressNext",this._handleNext,this);e.attachEvent("pressButton2",this._handleButton2,this);this.setAggregation("header",e)};o.prototype._shouldFocusB2OnTabNext=function(e){return r(this.getDomRef("content"),e.target)};o.prototype.onBeforeRendering=function(){var e=this.getAggregation("header");t.prototype.onBeforeRendering.call(this,arguments);e.setVisibleButton1(false);e.setVisibleButton2(true)};o.prototype.onAfterRendering=function(){this._showMonthPicker()};o.prototype._selectYear=function(){var e=this._getFocusedDate();e.setYear(this.getAggregation("yearPicker").getYear());this._focusDate(e,true);this._showMonthPicker()};o.prototype._selectMonth=function(){var e=this.getAggregation("monthPicker");var t=this.getSelectedDates()[0];var i=this._getFocusedDate();i.setMonth(e.getMonth());if(!t){t=new a}t.setStartDate(i.toLocalJSDate());this.addSelectedDate(t);this.fireSelect()};o.prototype.onsapescape=function(e){this.fireCancel()};return o});