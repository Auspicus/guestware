import { useNamespaces as XPathSelectWithNamespaces, SelectedValue } from 'xpath'
import { DOMParser } from 'xmldom'

import PropertyNotFound from '../Exception/PropertyNotFound'

enum ParserStrictness {
  Strict = 0,
  Flexible = 1,
}
export { ParserStrictness }

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

  queryFirst(xpathQuery: string, namespaces?: { [name: string]: string }): SelectedValue {
    namespaces = namespaces || this.defaultNamespaces()
    const XPathSelect = XPathSelectWithNamespaces(namespaces)
    return XPathSelect(xpathQuery, this.document, true)
  }

  queryAll(xpathQuery: string, namespaces?: { [name: string]: string }): Array<SelectedValue> {
    namespaces = namespaces || this.defaultNamespaces()
    const XPathSelect = XPathSelectWithNamespaces(namespaces)
    return XPathSelect(xpathQuery, this.document)
  }

  format(listItem: string, map: { [name: string]: string }, strictness?: ParserStrictness) {
    strictness = strictness || ParserStrictness.Strict
    const result = []
    const namespaces = { dstGST: 'http://webservices.guestware.com/dstGST.xsd' }
    const XPathSelect = XPathSelectWithNamespaces(namespaces)

    this
    .queryAll(`//dstGST:${listItem}`, namespaces)
    .forEach(node => {
      const item = {}
      Object.keys(map).forEach(key => {
        const found = XPathSelect(`dstGST:${map[key]}/text()`, <Node> node, true)
        if (found)
          item[key] = found.toString()
        else if (strictness === ParserStrictness.Strict)
          throw new PropertyNotFound(`${listItem} > ${map[key]}`)
      })
      result.push(item)
    })
    
    return result
  }

}

export default SoapResponse