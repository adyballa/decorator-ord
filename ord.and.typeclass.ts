import {Ord} from "./ord.typeclass";
import {IOrd, IOrdConfig} from "./ord.interface";

export class OrdAnd extends Ord {

    protected static _impl(method:string):(a:IOrd, config?:IOrdConfig)=>(any|any) {
        return function (a:IOrd, config?:IOrdConfig) {
            if (!config) {
                throw new Error("Method " + method + " cannot be run without config.");
            }
            let res:boolean = null;
            for (let field of config.ordFields) {
                let val = (method === "greater") ? field.greater(this, a) : field.less(this, a);
                if (val !== null) {
                    if (!val) return false;
                    res = true;
                }
            }
            return res;
        }
    }
}
