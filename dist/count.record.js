"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_record_1 = require("./abstract.record");
var CountRecord = (function (_super) {
    __extends(CountRecord, _super);
    function CountRecord() {
        _super.apply(this, arguments);
        this.initVal = 0;
    }
    CountRecord.prototype._record = function (fieldName, method, value, data) {
        this.results[fieldName][method][value]++;
    };
    CountRecord.prototype.recordOrdConfig = function (cs, config) {
        var _this = this;
        cs.forEach(function (c) {
            config.fields.forEach(function (field) { return _this.record(field.name, "eq", c[field.name]); });
        });
    };
    return CountRecord;
}(abstract_record_1.AbstractRecord));
exports.CountRecord = CountRecord;
//# sourceMappingURL=count.record.js.map