"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterBankList = void 0;
var bankList_1 = require("./bankList");
var filterBankList = function (bankName) {
    try {
        var filteredItem = bankList_1.bankList.filter(function (item) { return item.name === bankName; });
        if (filteredItem.length === 0) {
            console.log('bank not found');
        }
        var code = filteredItem[0].code;
        return code;
    }
    catch (error) {
        return "bank not found";
    }
};
exports.filterBankList = filterBankList;
