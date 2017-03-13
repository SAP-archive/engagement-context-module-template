/*
 * Copyright (C) 2009-2016 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"com/sap/cecenter/engagementcenter/customcontrols/WorkareaViewController"
], function(Controller, oWorkareaViewController) {
	"use strict";

	return oWorkareaViewController.extend("com.sap.engagementcontext.moduletemplate.controller.WorkAreaView2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.engagementcontext.moduletemplate.view.WorkAreaView2
		 */
		onInit: function() {
			Object
				.getPrototypeOf(com.sap.engagementcontext.moduletemplate.controller.WorkAreaView2.prototype).initWorkareaView
				.call(this, {
					"beforeCancelContext": false,
					"beforeCloseContext": false
				});

			// view initialization parameters & global object references are accessible with controller variable oViewData
			this
				.getBCD()
				.subscribe(
					com.sap.cecenter.engagementcenter.bcd.Events.AccountConfirmed,
					this.onAccountConfirmed, this);

			this
				.getBCD()
				.subscribe(
					com.sap.cecenter.engagementcenter.bcd.Events.AccountUnconfirmed,
					this.onAccountUnconfirmed, this);
			// ILLUSTRATION: generate random number to simulate opening a document
			this.sDocumentId = this.getRandomDocumentId();
			this.byId("linkDocumentId").setText(this.sDocumentId);
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.engagementcontext.moduletemplate.view.WorkAreaView2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.engagementcontext.moduletemplate.view.WorkAreaView2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.engagementcontext.moduletemplate.view.WorkAreaView2
		 */
		onExit: function() {
			this
				.getBCD()
				.unsubscribe(
					com.sap.cecenter.engagementcenter.bcd.Events.AccountConfirmed,
					this.onAccountConfirmed, this);
			this
				.getBCD()
				.unsubscribe(
					com.sap.cecenter.engagementcenter.bcd.Events.AccountUnconfirmed,
					this.onAccountUnconfirmed, this);

			Object
				.getPrototypeOf(com.sap.engagementcontext.moduletemplate.controller.WorkAreaView2.prototype).onExit
				.call(this);
		},

		/**
		 * return business document type
		 */
		getBusinessDocumentType: function() {
			return this.getView().getViewData().oData.businessDocumentType;
		},

		/**
		 * return business document id
		 */
		getBusinessDocumentId: function() {
			return this.getView().getViewData().oData.businessDocumentId;
		},

		/**
		 * Mandatory function for the Engagement Context 
		 * 
		 * If you specify the opened View then the Engagement
		 * Context need to know some ID of this view. E.g. if this
		 * is a creation view of a document with the ID xy, then the
		 * Object ID is xy. The title is the title of the opened
		 * view and the tooltip is used for some feedback messages
		 * that references on this view.
		 */

		getWorkareaViewTexts: function() {
			jQuery.sap
				.require("com.sap.cecenter.engagementcenter.util.Util");

			var sText = com.sap.cecenter.engagementcenter.util.UtilManager
				.getInstance().getText(
					"SEARCH_DOCUMENT_TEXT");
			return {
				"title": sText,
				"tooltip": sText
			};
		},
		onNavToDocument: function(oEvent) {

			var oBusinessDocumentManager = com.sap.cecenter.engagementcenter.bcd.BusinessDocumentManager
				.getInstance();
			// ! IMPORTANT ! Replace "<< YOUR BUSINESS DOCUMENT TYPE >>" with your business document type
			// defined in the Business context configuration
			var oBusinessDocumentNavigator = oBusinessDocumentManager
				.getBusinessDocumentNavigator(
					"<< YOUR BUSINESS DOCUMENT TYPE >>",
					this.sDocumentId,
					com.sap.cecenter.engagementcenter.bcd.SaveState.Edit, {
						id: this.sDocumentId
					},
					com.sap.cecenter.engagementcenter.bcd.BusinessDocumentAction.Display,
					this.oViewData.oBusinessContextData);
			this.oViewData.oBusinessContextData
				.openBusinessDocument(oBusinessDocumentNavigator);
		},

		// Helper method: Generate random number 
		getRandomDocumentId: function() {
			return Math.floor(Math.random() * (1999 - 1001 + 1)) + 1001;
		}
	});

});