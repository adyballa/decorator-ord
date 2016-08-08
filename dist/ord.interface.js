"use strict";
var eq_interface_1 = require("decorator-eq/eq.interface");
exports.isEq = eq_interface_1.isEq;
function isFieldOrd(object) {
    return ('name' in object && 'map' in object);
}
exports.isFieldOrd = isFieldOrd;
function isOrd(object) {
    return (typeof object === "object" && 'greater' in object && 'less' in object);
}
exports.isOrd = isOrd;
//# sourceMappingURL=ord.interface.js.map