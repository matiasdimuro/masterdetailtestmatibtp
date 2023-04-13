sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("hexagon.masterdetailtestmatibtp.controller.App", {

            onInit: function () {

                this.oOwnerComponent = this.getOwnerComponent();
                this.oRouter = this.oOwnerComponent.getRouter();
                this.oOwnerComponent.getModel().setProperty("/layout", "OneColumn");
                this.oRouter.attachRouteMatched(this.onRouteMatched, this);
            },


            onRouteMatched: function (oEvent) {

                var sRouteName = oEvent.getParameter("name");
                var oArguments = oEvent.getParameter("arguments");
    
                // Save the current route name
                this.currentRouteName = sRouteName;
                this.currentOrderPath = oArguments.orderPath;
            },



            onStateChanged: function (oEvent) {

                var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow");
                var sLayout = oEvent.getParameter("layout");
    
                // Replace the URL with the new layout if a navigation arrow was used
                debugger;
                if (bIsNavigationArrow) {
                    this.oRouter.navTo(this.currentRouteName, {
                        layout: sLayout, 
                        orderPath: this.currentOrderPath
                    }, true);
                }
                // debugger;
            },
    


            onExit: function () {
                this.oRouter.detachRouteMatched(this.onRouteMatched, this);
            }

        });
    });
