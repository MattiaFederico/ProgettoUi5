sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("gruppo1.gruppo1.controller.CustomersVerify", {
    clearForm: function() {
      let form = this.byId("userData");
      let formElements = form.getAggregation("formContainers")[0].getAggregation("formElements");
      formElements.forEach( obj => {
        obj.getAggregation("fields")[0].setValue("")
      })
    },
    //eseguire controlli sul form e creare select
  });

})