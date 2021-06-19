sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("gruppo1.gruppo1.controller.CustomersVerify", {
    onInit: function(){
       let data = {
        CustomerID: "",
        CompanyName: "",
        ContactName: "",
        ContactTitle: "",
        Address: "",
        City: "",
        Region: "",
        PostalCode: "",
        Country: ""
      };

      let dataModel = new JSONModel(data);
      this.setModel(dataModel, "formData");
    },
    clearForm: function() {
      let form = this.byId("userData");
      let formElements = form.getAggregation("formContainers")[0].getAggregation("formElements");
      formElements.forEach( obj => {
        obj.getAggregation("fields")[0].setValue("")
      })
    },
    formatCustomerID: function( oControlEvent ){
      let currentValue = oControlEvent.getParameter("value");
      let regex = "^[a-zA-Z]+$";
      if( currentValue.match(regex) ){
        if( currentValue.length >= 5 ) {
          sap.m.MessageToast.show("CustomerID deve contenere massimo 5 caratteri di lunghezza");
          this.byId("customerID").setValue(currentValue.substr(0,5).toUpperCase());
        }
      } else {
        this.byId("customerID").setValue( currentValue.substr(0, currentValue.length - 1) );
        sap.m.MessageToast.show("CustomerID può contenere solo lettere");
      }
    },
    formatName: function( oControlEvent ) {
      let string = oControlEvent.getParameter("value");
      let sourceName = oControlEvent.getSource().getParent().getAggregation("label").replace(/\s/g, "");
      let inputID = sourceName.charAt(0).toLowerCase()+ sourceName.slice(1);
      const toUppercase = string => string.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
      if( string != "" ){
        this.byId(inputID).setValue(toUppercase(string));
      }
    },
    cityCompiler: function( oControlEvent ) {
      let aFormData = this.getView().getModel("formData").getData();
      let selectedKey = oControlEvent.getParameter("selectedItem").getProperty("key");
      if( selectedKey === "Roma" ){
        aFormData["Region"] = "Lazio";
        aFormData["PostalCode"] = "00100";
        aFormData["Country"] = "Italia";
      } else if( selectedKey === "Milano" ) {
        aFormData["Region"] = "Lombardia";
        aFormData["PostalCode"] = "20019";
        aFormData["Country"] = "Italia";
      } else if( selectedKey === "Bologna"){
        aFormData["Region"] = "Emilia-Romagna";
        aFormData["PostalCode"] = "40121";
        aFormData["Country"] = "Italia";
      }
    },
    checkForm: function() {

    },
    submitForm: function() {
      let aFormData = this.getView().getModel("formData").getData();
      //check for null
      for( let key in aFormData ){
        if( aFormData[key] == ""){
          sap.m.MessageToast.show("Valorizzare tutti i campi");
        }
      }
    }
  });

}) 