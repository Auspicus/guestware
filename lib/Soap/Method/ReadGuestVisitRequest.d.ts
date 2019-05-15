import SoapRequest from '../SoapRequest';
declare class ReadGuestVisitRequest extends SoapRequest {
    constructor(guestID: string, locationID?: string);
}
export default ReadGuestVisitRequest;
