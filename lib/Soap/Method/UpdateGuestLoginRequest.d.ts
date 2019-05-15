import SoapRequest from '../SoapRequest';
import DatasetGuest from '../Dataset/DatasetGuest';
declare class UpdateGuestLoginRequest extends SoapRequest {
    constructor(dataset: DatasetGuest);
}
export default UpdateGuestLoginRequest;
