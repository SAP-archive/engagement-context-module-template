jQuery.sap
		.declare("com.sap.engagementcontext.moduletemplate.helper.bcdhelper");
jQuery.sap.require("com.sap.cecenter.engagementcenter.bcd.SaveState");
jQuery.sap.require("com.sap.cecenter.engagementcenter.bcd.BcdItem");

com.sap.engagementcontext.moduletemplate.helper.bcdhelper = function(oArgData) {

	// ! IMPORTANT ! Replace "<< CUSTOM BUSINESS DOCUMENT TYPE KEY >>"
	// with your business document type key defined in the Business context
	// configuration

	com.sap.cecenter.engagementcenter.bcd.BcdItem.call(this, oArgData,
			"<< CUSTOM BUSINESS DOCUMENT TYPE KEY >>");


	/**
	 * Add a business document to the internal data storage. You can retrieve
	 * this JSON string by method
	 * com.sap.cecenter.engagementcenter.bcd.BusinessDocument.getBusinessDocumentJson().
	 *
	 * This method is usually called by BCD handler method
	 * openBusinessDocument(), the event OPEN_BUSINESS_DOCUMENT will be raised.
	 *
	 * Override this method as required
	 */
	// this.addBusinessDocument = function(oBusinessDocumentJson) {
	// 	// replace existing one and return false in order to prevent event
	// 	// publishing...
	// 	for (var i = 0; i < this.oData.businessDocuments.length; i++) {
	// 		if (String(oBusinessDocumentJson.businessDocumentId) === String(this.oData.businessDocuments[i].businessDocumentId)) {
	// 			this.oData.businessDocuments[i] = oBusinessDocumentJson;
	// 			return this.oData.businessDocuments[i];
	// 		}
	// 	}

	// 	// ... or add a new one
	// 	this.oData.businessDocuments[this.oData.businessDocuments.length] = oBusinessDocumentJson;
	// 	return this.oData.businessDocuments[this.oData.businessDocuments.length - 1];
	// };

	/**
	 * Remove a business document from the internal data storage in case it is
	 * no longer needed and shall not be part of the current interaction.
	 *
	 * Override this method as required
	 */
	// this.closeBusinessDocument = function(oBusinessDocumentJson) {
	// 	return this
	// 			.removeBusinessDocumentById(oBusinessDocumentJson.businessDocumentId);
	// };

	/**
	 * Remove a business document from the internal storage based on its ID.
	 *
	 * Override this method as required
	 */
	// this.removeBusinessDocumentById = function(sBusinessDocumentId) {
	// 	for (var i = 0; i < this.oData.businessDocuments.length; i++) {
	// 		if (String(sBusinessDocumentId) === String(this.oData.businessDocuments[i].businessDocumentId)) {
	// 			var oRemovedBusinessDocument = this.oData.businessDocuments[i];
	// 			this.oData.businessDocuments.splice(i, 1);
	// 			return oRemovedBusinessDocument;
	// 		}
	// 	}
	// 	return false;
	// };

	/**
	 * Clear all business documents from the data container
	 *
	 * Override this method as required
	 */
	// this.clearAllBusinessDocuments = function() {
	// 	this.oData.businessDocuments = [];
	// };

	/**
	 * Prepare related objects link for Interaction Log
	 *
	 * objectType : Business Object Type
	 * objectId :  Identifier of the object (for e.g., GUID, etc.)
	 * objectName : Number of the object (for e.g.,  object number)
	 * notRemovable: object shall not be removed from interaction log
	 *
	 * Override this method as required
	 */

	// this.constructRelatedObject : function(oArgBusinessDocumentJSON,
	// 		bArgNotRemovable) {
	// 	return {
	// 		"objectType" : oArgBusinessDocumentJSON.businessDocumentType,
	// 		"objectId" : oArgBusinessDocumentJSON.businessDocumentId,
	// 		"objectName" : oArgBusinessDocumentJSON.businessDocumentId,
	// 		"notRemovable" : bArgNotRemovable
	// 	};
	// };

};
