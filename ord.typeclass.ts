import {IEqProps,Eq} from "decorator-eq";
import {Field} from "./ord.config";
import {IOrd,IOrdConfig,IFieldProperty} from "./ord.interface";

export class Ord extends Eq {

    protected static _ord:{fields:Array<Field>} = {fields: []};

    protected static _impl(method:string) {
        return function (a:IOrd, config?:IOrdConfig) {
            if (!config) {
                throw new Error("Method " + method + " cannot be run without config.");
            }
            for (let field of config.ordFields) {
                let val:boolean = (method === "greater") ? field.greater(this, a) : field.less(this, a);
                if (val !== null) return val;
            }
            return null;
        }
    }

    static implement(props?:IEqProps) {
        return (target:Function) => {

            Eq.implementFields((props) ? <IOrdConfig> props.config : null, Ord._ord.fields);
            Ord._ord.fields = [];
            target.prototype.greater = this._impl('greater');
            target.prototype.less = this._impl('less');
            Eq.implement(props).apply(this, [target]);
        }
    }

    static field(props:IFieldProperty) {
        return function (target:Object, propertyKey:string) {
            Ord._ord.fields[props.ordinality] = new Field(propertyKey, props);
        }
    }

    static sort(cs:IOrd[], config:IOrdConfig):IOrd[] {
        return cs.slice(0).sort((a:IOrd, b:IOrd) => {
            let val = a.greater(b, config);
            return (val === null || (!val && a.eq(b, config))) ? 0 : ( (val) ? 1 : -1 );
        });
    }

    static greater(cs:IOrd[], ref:IOrd, config:IOrdConfig):IOrd[] {
        return cs.filter((a:IOrd) => {
            return (ref.less(a, config));
        });
    }

    static less(cs:IOrd[], ref:IOrd, config:IOrdConfig):IOrd[] {
        return cs.filter((a:IOrd) => {
            return (ref.greater(a, config));
        });
    }

    static inRange(cs:IOrd[], top:IOrd, bottom:IOrd, config:IOrdConfig):IOrd[] {
        return cs.filter((a:IOrd) => {
            return (top.greater(a, config) !== false && bottom.less(a, config) !== false);
        });
    }
}
