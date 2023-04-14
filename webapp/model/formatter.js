sap.ui.define([

], function() {
    'use strict';

    return {

        currency : function(nPrice) {

            var oCurrency = new sap.ui.model.type.Currency({
                showMeasure: false       
            });

            return (nPrice == 0)
                ? "-"
                : "$ " + oCurrency.formatValue([nPrice, "USD"], "string");
        },



        isDiscontinuedValue : function(isDiscontinued) {
            
            return (isDiscontinued) ? "Discontinued" : "Continued"
        },

        isDiscontinuedState : function(isDiscontinued) {
            
            return (!isDiscontinued) ? "Success" : "Error"
        },


    }
});