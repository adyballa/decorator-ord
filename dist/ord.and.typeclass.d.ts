import { Ord, IOrd, IOrdConfig } from "./ord.typeclass";
export declare class OrdAnd extends Ord {
    protected static _impl(method: string): (a: IOrd, config?: IOrdConfig) => (any | any);
}
