import { IEqProps, Eq } from "decorator-eq";
import { Field } from "./ord.config";
import { IOrd, IOrdConfig, IFieldProperty } from "./ord.interface";
export declare class Ord extends Eq {
    protected static _ord: {
        fields: Array<Field>;
    };
    protected static _impl(method: string): (a: IOrd, config?: IOrdConfig) => boolean;
    static implement(props?: IEqProps): (target: Function) => void;
    static field(props: IFieldProperty): (target: Object, propertyKey: string) => void;
    static sort(cs: IOrd[], config: IOrdConfig): IOrd[];
    static greater(cs: IOrd[], ref: IOrd, config: IOrdConfig): IOrd[];
    static less(cs: IOrd[], ref: IOrd, config: IOrdConfig): IOrd[];
    static inRange(cs: IOrd[], top: IOrd, bottom: IOrd, config: IOrdConfig): IOrd[];
}
