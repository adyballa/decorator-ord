import { IEq, IField, IEqConfig } from "decorator-eq/eq.interface";
import { EqField } from "decorator-eq";
export interface IOrdFieldProperty {
    ordinality: number;
    dir?: TDirection;
    map?: Array<string>;
}
export declare type TDirection = "ASC" | "DESC";
export interface IOrdField extends IField {
    dir: TDirection;
    map: Array<string>;
    greater: (a: IOrd, b: IOrd) => boolean;
    less: (a: IOrd, b: IOrd) => boolean;
}
export declare function isFieldOrd(object: any): object is IOrdField;
export interface IOrdConfig extends IEqConfig {
    ordFields: Array<IOrdField>;
    eqFields: Array<EqField>;
}
export interface IOrd extends IEq {
    [name: string]: any;
    greater(a: IOrd): boolean;
    greater(a: IOrd, config: IOrdConfig): boolean;
    less(a: IOrd): boolean;
    less(a: IOrd, config: IOrdConfig): boolean;
}
export declare function isOrd(object: any): object is IOrd;
