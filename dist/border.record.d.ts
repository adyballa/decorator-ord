import { AbstractRecord } from "./abstract.record";
import { IOrd, IOrdConfig } from "./ord.interface";
export declare class BorderRecord extends AbstractRecord<number> {
    protected initVal: number;
    protected config: IOrdConfig;
    protected _record(fieldName: string, method: string, value: string, data?: Object): void;
    protected _play(fieldName: string, method: string, value: string): any;
    record(fieldName: string, method: string, value: string, data?: Object): void;
    recordOrdConfig(cs: IOrd[], config: IOrdConfig): void;
}
