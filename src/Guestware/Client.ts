import { Response, Request, RequestInit } from 'node-fetch'

import SoapRequest from './Soap/SoapRequest'
import FailedRequest from './Exception/FailedRequest'
import Configuration from './Configuration'

class Client {

  transport: (url: string | Request, init?: RequestInit) => Promise<Response>
  wsdl: string
  configuration: Configuration

  constructor(transport: (url: string | Request, init?: RequestInit) => Promise<Response>, configuration: Configuration) {
    this.transport = transport
    this.wsdl = configuration.wsdl
    this.configuration = configuration
  }

  async send(soapRequest: SoapRequest) {
    const response = await this.transport(this.wsdl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: this.configuration.apply(soapRequest.toString())
    })

    if (response.ok) {
      try {
        const xml = await response.text()
        return xml
      } catch (e) { throw e; }
    } else {
      throw new FailedRequest(soapRequest)
    }
  }

}

export default Client