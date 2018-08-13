sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("MapApplication.controller.Startpage", {

		onToFindRoute : function () {
			this.getOwnerComponent().getRouter().navTo("FindRoute");
		},
		
		onToGetLocation : function () {
			this.getOwnerComponent().getRouter().navTo("GetLocation");
		}

	});

});