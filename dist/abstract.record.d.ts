export interface IRecord<T> {
    record(fieldName: string, method: string, value: string, data?: Object): void;
    play(fieldName: string, method: string, value: string): T;
    reset(): void;
}
export declare abstract class AbstractRecord<T> implements IRecord<T> {
    protected results: {
        [fieldname: string]: {
            [method: string]: {
                [value: string]: T;
            };
        };
    };
    protected initVal: T;
    protected guarantee(obj: {
        [key: string]: any;
    }, key: string, value: any): this;
    protected abstract _record(fieldName: string, method: string, value: string, data?: Object): void;
    protected _play(fieldName: string, method: string, value: string): any;
    play(fieldName: string, method: string, value: string): T;
    record(fieldName: string, method: string, value: string, data?: Object): void;
    reset(): void;
}
