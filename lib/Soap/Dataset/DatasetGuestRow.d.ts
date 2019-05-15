import DiffgramRowAction from '../DiffgramRowAction';
declare class DatasetGuestRow {
    name: string;
    diff: DiffgramRowAction;
    properties: {
        [fieldName: string]: string;
    };
    updatedProperties: {
        [fieldName: string]: string;
    };
    constructor(name: string, diff: DiffgramRowAction, properties: {
        [fieldName: string]: string;
    });
    serialize(rowId: number): {
        before: string;
        current: string;
    };
    values(): {
        [x: string]: string;
    };
    modify(name: string, value: string): void;
}
declare const fromElements: (elements: Element[]) => DatasetGuestRow[];
export { fromElements };
export default DatasetGuestRow;
