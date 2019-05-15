import SoapRequest from '../SoapRequest';
declare class ReadGuestLoginGuestIDStringRequest extends SoapRequest {
    id: string;
    constructor(email: string);
}
export default ReadGuestLoginGuestIDStringRequest;
