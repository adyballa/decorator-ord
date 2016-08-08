import {AbstractRecord} from "./abstract.record";
import {IOrd, IOrdConfig} from "./ord.interface";

export class BorderRecord extends AbstractRecord<number> {

    protected initVal:number = 0;

    protected config:IOrdConfig;

    protected _record(fieldName:string, method:string, value:string, data?:Object) {
        this.results[fieldName][method]['min'] = ('min' in this.results[fieldName][method])
            ? Math.min(this.results[fieldName][method]['min'], parseFloat(value))
            : parseFloat(value);
        this.results[fieldName][method]['max'] = ('max' in this.results[fieldName][method])
            ? Math.max(this.results[fieldName][method]['max'], parseFloat(value))
            : parseFloat(value);
    }

    protected _play(fieldName:string, method:string, value:string):any {
        for(let f of this.config.ordFields){
            if(f.name===fieldName){
                return (f.map.length) ? f.map[this.results[fieldName][method][value]]
                    : this.results[fieldName][method][value];
            }
        }
    }

    public record(fieldName:string, method:string, value:string, data?:Object) {
        this.guarantee(this.results, fieldName, {})
            .guarantee(this.results[fieldName], method, {});
        this._record(fieldName, method, value, data);
    }

    public recordOrdConfig(cs:IOrd[], config:IOrdConfig) {
        this.reset();
        this.config=config;
        for (let c of cs) {
            for (let field of config.fields) {
                this.record(field.name, "eq", <string> field.value(c));
            }
        }
    }
}
