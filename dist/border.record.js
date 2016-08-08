"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_record_1 = require("./abstract.record");
var BorderRecord = (function (_super) {
    __extends(BorderRecord, _super);
    function BorderRecord() {
        _super.apply(this, arguments);
        this.initVal = 0;
    }
    BorderRecord.prototype._record = function (fieldName, method, value, data) {
        this.results[fieldName][method]['min'] = ('min' in this.results[fieldName][method])
            ? Math.min(this.results[fieldName][method]['min'], parseFloat(value))
            : parseFloat(value);
        this.results[fieldName][method]['max'] = ('max' in this.results[fieldName][method])
            ? Math.max(this.results[fieldName][method]['max'], parseFloat(value))
            : parseFloat(value);
    };
    BorderRecord.prototype._play = function (fieldName, method, value) {
        for (var _i = 0, _a = this.config.ordFields; _i < _a.length; _i++) {
            var f = _a[_i];
            if (f.name === fieldName) {
                return (f.map.length) ? f.map[this.results[fieldName][method][value]]
                    : this.results[fieldName][method][value];
            }
        }
    };
    BorderRecord.prototype.record = function (fieldName, method, value, data) {
        this.guarantee(this.results, fieldName, {})
            .guarantee(this.results[fieldName], method, {});
        this._record(fieldName, method, value, data);
    };
    BorderRecord.prototype.recordOrdConfig = function (cs, config) {
        this.reset();
        this.config = config;
        for (var _i = 0, cs_1 = cs; _i < cs_1.length; _i++) {
            var c = cs_1[_i];
            for (var _a = 0, _b = config.fields; _a < _b.length; _a++) {
                var field = _b[_a];
                this.record(field.name, "eq", field.value(c));
            }
        }
    };
    return BorderRecord;
}(abstract_record_1.AbstractRecord));
exports.BorderRecord = BorderRecord;
//# sourceMappingURL=border.record.js.map