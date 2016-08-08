export interface IRecord<T> {
    record(fieldName:string, method:string, value:string, data?:Object):void;
    play(fieldName:string, method:string, value:string):T
    reset():void;
}

export abstract class AbstractRecord<T> implements IRecord<T> {

    protected results:{[fieldname:string]:{[method:string]:{[value:string]:T}}} = {};

    protected initVal:T;

    protected guarantee(obj:{[key:string]:any}, key:string, value:any):this {
        if (!(key in obj)) {
            obj[key] = value;
        }
        return this;
    }

    protected abstract _record(fieldName:string, method:string, value:string, data?:Object):void;

    protected _play(fieldName:string, method:string, value:string):any{
        return this.results[fieldName][method][value];
    }

    public play(fieldName:string, method:string, value:string):T {
        this.guarantee(this.results, fieldName, {})
            .guarantee(this.results[fieldName], method, {})
            .guarantee(this.results[fieldName][method], value, this.initVal);
        return this._play(fieldName, method, value);
    }

    public record(fieldName:string, method:string, value:string, data?:Object):void {
        this.guarantee(this.results, fieldName, {})
            .guarantee(this.results[fieldName], method, {})
            .guarantee(this.results[fieldName][method], value, this.initVal);
        this._record(fieldName, method, value, data);
    }

    public reset():void {
        this.results = {};
    }
}
