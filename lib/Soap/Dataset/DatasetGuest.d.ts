import DatasetGuestRow from './DatasetGuestRow';
import SoapResponse from '../SoapResponse';
declare class DatasetGuest {
    components: DatasetGuestRow[];
    constructor(components: DatasetGuestRow[]);
    getRow(name: string): DatasetGuestRow;
    getRowN(name: string, n: number): DatasetGuestRow;
    serialize(): string;
}
export default DatasetGuest;
declare const fromResponse: (response: SoapResponse) => DatasetGuest;
export { fromResponse };
