sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sap/cecenter/engagementcenter/customcontrols/WorkareaViewController"
], function(Controller, oWorkareaViewController) {
	"use strict";

	return oWorkareaViewController.extend("com.sap.engagementcontext.moduletemplate.controller.WorkAreaView1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.engagementcontext.moduletemplate.view.WorkAreaView1
		 */
		onInit: function() {
			Object
				.getPrototypeOf(com.sap.engagementcontext.moduletemplate.controller.WorkAreaView1.prototype).initWorkareaView
				.call(this, {
					"beforeCancelContext": true,
					"beforeCloseContext": true
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

			this.initialLoad = true;
			// Add messages to kibana logging
			jQuery.sap
				.require("com.sap.cecenter.utilities.UILoggingAPI");
			this.oUILoggerAPI = com.sap.cecenter.utilities.UILoggingManager
				.getInstance();

			this.byId("textDocumentId").setText(this.getView().getViewData().oData.businessDocumentId);

			// Clear all messages
			this.clearAllMessages();
			this.updateMessageArea();

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.engagementcontext.moduletemplate.view.WorkAreaView1
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.engagementcontext.moduletemplate.view.WorkAreaView1
		 */
		onAfterRendering: function() {
			if (this.initialLoad) {
				this.initialLoad = false;
				if (this.oViewData.oData.saveState === com.sap.cecenter.engagementcenter.bcd.SaveState.Edit)
					this
					.showSuccessMessage({
						"messageShort": this
							.getText("MESSAGE_DOCUMENT_OPENED", [this.getView().getViewData().oData.businessDocumentId])
					});
			}
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.engagementcontext.moduletemplate.view.WorkAreaView1
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
				.getPrototypeOf(com.sap.engagementcontext.moduletemplate.controller.WorkAreaView1.prototype).onExit
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
			// In edit mode - document id (e.g., 800934) (or) In
			// Create mode - static text (e.g., New Ticket)
			var sDocumentId = this.getView().getViewData().oData.businessDocumentId;
			if (this.oViewData.oData.saveState === com.sap.cecenter.engagementcenter.bcd.SaveState.New) {
				jQuery.sap
					.require("com.sap.cecenter.engagementcenter.util.Util");
				sDocumentId = com.sap.cecenter.engagementcenter.util.UtilManager
					.getInstance().getText(
						"NEW_DOCUMENT_TEXT");
			}
			return {
				"title": sDocumentId,
				"tooltip": sDocumentId
			};
		},

		/**
		 * Event handler that is called during the BCD
		 * BeforeCancelContext event. Override this method if you
		 * want to include your own logic.
		 */
		eventHandlerBcdBeforeCancel: function() {
			if (this.isSaveNeeded()) {
				// call raiseCancelVeto to stop the cancel process
				this.getBCD().raiseCancelVeto();
			}
		},

		/**
		 * Event handler that is called during the BCD
		 * BeforeCloseContext event. Override this method if you
		 * want to include your own logic. Does not need any return
		 * value. If errors occur that shall prevent from closing
		 * the context, raise an error message to the global message
		 * log (raise a veto).
		 */
		eventHandlerBcdBeforeClose: function() {
			if (this.isSaveNeeded()) {
				// call raiseCancelVeto to stop the close process for e.g., to get user attention
				// for validation errors, etc.
				// this.getBCD().raiseCancelVeto();
				this.SaveDocument();
			}
		},

		saveDocument: function() {
			// Save document
			var sURL = "Your API End Point";
			jQuery
				.ajax({
					type: "POST",
					url: sURL,
					contentType: "application/json",
					data: "DOCUMENT TO SAVE",
					headers: {
						"Authorization": "Bearer " + com.sap.cecenter.engagementcenter.util.UtilManager
							.getInstance().getAccessToken(),
						"hybris-client": "YOUR CLIENT",
						"hybris-tenant": com.sap.cecenter.engagementcenter.restservicehelpers.UserInfoAPIManager
							.getInstance().getUserTenant()
					},
					context: this,
					async: true,
					success: this.saveSuccess,
					error: this.saveError
				});
		},

		saveSuccess: function(data, textStatus, jqXHR) {
			/*
			 *  When creating new document:
			 * After successful save, ensure returned document id is updated within BCD
			 * ! IMPORTANT !
			 * Replace "<< YOUR BUSINESS DOCUMENT TYPE >>" with your business document type
			 * defined in the Business context configuration
			 * Replace "<< NEWLY SAVED BUSINESS DOCUMENT ID >>" with your newly created document id
			 * Replace "<< DOCUMENT IN JSON FORMAT >>" with your newly created document
			 */
			this
				.getBCD()
				.saveBusinessDocument(
					com.sap.cecenter.engagementcenter.bcd.BusinessDocumentManager
					.getInstance()
					.getBusinessDocumentJson(
						"<< YOUR BUSINESS DOCUMENT TYPE >>",
						"<< NEWLY SAVED BUSINESS DOCUMENT ID >>",
						com.sap.cecenter.engagementcenter.bcd.SaveState.Saved,
						"<< DOCUMENT IN JSON FORMAT >>"),
					this.oViewData.oData.businessDocumentId);
			this.oViewData.oData.businessDocumentId = "<< NEWLY SAVED BUSINESS DOCUMENT ID >>";

			this.logMessage("MESSAGE_DOCUMENT_SAVE_SUCCESS", "MESSAGE_DOCUMENT_SAVE_SUCCESS_LONG", null, "saveSuccess", null);
		},

		saveError: function(jqXHR, textStatus, errorThrown) {
			this.logMessage("MESSAGE_DOCUMENT_SAVE_FAIL", "MESSAGE_DOCUMENT_SAVE_FAIL_LONG", textStatus, "saveError", null);

		},

		/**
		 * Overwrite this method to implement
		 * your own logic whether your document
		 * contains unsaved changes.
		 *
		 * <pre>
		 *       true: there are unsaved changes, ask for confirmation
		 *       false: no unsaved changes, view can be closed immediately
		 * </pre>
		 *
		 * Overwrite this method and implement
		 * your specific logic.
		 */
		isSaveNeeded: function() {
			return true;
		},

		/**
		 * Log messages
		 *
		 * @param sI18nText - Message text
		 * @param sI18nTextLong -Message long text
		 * @param aI18NParameters -Message Parameters. Embedded within message text
		 * @param sMethod - Method name. For Logging
		 *          		service
		 * @param sControlId - UI Control ID
		 */

		logMessage: function(sI18nText,
			sI18nTextLong, aI18NParameters,
			sMethod, sControlId) {

			var sErrorMessage = this.getText(
				sI18nText, aI18NParameters);
			var sErrorMessageLong = (sI18nTextLong) ? this.getText(
				sI18nTextLong,
				aI18NParameters) : "";

			this.oUILoggerAPI.error({
				message: sErrorMessage,
				object: "com.sap.engagementcontext.moduletemplate.controller.WorkAreaView1",
				method: sMethod
			});

			this
				.raiseErrorMessage({
					"controlId": sControlId,
					"messageShort": sErrorMessage,
					"messageLong": sErrorMessageLong,
					"isGlobalMessage": false
				});

			this.updateMessageArea();
		},
	});

});