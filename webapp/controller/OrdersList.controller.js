sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/library"

], function(Controller, fioriLibrary) {
    'use strict';
    
    return Controller.extend("hexagon.masterdetailtestmatibtp.controller.OrdersList", {

        onInit : function() {

            var oDataModel = this.getOwnerComponent().getModel('nwEntities');
            var oJsonModel = this.getOwnerComponent().getModel('orders');

            var oView = this.getView();
            oView.setBusy(true);

            oDataModel.read('/Orders', {

                success: function(data) {
                    oJsonModel.setData(data);
                    oView.setBusy(false);
                },

                error: function(err) {
                    oView.setBusy(false);
                    console.log(err);
                }
            });

            this.oRouter = this.getOwnerComponent().getRouter();
        },



        onSeeDetails: function(oEvent) {

            // var oFCL = this.getView().getParent().getParent();
            // oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);  
            
            var orderPath = oEvent.getSource().getBindingContext("orders").getPath();

            // When we call the router's navTo method, the router itself will change the layout property of the FlexibleColumnLayout.
            this.oRouter.navTo("orderDetails", {
                layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, 
                orderPath: window.encodeURIComponent(orderPath.substr(1))
            });
            // debugger;
        }

    });
});