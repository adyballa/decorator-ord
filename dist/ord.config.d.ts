import { EqField, EqConfig } from "decorator-eq";
import { IField, TFieldValue } from "decorator-eq/eq.interface";
import { IOrd, TDirection, IFieldProperty, IOrdField, IOrdConfig } from "./ord.interface";
export declare class Field extends EqField implements IOrdField {
    name: string;
    dir: TDirection;
    map: Array<string>;
    constructor(name: string, props: IFieldProperty);
    greater(a: IOrd, b: IOrd): boolean;
    less(a: IOrd, b: IOrd): boolean;
    value(object: IOrd): TFieldValue;
    clone(): Field;
}
export declare class OrdConfig extends EqConfig implements IOrdConfig {
    protected _ordFields: Array<IOrdField>;
    clone(): OrdConfig;
    fields: Array<IField>;
    eqFields: Array<EqField>;
    ordFields: Array<IOrdField>;
    static setOrdnialityOfField(name: string, fields: Array<IField>, newIndex?: number): void;
}
