import { useNamespaces as XPathSelectWithNamespaces } from 'xpath'
import { DOMParser } from 'xmldom'

class SoapResponse {
  
  xml: string
  document: any

  constructor(xml: string) {
    this.xml = xml
    const parser = new DOMParser()
    this.document = parser.parseFromString(this.xml)
  }

  baseXPath(): string {
    return '/soap:Envelope/soap:Body'
  }

  baseXPathDiffgr(): string {
    return `${this.baseXPath()}/*/*/diffgr:diffgram`
  }

  defaultNamespaces(): { [name: string]: string } {
    return {
      soap: 'http://schemas.xmlsoap.org/soap/envelope/',
      gw: 'http://webservices.guestware.com/',
      diffgr: 'urn:schemas-microsoft-com:xml-diffgram-v1',
      dstGST: 'http://webservices.guestware.com/dstGST.xsd',
    }
  }

  queryFirst(xpathQuery: string, namespaces?: { [name: string]: string }): any {
    namespaces = namespaces || this.defaultNamespaces()
    const XPathSelect = XPathSelectWithNamespaces(namespaces)
    return XPathSelect(xpathQuery, this.document, true)
  }

  queryAll(xpathQuery: string, namespaces?: { [name: string]: string }): Array<any> {
    namespaces = namespaces || this.defaultNamespaces()
    const XPathSelect = XPathSelectWithNamespaces(namespaces)
    return XPathSelect(xpathQuery, this.document)
  }

}

export default SoapResponse