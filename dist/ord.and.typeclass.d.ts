import { Ord } from "./ord.typeclass";
import { IOrd, IOrdConfig } from "./ord.interface";
export declare class OrdAnd extends Ord {
    protected static _impl(method: string): (a: IOrd, config?: IOrdConfig) => (any | any);
}
