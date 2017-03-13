/*
 * Copyright (C) 2009-2016 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sap/cecenter/engagementcenter/customcontrols/HeaderAreaViewController"
], function(Controller, oHeaderAreaViewController) {
	"use strict";

	return oHeaderAreaViewController.extend("com.sap.engagementcontext.moduletemplate.controller.HeaderAreaView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.engagementcontext.moduletemplate.view.ActionAreaMenu
		 */
		onInit: function() {
			Object
				.getPrototypeOf(com.sap.engagementcontext.moduletemplate.controller.HeaderAreaView.prototype).initWorkareaView
				.call(this, {});

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
				.getPrototypeOf(com.sap.engagementcontext.moduletemplate.controller.HeaderAreaView.prototype).onExit
				.call(this);
		},

		/** called when AccountConfirmed event is triggered */
		onAccountConfirmed: function() {
			var account = this.getBCD().getConfirmedAccount();
			this.getView().byId("headerViewText").setText(account.lastName + ", " + account.firstName);
		},

		/** called when AccountUnconfirmed event is triggered */
		onAccountUnconfirmed: function() {
			this.getView().byId("headerViewText").setText(this.getText("HEADERAREA_VIEW_TEXT"));
		}

	});
});
