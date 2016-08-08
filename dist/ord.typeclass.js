"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var decorator_eq_1 = require("decorator-eq");
var ord_config_1 = require("./ord.config");
var Ord = (function (_super) {
    __extends(Ord, _super);
    function Ord() {
        _super.apply(this, arguments);
    }
    Ord._impl = function (method) {
        return function (a, config) {
            if (!config) {
                throw new Error("Method " + method + " cannot be run without config.");
            }
            for (var _i = 0, _a = config.ordFields; _i < _a.length; _i++) {
                var field = _a[_i];
                var val = (method === "greater") ? field.greater(this, a) : field.less(this, a);
                if (val !== null)
                    return val;
            }
            return null;
        };
    };
    Ord.implement = function (props) {
        var _this = this;
        return function (target) {
            decorator_eq_1.Eq.implementFields((props) ? props.config : null, Ord._ord.fields);
            Ord._ord.fields = [];
            target.prototype.greater = _this._impl('greater');
            target.prototype.less = _this._impl('less');
            decorator_eq_1.Eq.implement(props).apply(_this, [target]);
        };
    };
    Ord.field = function (props) {
        return function (target, propertyKey) {
            Ord._ord.fields[props.ordinality] = new ord_config_1.Field(propertyKey, props);
        };
    };
    Ord.sort = function (cs, config) {
        return cs.slice(0).sort(function (a, b) {
            var val = a.greater(b, config);
            return (val === null || (!val && a.eq(b, config))) ? 0 : ((val) ? 1 : -1);
        });
    };
    Ord.greater = function (cs, ref, config) {
        return cs.filter(function (a) {
            return (ref.less(a, config));
        });
    };
    Ord.less = function (cs, ref, config) {
        return cs.filter(function (a) {
            return (ref.greater(a, config));
        });
    };
    Ord.inRange = function (cs, top, bottom, config) {
        return cs.filter(function (a) {
            return (top.greater(a, config) !== false && bottom.less(a, config) !== false);
        });
    };
    Ord._ord = { fields: [] };
    return Ord;
}(decorator_eq_1.Eq));
exports.Ord = Ord;
//# sourceMappingURL=ord.typeclass.js.map