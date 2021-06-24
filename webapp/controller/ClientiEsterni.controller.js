sap.ui.define([
  './BaseController',
  "sap/m/library"
], function (BaseController, mobileLibrary) {
	"use strict";

  var URLHelper = mobileLibrary.URLHelper;
	return BaseController.extend("gruppo1.gruppo1.controller.ClientiEsterni", {
    handleEmailPress: function (oControlEvent) {
			URLHelper.triggerEmail(oControlEvent.getSource().getTitle(), "Info Request", false, false, false, true);
		}
  });

})