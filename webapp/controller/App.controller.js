sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("hexagon.masterdetailtestmatibtp.controller.App", {

            onInit: function () {

                this.oOwnerComponent = this.getOwnerComponent();
                this.oOwnerComponent.getModel().setProperty("/layout", "OneColumn");
                
                this.oRouter = this.oOwnerComponent.getRouter();
                // this.oRouter.attachRouteMatched(this.onRouteMatched, this);
            },


            // ¿¿¿???
            // onRouteMatched: function (oEvent) {

            //     var sRouteName = oEvent.getParameter("name");
            //     var oArguments = oEvent.getParameter("arguments");
    
            //     // Save the current route name => Why?
            //     this.currentRouteName = sRouteName;
            //     this.currentOrderPath = oArguments.orderPath;

            //     // console.table([this.currentRouteName, this.currentOrderPath]);
            // },


            // ¿¿¿???
            // onStateChanged: function (oEvent) {

            //     var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow");
    
            //     // Replace the URL with the new layout if a navigation arrow was used

            //     if (bIsNavigationArrow) {
            //         this.oRouter.navTo(this.currentRouteName, {orderPath: this.currentOrderPath}, true);
            //     };

            //     console.log(bIsNavigationArrow);
            // },
    

            // ¿¿¿???
            // onExit: function () {
            //     this.oRouter.detachRouteMatched(this.onRouteMatched, this);
            // }

        });
    });
