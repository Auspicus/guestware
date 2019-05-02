import Legacy from './Legacy'

export default Legacy

import Client from './Client'
import Configuration from './Configuration'

import SoapRequest from './Soap/SoapRequest'
import SoapResponse, { ParserStrictness } from './Soap/SoapResponse'
import DiffgramRowAction from './Soap/DiffgramRowAction'

import FailedRequest from './Exception/FailedRequest'

import ReadGuestLoginRequest from './Soap/Method/ReadGuestLoginRequest'
import ReadGuestLoginGuestIDStringRequest from './Soap/Method/ReadGuestLoginGuestIDStringRequest'
import ReadGuestListSearchRequest from './Soap/Method/ReadGuestListSearchRequest'
import UpdateGuestLoginRequest from './Soap/Method/UpdateGuestLoginRequest'
import UpdateGuestDetailTablesRequest from './Soap/Method/UpdateGuestDetailTablesRequest'
import DatasetGuest, { fromResponse as DatasetGuestFromResponse } from './Soap/Dataset/DatasetGuest'
import DatasetGuestRow, { fromElements as DatasetGuestRowFromElement } from './Soap/Dataset/DatasetGuestRow'

export {
  Client,
  Configuration,

  SoapRequest,
  SoapResponse,
  ParserStrictness,
  DiffgramRowAction,

  FailedRequest,
  
  ReadGuestLoginRequest,
  ReadGuestLoginGuestIDStringRequest,
  ReadGuestListSearchRequest,
  UpdateGuestLoginRequest,
  UpdateGuestDetailTablesRequest,
  DatasetGuest,
  DatasetGuestFromResponse,
  DatasetGuestRow,
  DatasetGuestRowFromElement,
}