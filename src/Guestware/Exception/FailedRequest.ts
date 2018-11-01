import SoapRequest from '../Soap/SoapRequest'

class FailedRequest extends Error {
  
  constructor(request: SoapRequest) {
    super(request.xml)
  }

}

export default FailedRequest