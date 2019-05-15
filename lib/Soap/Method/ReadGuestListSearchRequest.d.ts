import SoapRequest from '../SoapRequest';
declare class ReadGuestListSearchRequest extends SoapRequest {
    constructor(config: {
        start: string;
        end: string;
        sortAsc: boolean;
        outCount: number;
        queryInputParameters: {
            [name: string]: string;
        };
        sortBy?: string;
    });
}
export default ReadGuestListSearchRequest;
