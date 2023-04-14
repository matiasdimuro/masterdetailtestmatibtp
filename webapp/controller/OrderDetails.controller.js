sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"../model/formatter"

], function(Controller, Filter, FilterOperator, formatter) {
    'use strict';
    
    return Controller.extend("hexagon.masterdetailtestmatibtp.controller.OrderDetails", {

		formatter : formatter,

        onInit: function () {
            
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			// this.oRouter.getRoute("ordersList").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("orderDetails").attachPatternMatched(this._onProductMatched, this);
		},


        _onProductMatched: function (oEvent) {

			this._orderPath = oEvent.getParameter("arguments").orderPath || this._orderPath /*|| "results/0"*/;

			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(this._orderPath),
				model: "orders"
			});
            
			var oViewBindingContext = this.getView().getBindingContext("orders");

			var oTable = this.getView().byId('orderDetailsTable');
			var oTemplate = this.getView().byId('productTemplate');

			var aFilter = [];
			var oFilter = new Filter("OrderID", FilterOperator.EQ, oViewBindingContext.getProperty("OrderID"));
			aFilter.push(oFilter);

			oTable.bindAggregation("items", {
				path: "nwEntities>/Order_Details",
				template: oTemplate,
				templateShareable: true,
				filters: aFilter
			});
		},


		// ¿¿¿???
        // onExit: function () {
			// this.oRouter.getRoute("ordersList").detachPatternMatched(this._onProductMatched, this);
			// this.oRouter.getRoute("orderDetails").detachPatternMatched(this._onProductMatched, this);
		// },


		onCloseColumn : function () {

			this.getOwnerComponent().getModel().setProperty("/layout", "OneColumn");
			this.oRouter.navTo("ordersList", {}, true);
		},



		onSeeProduct : function(oEvent) {

			var oItem = oEvent.getSource();
			var oBindingContext = oItem.getBindingContext("nwEntities");

			var oViewBindingContext = this.getView().getBindingContext("orders");

			this.oRouter.navTo("product", {
				orderPath: window.encodeURIComponent(oViewBindingContext.getPath().substr(1)),
				productID: window.encodeURIComponent(oBindingContext.getProperty("ProductID"))
			});

			// EndColumnFullScreen
			this.getOwnerComponent().getModel().setProperty("/layout", "ThreeColumnsEndExpanded");
		}

    });
});