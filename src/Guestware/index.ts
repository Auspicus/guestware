import Legacy from './Legacy'

export default Legacy

import Client from './Client'
import Configuration from './Configuration'
import SoapRequest from './Soap/SoapRequest'
import SoapResponse, { ParserStrictness } from './Soap/SoapResponse'
import FailedRequest from './Exception/FailedRequest'
import ReadGuestLoginRequest from './Soap/Method/ReadGuestLoginRequest'
import ReadGuestLoginGuestIDStringRequest from './Soap/Method/ReadGuestLoginGuestIDStringRequest'

export {
  Client,
  Configuration,
  SoapRequest,
  SoapResponse,
  FailedRequest,
  ReadGuestLoginRequest,
  ReadGuestLoginGuestIDStringRequest,
  ParserStrictness
}