"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hasTwoDecimalPlaces(amount) {
    // Regular expression to match a decimal with exactly two decimal places
    var decimalRegex = /^\d+(\.\d{2})?$/;
    // Check if the amount matches the regex
    if (decimalRegex.test(amount)) {
        return true;
    }
    else {
        return "error inValid amount";
    }
}
exports.default = hasTwoDecimalPlaces;
