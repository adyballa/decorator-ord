import {AbstractRecord} from "./abstract.record";
import {IOrd, IOrdConfig} from "./ord.interface";

export class CountRecord extends AbstractRecord<number> {

    protected initVal:number = 0;

    protected _record(fieldName:string, method:string, value:string, data?:Object) {
        this.results[fieldName][method][value]++;
    }

    public recordOrdConfig(cs:IOrd[], config:IOrdConfig) {
        cs.forEach((c:IOrd) => {
            config.fields.forEach((field) => this.record(field.name, "eq", c[field.name]))
        });
    }
}
