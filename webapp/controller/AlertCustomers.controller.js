sap.ui.define([
  "./BaseController",
  "sap/ui/core/Fragment",
  "sap/ui/model/json/JSONModel"
], function (BaseController, Fragment, JSONModel) {
	"use strict";

	return BaseController.extend("gruppo1.gruppo1.controller.AlertCustomers", {
    onInit: function() {
      let weatherModel = new JSONModel({
        city: "",
        country: "",
        description: "",
        temp_max: "",
        temp_min: "",
        temp_minState: false
      });
      this.getView().setModel(weatherModel, "weather");
    },
    _getDialog : function () {
      let oView = this.getView();
      if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
          name: "gruppo1.gruppo1.view.fragment.CustomersDialog",
          controller: this
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
    },
    _getQuickView: function() {
      let oView = this.getView();
      if (!this.quickView) {
				this.quickView = Fragment.load({
					id: oView.getId(),
          name: "gruppo1.gruppo1.view.fragment.QuickView",
          controller: this
				}).then(function (oQuickView) {
					oView.addDependent(oQuickView);
					return oQuickView;
				});
			}
    },
    showCustomersDialog: function() {
      this._getDialog();
      this.pDialog.then((oDialog) => {
        oDialog.open();
      });
    },
    getCustomerID: function( oControlEvent ) {
      let value = oControlEvent.getParameter("selectedItem").getProperty("title");
      this.byId("customerInput").setValue(value);
    },
    checkCustomerInput: function( oControlEvent ) {
      let customerID = oControlEvent.getParameter("value");
      let oModel = this.getOwnerComponent().getModel();
      let oData = oModel.oData;
      let validator = false;
      for( let obj in oData ){
        if( oData[obj].CustomerID == customerID ){
          validator = true;
          this.byId("meteoBtn").setEnabled(true);
        }
      }
      if( !validator ){
        this.byId("meteoBtn").setEnabled(false);
        sap.m.MessageBox.error("Nessun fornitore associato");
      }
    },
    showWeather: function( oControlEvent ) {
      let oModel = this.getOwnerComponent().getModel();
      let oButton = oControlEvent.getSource();
      let oData = oModel.oData;
      let customerID = this.byId("customerInput").getValue();
      let city = oData[`Customers('${customerID}')`].City;
      let token = config.API_TOKEN;

      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}`, 
        success: (sResult) => {
          this._getQuickView();
          this.quickView.then((oQuickView) => {
            let weatherModel = new JSONModel({
              city: sResult.name,
              country: sResult.country,
              description: sResult.weather[0].description,
              temp_max: sResult.main.temp_max,
              temp_min: parseFloat(sResult.main.temp_min - 273).toFixed(1),
              temp_minState: false
            });
            if( weatherModel.oData.temp_min <= 20 ){
              weatherModel.oData.temp_minState = true;
            }
            oQuickView.setModel(weatherModel, "weather");
            oQuickView.openBy(oButton);
          });
          console.log(sResult);
        }
      });
    }
  });

})