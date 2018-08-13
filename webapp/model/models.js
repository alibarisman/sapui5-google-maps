sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createAppModel: function() {
			var places = [{
		        name: "İstanbul",
		        lat: 41.0193271,
		        lng: 28.9956441,
		        start: '',
		        end: ''
	    	}];
			
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				places: places
			});

			return oModel;
		}
	};
});