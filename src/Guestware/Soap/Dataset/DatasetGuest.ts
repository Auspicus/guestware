import DatasetGuestRow, { fromElements } from './DatasetGuestRow'
import SoapResponse from '../SoapResponse'

class DatasetGuest {

  components: DatasetGuestRow[]

  constructor(components: DatasetGuestRow[]) {
    this.components = components
  }

  getRow(name: string): DatasetGuestRow {
    return this.components.filter(row => row.name === name).shift()
  }

  getRowN(name: string, n: number): DatasetGuestRow {
    return this.components.filter(row => row.name === name).slice(n, n + 1).shift() 
  }

  serialize(): string {
    let before = ''
    let current = ''
    let seen = {}

    this.components.forEach(row => {
      seen[row.name] = typeof seen[row.name] === 'undefined' ? 0 : seen[row.name] + 1
      const { before: rowBefore, current: rowCurrent } = row.serialize(seen[row.name])
      before += rowBefore
      current += rowCurrent
    })

    return `
      <xs:schema
        xmlns:xs="http://www.w3.org/2001/XMLSchema"
        xmlns="http://webservices.guestware.com/dstGST.xsd" xmlns:msprop="urn:schemas-microsoft-com:xml-msprop"
        xmlns:mstns="http://webservices.guestware.com/dstGST.xsd"
        id="dstGST"
        targetNamespace="http://webservices.guestware.com/dstGST.xsd"
        attributeFormDefault="qualified"
        elementFormDefault="qualified">
          <xs:element name="dstGST" msdata:IsDataSet="true" msdata:UseCurrentLocale="true">
            <xs:complexType>
              <xs:choice minOccurs="0" maxOccurs="unbounded"/>
            </xs:complexType>
          </xs:element>
      </xs:schema>
      <diffgr:diffgram
        xmlns:msdata="urn:schemas-microsoft-com:xml-msdata"
        xmlns:diffgr="urn:schemas-microsoft-com:xml-diffgram-v1">
        <dstGST xmlns="http://webservices.guestware.com/dstGST.xsd">
          ${current}
        </dstGST>
        <diffgr:before>
          ${before}
        </diffgr:before>
      </diffgr:diffgram>
    `
  }

}

export default DatasetGuest

const fromResponse = (response: SoapResponse): DatasetGuest => {
  const dstGST = <Element>response.queryFirst(`${response.baseXPathDiffgr()}/dstGST:dstGST`)
  return new DatasetGuest(
    Object
    .keys(dstGST.childNodes)
    .map(key => dstGST.childNodes[key])
    .filter(child => child.nodeName && child.nodeName !== '#text')
    .map(element => fromElements([element]))
    .reduce((acc, val) => acc.concat(val), [])
  )
}

export { fromResponse }