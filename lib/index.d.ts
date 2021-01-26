import Legacy from './Legacy';
export default Legacy;
import Client from './Client';
import Configuration from './Configuration';
import SoapRequest from './Soap/SoapRequest';
import SoapResponse, { ParserStrictness } from './Soap/SoapResponse';
import DiffgramRowAction from './Soap/DiffgramRowAction';
import FailedRequest from './Exception/FailedRequest';
import PropertyNotFound from './Exception/PropertyNotFound';
import ReadGuestDetailTablesRequest from './Soap/Method/ReadGuestDetailTablesRequest';
import ReadGuestListSearchRequest from './Soap/Method/ReadGuestListSearchRequest';
import UpdateGuestLoginRequest from './Soap/Method/UpdateGuestLoginRequest';
import ReadGuestLoginGuestIDStringRequest from './Soap/Method/ReadGuestLoginGuestIDStringRequest';
import ReadGuestLoginRequest from './Soap/Method/ReadGuestLoginRequest';
import ReadGuestRewardBalanceRequest from './Soap/Method/ReadGuestRewardBalanceRequest';
import ReadGuestRewardTransactionAndDetailsByGuestIDRequest from './Soap/Method/ReadGuestRewardTransactionAndDetailsByGuestIDRequest';
import ReadGuestVisitRequest from './Soap/Method/ReadGuestVisitRequest';
import UpdateGuestDetailTablesRequest from './Soap/Method/UpdateGuestDetailTablesRequest';
import DatasetGuest, { fromResponse as DatasetGuestFromResponse } from './Soap/Dataset/DatasetGuest';
import DatasetGuestRow, { fromElements as DatasetGuestRowFromElement } from './Soap/Dataset/DatasetGuestRow';
export { Client, Configuration, SoapRequest, SoapResponse, ParserStrictness, DiffgramRowAction, FailedRequest, PropertyNotFound, ReadGuestDetailTablesRequest, ReadGuestListSearchRequest, ReadGuestLoginGuestIDStringRequest, ReadGuestLoginRequest, ReadGuestRewardBalanceRequest, ReadGuestRewardTransactionAndDetailsByGuestIDRequest, ReadGuestVisitRequest, UpdateGuestLoginRequest, UpdateGuestDetailTablesRequest, DatasetGuest, DatasetGuestFromResponse, DatasetGuestRow, DatasetGuestRowFromElement, };