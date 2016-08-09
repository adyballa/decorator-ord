"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var decorator_eq_1 = require("decorator-eq");
var ord_interface_1 = require("./ord.interface");
var Field = (function (_super) {
    __extends(Field, _super);
    function Field(name, props) {
        _super.call(this, name);
        this.name = name;
        this.map = ('map' in props) ? props.map : [];
        this.dir = ('dir' in props) ? props.dir : "ASC";
    }
    Field.prototype.greater = function (a, b) {
        var vals = [this.value(a), this.value(b)];
        if (vals[0] === null || vals[1] === null || vals[0] === vals[1]) {
            return null;
        }
        else {
            if (ord_interface_1.isOrd(vals[0])) {
                return (this.dir == "ASC") ? vals[0].greater(vals[1]) : vals[0].less(vals[1]);
            }
            else {
                return (this.dir == "ASC") ? (vals[0] > vals[1]) : (vals[0] < vals[1]);
            }
        }
    };
    Field.prototype.less = function (a, b) {
        var vals = [this.value(a), this.value(b)];
        if (vals[0] === null || vals[1] === null || vals[0] === vals[1]) {
            return null;
        }
        else {
            if (ord_interface_1.isOrd(vals[0])) {
                return (this.dir == "ASC") ? vals[0].less(b) : vals[0].greater(b);
            }
            else {
                return (this.dir == "ASC") ? (vals[0] < vals[1]) : (vals[0] > vals[1]);
            }
        }
    };
    Field.prototype.value = function (object) {
        var val = object[this.name];
        if (val === null) {
            return null;
        }
        if (this.map.length) {
            return this.map.indexOf(object[this.name]);
        }
        else {
            return _super.prototype.value.call(this, object);
        }
    };
    Field.prototype.clone = function () {
        return new Field(this.name, { map: this.map, dir: this.dir, ordinality: -2 });
    };
    return Field;
}(decorator_eq_1.EqField));
exports.Field = Field;
var OrdConfig = (function (_super) {
    __extends(OrdConfig, _super);
    function OrdConfig() {
        _super.apply(this, arguments);
        this._ordFields = [];
    }
    OrdConfig.prototype.clone = function () {
        var res = _super.prototype.clone.call(this);
        res.ordFields = [];
        res.eqFields = [];
        this.ordFields.forEach(function (field) { return res.ordFields.push(field.clone()); });
        this.eqFields.forEach(function (field) { return res.eqFields.push(field.clone()); });
        return res;
    };
    Object.defineProperty(OrdConfig.prototype, "fields", {
        get: function () {
            return this._ordFields.concat(this._fields);
        },
        set: function (fields) {
            var _this = this;
            this._fields = fields;
            this._fields.forEach(function (field) {
                if (ord_interface_1.isFieldOrd(field)) {
                    _this._ordFields.push(field);
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrdConfig.prototype, "eqFields", {
        get: function () {
            return this._fields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrdConfig.prototype, "ordFields", {
        get: function () {
            return this._ordFields;
        },
        enumerable: true,
        configurable: true
    });
    OrdConfig.setOrdinalityOfField = function (name, fields, newIndex) {
        if (newIndex === void 0) { newIndex = 0; }
        var oldKey = fields.findIndex(function (field) {
            return (field.name === name);
        });
        fields.splice(newIndex, 0, fields.splice(oldKey, 1)[0]);
    };
    return OrdConfig;
}(decorator_eq_1.EqConfig));
exports.OrdConfig = OrdConfig;
//# sourceMappingURL=ord.config.js.map