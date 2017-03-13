/*
 * Copyright (C) 2009-2016 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sap/cecenter/engagementcenter/customcontrols/ActionTileViewController"
], function(Controller, oActionTileViewController) {
	"use strict";

	return oActionTileViewController.extend("com.sap.engagementcontext.moduletemplate.controller.ActionAreaMenu", {

			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf com.sap.engagementcontext.moduletemplate.view.ActionAreaMenu
			 */
			onInit: function() {
				Object
					.getPrototypeOf(com.sap.engagementcontext.moduletemplate.controller.ActionAreaMenu.prototype).initActionTileView
					.call(this);
				// view initialization parameters & global object references are accessible with controller variable oViewData
			},

			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf com.sap.engagementcontext.moduletemplate.view.ActionAreaMenu
			 */
			//	onBeforeRendering: function() {
			//
			//	},

			/**
			 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			 * This hook is the same one that SAPUI5 controls get after being rendered.
			 * @memberOf com.sap.engagementcontext.moduletemplate.view.ActionAreaMenu
			 */
			//	onAfterRendering: function() {
			//
			//	},

			/**
			 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
			 * @memberOf com.sap.engagementcontext.moduletemplate.view.ActionAreaMenu
			 */
			onExit: function() {
				Object
					.getPrototypeOf(com.sap.engagementcontext.moduletemplate.controller.ActionAreaMenu.prototype).onExit
					.call(this);
			},

			onNavToWorkArea1: function(oEvent) {
				var sNewDocId = com.sap.cecenter.engagementcenter.bcd.BusinessDocumentManager
					.getInstance().generateId();
				var oBusinessDocumentManager = com.sap.cecenter.engagementcenter.bcd.BusinessDocumentManager
					.getInstance();
				// ! IMPORTANT ! Replace "<< YOUR BUSINESS DOCUMENT TYPE >>" with your business document type
				// defined in the Business context configuration
				var oBusinessDocumentNavigator = oBusinessDocumentManager
					.getBusinessDocumentNavigator(
						"<< YOUR BUSINESS DOCUMENT TYPE >>",
						sNewDocId,
						com.sap.cecenter.engagementcenter.bcd.SaveState.New, {
							id: sNewDocId
						},
						com.sap.cecenter.engagementcenter.bcd.BusinessDocumentAction.Create,
						this.oViewData.oBusinessContextData);
				this.oViewData.oBusinessContextData
					.openBusinessDocument(oBusinessDocumentNavigator);
			},

			onNavToWorkArea2: function(oEvent) {

				this.checkConfirmedAccount(function(){

					// ! IMPORTANT ! Replace "<< YOUR WORK AREA ID >>" with your work area view
					// defined in the Business context configuration
					this.oViewData.oBusinessContextData
						.openWorkareaView(
							"<< YOUR WORK AREA ID >>",
							com.sap.cecenter.engagementcenter.bcd.BusinessDocumentAction.Search);
				}, this);
			}
	});

});
