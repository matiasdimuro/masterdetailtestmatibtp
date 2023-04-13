/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "hexagon/masterdetailtestmatibtp/model/models",
],

    function (UIComponent, models) {
        "use strict";

        return UIComponent.extend("hexagon.masterdetailtestmatibtp.Component", {

            metadata: {
                manifest: "json"
            },

            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }

        });
    }
);