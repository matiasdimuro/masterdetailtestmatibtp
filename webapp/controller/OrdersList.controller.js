sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",

], function(Controller, Fragment) {
    'use strict';
    
    return Controller.extend("hexagon.masterdetailtestmatibtp.controller.OrdersList", {

        onInit : function() {

            this._onLoadDialog();

            var oDataModel = this.getOwnerComponent().getModel('nwEntities');
            var oJsonModel = this.getOwnerComponent().getModel('orders');

            // var oView = this.getView();
            // oView.setBusy(true);

            oDataModel.read('/Orders', {

                success: function(data) {
                    this._oDialog.close();
                    oJsonModel.setData(data);
                    // oView.setBusy(false);
                }.bind(this),

                error: function(err) {
                    // oView.setBusy(false);
                    console.log(err);
                }
            });

            this.oRouter = this.getOwnerComponent().getRouter();
        },



        onSeeDetails: function(oEvent) {

            // var oFCL = this.getView().getParent().getParent();
            // oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);  
            
            var orderPath = oEvent.getSource().getBindingContext("orders").getPath();

            this.oRouter.navTo("orderDetails", {
                orderPath: window.encodeURIComponent(orderPath.substr(1))
            });
           
            this.getOwnerComponent().getModel().setProperty("/layout", "TwoColumnsBeginExpanded");
        },


        _onLoadDialog : function () {
            
            if (!this._oDialog) { 

                Fragment.load({ 
                    name: "hexagon.masterdetailtestmatibtp.view.LoadingData", 
                    controller: this 
                })

                .then(function(oDialog) {
                    this._oDialog = oDialog; 
                    this.getView().addDependent(oDialog); 
                    this._oDialog.open(); 
                }.bind(this)); 
            
            } else { 
                this._oDialog.open(); 
            }
        }

    });
});