import SoapRequest from '../Soap/SoapRequest'

class FailedRequest extends Error {

  request: SoapRequest
  
  constructor(request: SoapRequest) {
    super()
    this.request = request
  }

  peekRequest() {
    return this.request
  }

}

export default FailedRequest