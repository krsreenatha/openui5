/*!
 * ${copyright}
 */

// Provides helper class ValueStateSupport
sap.ui.define(['jquery.sap.global'],
	function(jQuery) {
	"use strict";


	
		var ValueStateSupport = {};
		var mTexts = null;
	
	
		var ensureTexts = function() {
			if (!mTexts) { // initialize texts if required
				mTexts = {};
				var rb = sap.ui.getCore().getLibraryResourceBundle("sap.ui.core");
				mTexts[sap.ui.core.ValueState.Error] = rb.getText("VALUE_STATE_ERROR");
				mTexts[sap.ui.core.ValueState.Warning] = rb.getText("VALUE_STATE_WARNING");
				mTexts[sap.ui.core.ValueState.Success] = rb.getText("VALUE_STATE_SUCCESS");
			}
		};
	
	
		/**
		 * Appends a generic success, warning or error message to the given tooltip text if the given Element
		 * has a property "valueState" with one of these three states.
		 *
		 * @param {sap.ui.core.Element} oElement the Element of which the tooltip needs to be modified
		 * @param {string} sTooltipText the original tooltip text (may be null)
		 * @returns {string} the given text, with appended success/warning/error text, if appropriate
		 *
		 * @public
		 * @name sap.ui.core.ValueStateSupport.enrichTooltip
		 * @function
		 */
		ValueStateSupport.enrichTooltip = function(oElement, sTooltipText) {
			jQuery.sap.assert(oElement instanceof sap.ui.core.Element, "oElement must be an Element");
	
			if (!sTooltipText && oElement.getTooltip()) {
				return undefined; // this means there is no tooltip text configured, but a tooltip object like a RichTooltip
			}
	
			if (oElement.getValueState) {
				var state = oElement.getValueState();
				if (state && (state != sap.ui.core.ValueState.None)) { // only for one of the three interesting state, not for the default
					ensureTexts();
					return (sTooltipText ? sTooltipText + " - " : "") + mTexts[state]; // add a suffix to the Tooltip
				}
			}
	
			return sTooltipText; // when there is no value state
		};
	
	
		/**
		 * Returns a generic success, warning or error message if the given Element
		 * has a property "valueState" with one of these three states.
		 *
		 * @param {sap.ui.core.Element} oElement the Element of which the valueState needs to be checked
		 * @returns {string} the success/warning/error text, if appropriate; otherwise null
		 *
		 * @public
		 * @name sap.ui.core.ValueStateSupport.getAdditionalText
		 * @function
		 */
		ValueStateSupport.getAdditionalText = function(oElement) {
			var result = null;
			if (oElement.getValueState) {
				var state = oElement.getValueState();
				if (state && (state != sap.ui.core.ValueState.None)) { // only for one of the three interesting state, not for the default
					ensureTexts();
					result = mTexts[state];
				}
			}
			return result;
		};
	
		/**
		 * Returns a ValueState object based on the given integer value
		 * 
		 *  0 : ValueState.None
		 *  1 : ValueState.Warning
		 *  2 : ValueState.Success
		 *  3 : ValueState.Error
		 *
		 * @param {int} iState the state as an integer
		 * @return {sap.ui.core.ValueState} the corresponding ValueState object
		 * @static
		 * @public
		 * @name sap.ui.core.ValueStateSupport.formatValueState
		 * @function
		 * @since 1.25.0
		 */
		ValueStateSupport.formatValueState = function(iState) {
			switch (iState) {
				case 1:
					return sap.ui.core.ValueState.Warning;
				case 2:
					return sap.ui.core.ValueState.Success;
				case 3:
					return sap.ui.core.ValueState.Error;
				default:
					return sap.ui.core.ValueState.None;
			}
		};
	

	return ValueStateSupport;

}, /* bExport= */ true);
