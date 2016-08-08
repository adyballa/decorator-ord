"use strict";
function isFieldOrd(object) {
    return ('name' in object && 'map' in object);
}
exports.isFieldOrd = isFieldOrd;
function isOrd(object) {
    return (typeof object === "object" && 'greater' in object && 'less' in object);
}
exports.isOrd = isOrd;
//# sourceMappingURL=ord.interface.js.map