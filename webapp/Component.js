/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "hexagon/masterdetailtestmatibtp/model/models",
        "sap/f/library"
],

    function (UIComponent, Device, models, fioriLibrary) {
        "use strict";

        return UIComponent.extend("hexagon.masterdetailtestmatibtp.Component", {

            metadata: {
                manifest: "json"
            },

            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            },


            _onBeforeRouteMatched: function(oEvent) {

                var oModel = this.getModel();
                var sLayout = oEvent.getParameters().arguments.layout;
                debugger;
                // No esta llegando aca
                // If there is no layout parameter, set a default layout (normally OneColumn)
                if (!sLayout) {
                    sLayout = fioriLibrary.LayoutType.OneColumn;
                }
    
                oModel.setProperty("/layout", sLayout);

                debugger;
            }
        });
    }
);