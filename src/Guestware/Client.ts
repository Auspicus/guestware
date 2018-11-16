import fetch, { Response, Request, RequestInit } from 'node-fetch'

import SoapRequest from './Soap/SoapRequest'
import FailedRequest from './Exception/FailedRequest'
import Configuration from './Configuration'

class Client {

  transport: (url: string | Request, init?: RequestInit) => Promise<Response>
  wsdl: string
  configuration: Configuration

  constructor(options: {
    transport: (url: string | Request, init?: RequestInit) => Promise<Response>
    configuration: Configuration
  }) {
    const { transport, configuration } = options
    this.transport = transport ? transport : fetch
    this.wsdl = configuration.wsdl
    this.configuration = configuration
  }

  async send(soapRequest: SoapRequest): Promise<string> {
    const response = await this.transport(this.wsdl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: this.configuration.apply(soapRequest.toString())
    })

    let xml = await response.text()
    if (response.ok) {
      return xml
    } else {
      throw new FailedRequest(`Failed Request:\n${soapRequest}\n${xml}`)
    }
  }

}

export default Client