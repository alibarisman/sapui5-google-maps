sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History, formatter) {
	"use strict";
	
	return Controller.extend("MapApplication.controller.FindRoute", {
		
		formatter: formatter,
	
		onBack : function () {
			var sPreviousHash = History.getInstance().getPreviousHash();
 
			//The history contains a previous entry
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				// There is no history!
				// replace the current hash with page 1 (will not add an history entry)
				this.getOwnerComponent().getRouter().navTo("Startpage", null, true);
			}
		},
		
		onInit: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel("oPlace");
		    this.getView().setModel(oModel);
            var oContext = oModel.getContext('/places/0/');
            
            this.byId("map1").setBindingContext(oContext);
            
		    /*global openui5*/
		    var directions = new openui5.googlemaps.Directions({
		        startAddress: '{start}',
		        endAddress: '{end}',
		        travelMode: openui5.googlemaps.TravelMode.transit
		    });
		},
		
		select: function(oEvent) {
				
			var placeModel = this.getOwnerComponent().getModel("oPlace");
			var placeData = placeModel.getData();
			
			var start = this.byId("start").getValue();
			var end   = this.byId("end").getValue();
			
        	placeData.places[0].start = start;
			placeData.places[0].end = end;
			
			placeModel.setData(placeData);
			placeModel.refresh();
			
			placeModel.setData(placeData);
			placeModel.refresh();
			
			/*global openui5*/
		    var directions = new openui5.googlemaps.Directions({
		        startAddress: '{start}',
		        endAddress: '{end}',
		        travelMode: openui5.googlemaps.TravelMode.transit
		    });
		    
		    //directions.setTravelMode(this.getView().byId(oEvent.getParameter("item").id).getText().toUpperCase());
	        //directions.setTravelMode(this.getView().byId(oEvent.getParameters().id).getText().toUpperCase());
	        directions.setTravelMode(oEvent.getParameter("item").getText().toUpperCase());
	    }
		
		

	});

});