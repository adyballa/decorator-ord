"use strict";
var AbstractRecord = (function () {
    function AbstractRecord() {
        this.results = {};
    }
    AbstractRecord.prototype.guarantee = function (obj, key, value) {
        if (!(key in obj)) {
            obj[key] = value;
        }
        return this;
    };
    AbstractRecord.prototype._play = function (fieldName, method, value) {
        return this.results[fieldName][method][value];
    };
    AbstractRecord.prototype.play = function (fieldName, method, value) {
        this.guarantee(this.results, fieldName, {})
            .guarantee(this.results[fieldName], method, {})
            .guarantee(this.results[fieldName][method], value, this.initVal);
        return this._play(fieldName, method, value);
    };
    AbstractRecord.prototype.record = function (fieldName, method, value, data) {
        this.guarantee(this.results, fieldName, {})
            .guarantee(this.results[fieldName], method, {})
            .guarantee(this.results[fieldName][method], value, this.initVal);
        this._record(fieldName, method, value, data);
    };
    AbstractRecord.prototype.reset = function () {
        this.results = {};
    };
    return AbstractRecord;
}());
exports.AbstractRecord = AbstractRecord;
//# sourceMappingURL=abstract.record.js.map