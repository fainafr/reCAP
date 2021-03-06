sap.ui.define(
    [
        "sap/ui/core/UIComponent",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/ComponentSupport" // make sure to include the ComponentSupport in the bundle
    ],
    (UIComponent, JSONModel) => {
        "use strict"

        return UIComponent.extend("capcom.recap.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init() {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments)
            }
        })
    }
)
