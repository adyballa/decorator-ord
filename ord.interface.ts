import {IEq, IField, IEqConfig, isEq} from "decorator-eq/eq.interface";
import {EqField} from "decorator-eq/eq.typeclass";

export {IEq, IField, IEqConfig, isEq};

export interface IFieldProperty {
    ordinality:number,
    dir?:TDirection,
    map?:Array<string>
}

export type TDirection = "ASC" | "DESC";

export interface IOrdField extends IField{
    dir:TDirection;
    map:Array<string>;
    greater:(a:IOrd, b:IOrd)=>boolean;
    less:(a:IOrd, b:IOrd)=>boolean;
}

export function isFieldOrd(object:any):object is IOrdField {
    return ('name' in object && 'map' in object);
}

export interface IOrdConfig extends IEqConfig {
    ordFields:Array<IOrdField>
    eqFields:Array<EqField>
}

export interface IOrd extends IEq {
    [name:string]:any;
    greater(a:IOrd):boolean,
    greater(a:IOrd, config:IOrdConfig):boolean,
    less(a:IOrd):boolean,
    less(a:IOrd, config:IOrdConfig):boolean
}

export function isOrd(object:any):object is IOrd {
    return (typeof object === "object" && 'greater' in object && 'less' in object);
}
