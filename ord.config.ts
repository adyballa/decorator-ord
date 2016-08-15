import {EqField, EqConfig} from "decorator-eq";
import {IField, TFieldValue} from "decorator-eq/eq.interface";
import {IOrd, isOrd, TDirection, IOrdFieldProperty, IOrdField, isFieldOrd, IOrdConfig} from "./ord.interface";

export class Field extends EqField implements IOrdField {

    public dir:TDirection;

    public map:Array<string>;

    constructor(public name:string, props:IOrdFieldProperty) {
        super(name);
        this.map = ('map' in props) ? props.map : [];
        this.dir = ('dir' in props) ? props.dir : "ASC"
    }

    public greater(a:IOrd, b:IOrd):boolean {
        let vals = [this.value(a), this.value(b)];
        if (vals[0] === null || vals[1] === null || vals[0] === vals[1]) {
            return null;
        } else {
            if (isOrd(vals[0])) {
                return (this.dir == "ASC") ? (<IOrd> vals[0]).greater(<IOrd> vals[1]) : (<IOrd> vals[0]).less(<IOrd> vals[1]);
            } else {
                return (this.dir == "ASC") ? (vals[0] > vals[1]) : (vals[0] < vals[1]);
            }
        }
    }

    public less(a:IOrd, b:IOrd):boolean {
        let vals = [this.value(a), this.value(b)];
        if (vals[0] === null || vals[1] === null || vals[0] === vals[1]) {
            return null;
        } else {
            if (isOrd(vals[0])) {
                return (this.dir == "ASC") ? (<IOrd> vals[0]).less(b) : (<IOrd> vals[0]).greater(b);
            } else {
                return (this.dir == "ASC") ? (vals[0] < vals[1]) : (vals[0] > vals[1]);
            }
        }
    }

    public value(object:IOrd):TFieldValue {
        let val = object[this.name];
        if (val === null) {
            return null;
        }
        if (this.map.length) {
            return this.map.indexOf(object[this.name]);
        } else {
            return super.value(object);
        }
    }

    public clone():Field {
        return new Field(this.name, {map: this.map, dir: this.dir, ordinality: -2});
    }
}

export class OrdConfig extends EqConfig implements IOrdConfig {

    protected _ordFields:Array<IOrdField> = [];

    public clone():OrdConfig {
        const res = new OrdConfig();
        let f : Array<IField> = [];
        this.fields.forEach((field:IField) =>{
            f.push(field.clone());
        });
        res.fields=f;
        return res;
    }

    public set fields(fields:Array<IField>) {
        fields.forEach((field:IField) => {
            if (isFieldOrd(field)) {
                this._ordFields.push(<IOrdField> field);
            }else{
                this._fields.push(field);
            }
        });
    }

    public get fields():Array<IField> {
        return (<IField[]> this._ordFields).concat(this._fields);
    }

    public get eqFields():Array<EqField> {
        return this._fields;
    }

    public get ordFields():Array<IOrdField> {
        return this._ordFields;
    }

    public static setOrdinalityOfField(name:string, fields:Array<IField>, newIndex = 0) {
        let oldKey = fields.findIndex((field:IField) => {
            return (field.name === name);
        });
        fields.splice(newIndex, 0, fields.splice(oldKey, 1)[0]);
    }
}
