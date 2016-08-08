"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ord_typeclass_1 = require("./ord.typeclass");
var OrdAnd = (function (_super) {
    __extends(OrdAnd, _super);
    function OrdAnd() {
        _super.apply(this, arguments);
    }
    OrdAnd._impl = function (method) {
        return function (a, config) {
            if (!config) {
                throw new Error("Method " + method + " cannot be run without config.");
            }
            var res = null;
            for (var _i = 0, _a = config.ordFields; _i < _a.length; _i++) {
                var field = _a[_i];
                var val = (method === "greater") ? field.greater(this, a) : field.less(this, a);
                if (val !== null) {
                    if (!val)
                        return false;
                    res = true;
                }
            }
            return res;
        };
    };
    return OrdAnd;
}(ord_typeclass_1.Ord));
exports.OrdAnd = OrdAnd;
//# sourceMappingURL=ord.and.typeclass.js.map