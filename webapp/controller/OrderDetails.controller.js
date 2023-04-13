sap.ui.define([
    "sap/ui/core/mvc/Controller",

], function(Controller) {
    'use strict';
    
    return Controller.extend("hexagon.masterdetailtestmatibtp.controller.OrderDetails", {

        onInit: function () {
            
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("ordersList").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("orderDetails").attachPatternMatched(this._onProductMatched, this);
		},


        _onProductMatched: function (oEvent) {

			this._orderPath = oEvent.getParameter("arguments").orderPath || this._orderPath || "results/0";
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(this._orderPath),
				model: "orders"
			});
            // debugger;
		},


        onExit: function () {
			this.oRouter.getRoute("ordersList").detachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("orderDetails").detachPatternMatched(this._onProductMatched, this);
		}

    });
});