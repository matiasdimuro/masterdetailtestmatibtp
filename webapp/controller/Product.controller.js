sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "../model/formatter"

], function(Controller, Filter, FilterOperator, Fragment, formatter) {
    'use strict';
    
    return Controller.extend("hexagon.masterdetailtestmatibtp.controller.Product", {

        formatter : formatter,

        onInit : function() {

            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("product").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched : function(oEvent) {

            this.sOrderPath = oEvent.getParameter("arguments").orderPath;

            var nProductID = oEvent.getParameter("arguments").productID;
            var oDynamicPage = this.getView().byId('productDataPage');

            oDynamicPage.bindElement({
                path: "/Products(" + window.decodeURIComponent(nProductID) + ")",
                model: "nwEntities"
            });

            var oTable = this.getView().byId('idProductsTable');
            var oTemplate = this.getView().byId('orderDetailsTemplate');

            var aFilter = [];
            aFilter.push(new Filter("ProductID", FilterOperator.EQ, nProductID));

            oTable.bindAggregation("items", {
                path: "nwEntities>Order_Details",
                template: oTemplate,
                templateShareable: true,
                filters: aFilter
            })
        },



        onCloseColumn : function () {
          
            this.getOwnerComponent().getModel().setProperty("/layout", "TwoColumnsMidExpanded");

            var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("orderDetails", {
                orderPath: this.sOrderPath
            });
        },



        onFilterByNoDiscount: function() {

            var oTable = this.getView().byId("idProductsTable");
            var oBinding = oTable.getBinding("items");
            
            var aFilter = [];
            aFilter.push(new Filter("Discount", FilterOperator.EQ, 0));

            oBinding.filter(aFilter);

            var enabled = true;
            this.getView().byId("btnFilter").setEnabled(!enabled);
            this.getView().byId("btnShowAll").setEnabled(enabled);
        },

        onShowAll : function() {

            var oTable = this.getView().byId("idProductsTable");
            var oBinding = oTable.getBinding("items");
            
            var aFilter = [];

            oBinding.filter(aFilter);

            var enabled = true;
            this.getView().byId("btnFilter").setEnabled(enabled);
            this.getView().byId("btnShowAll").setEnabled(!enabled);
        },



        onSeeStockData : function(oEvent) {

            var oView = this.getView();
			var oSourceControl = oEvent.getSource();

			if (!this._pPopover) {
				this._pPopover = Fragment.load({
                    id: "productDataPage", // ID DEL "CONTENEDOR" DEL POPOVER
					name: "hexagon.masterdetailtestmatibtp.view.ProductStockData"
				}).then(function (oPopover) {
					oView.byId('productDataPage').addDependent(oPopover);
                    // BINDEO
					return oPopover;
				});
			}

            this._pPopover.then(function (oPopover) {
				oPopover.openBy(oSourceControl);
			});
        }

    });
});