import { AbstractRecord } from "./abstract.record";
import { IOrd, IOrdConfig } from "./ord.interface";
export declare class CountRecord extends AbstractRecord<number> {
    protected initVal: number;
    protected _record(fieldName: string, method: string, value: string, data?: Object): void;
    recordOrdConfig(cs: IOrd[], config: IOrdConfig): void;
}
