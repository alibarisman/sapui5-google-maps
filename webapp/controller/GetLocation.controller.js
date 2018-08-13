sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";
	
	return Controller.extend("MapApplication.controller.GetLocation", {

		onInit: function(oEvent) {
			/*global openui5*/
            this.util = openui5.googlemaps.MapUtils;
            
            // Initial place marker
            var places = [{
                // name: "Kadıköy",
                // lat: 40.9945397,
                // lng: 29.0625118,
                // markerLat: 40.9945397,
                // markerLng: 29.0625118
            }];
            
            this.oModel = new sap.ui.model.json.JSONModel();
            this.oModel.setData({
                places: places
            });
            
            this.getView().setModel(this.oModel);
            this.oContext = this.oModel.getContext('/places/0/');
            this.byId("form1").setBindingContext(this.oContext);
        },
        
        onSuggest: function(oEvent) {
            var sValue = oEvent.getParameter("suggestValue");
                if (sValue.length > 3) {
                    this.util.search({
                    "address": sValue
                }).done(jQuery.proxy(this.searchResults, this));
            }
        },
        
        onChange: function(oEvent) {
            if (oEvent) {
                var val = oEvent.getParameters("newValue").newValue;
                var oCtxt = oEvent.getSource().getBindingContext();
                        
                this.locations.forEach(function(oLocation) {
                    if (oLocation.value === val) {
                        oCtxt.getModel().setProperty("lat", oLocation.lat, oCtxt);
                        oCtxt.getModel().setProperty("lng", oLocation.lng, oCtxt);
                        oCtxt.getModel().setProperty("markerLat", oLocation.lat, oCtxt);
                        oCtxt.getModel().setProperty("markerLng", oLocation.lng, oCtxt);
                        oCtxt.getModel().setProperty("name", oLocation.value, oCtxt);
                    }
                });
            }
        },
        
        searchResults: function(results, status) {
        	var that = this;
            this.locations = [];	
            
            this.locations = jQuery.map(results, function(item) {
                var location = {};
                location.value = item.formatted_address;
                location.lat = item.geometry.location.lat();
                location.lng = item.geometry.location.lng();
                return location;
            });
            
            var queryInput = this.byId("query");
            queryInput.removeAllSuggestionItems();
            this.locations.forEach(function(item) {
                queryInput.addSuggestionItem(new sap.ui.core.ListItem({
                    text: item.value
                }));
            });
        },
        /*
        Update model with location and return a lat/long object
        */
        getLocation: function(oPos) {
            this.oModel.setProperty("lat", oPos.lat, this.oContext);
            this.oModel.setProperty("lng", oPos.lng, this.oContext);
            this.oModel.setProperty("markerLat", oPos.lat, this.oContext);
            this.oModel.setProperty("markerLng", oPos.lng, this.oContext);
            this.oModel.setProperty("name", "My Location", this.oContext);
            return this.util.objToLatLng(oPos);
        },
        
        updateLocation: function(sLocation) {
            this.oModel.setProperty(this.oContext.getPath() + "name", sLocation);
            this.byId("query").setValue(sLocation);
        },
        
        /*
        When My Location button is pressed, get the current location
        from Google, then geocode it, then update the mmodel and
        address query input element.
        */
        onMyLocation: function(oEvent) {
            this.util.currentPosition()
                .then(this.getLocation.bind(this))
                .then(this.util.geocodePosition)
                .done(this.updateLocation.bind(this));
        },
        
        /*
        On marker drag end
        */
        onMarkerDragEnd: function(oEvent) {
            this.util.geocodePosition(oEvent.getParameters().position).done(this.updateLocation.bind(this));
        },
                
        /*
        Map click handler - call Geo stuff in HANA to get postal boundary polygon - TODO
        */
        onClick: function(oEvent) {
          	/*eslint no-alert: "error"*/
            customAlert("Clicked. Lat: " + oEvent.getParameters().lat + ", Lng: " + oEvent.getParameters().lng);
        },
        
        /*
        Get the pinkball icon for the marker 
        */
        getMarkerIcon: function() {
            return jQuery.sap.getModulePath("openui5.googlemaps.themes." + "base") + "/img/pin.png"
        },
        
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
		}
		
		

	});

});