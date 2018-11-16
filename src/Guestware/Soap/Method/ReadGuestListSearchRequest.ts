import SoapRequest from '../SoapRequest'

class ReadGuestListSearchRequest extends SoapRequest {

  constructor(config: {
    start: string,
    end: string,
    sortAsc: boolean,
    outCount: number,
    queryInputParameters: { [name: string]: string },
    sortBy?: string,
  }) {
    super('')
    const { start, end, sortAsc, outCount, sortBy, queryInputParameters } = config
    const parstrSortBy = sortBy ? `<web:parstrSortBy>${sortBy}</web:parstrSortBy>` : ``
    this.xml = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.guestware.com/">
        <soapenv:Header>
            <web:GWCNOBJ>
              <web:UserName>{{UserName}}</web:UserName>
              <web:PassWord>{{PassWord}}</web:PassWord>
              <web:ApplicationName>{{AppName}}</web:ApplicationName>
              <web:VersionNumber>{{Version}}</web:VersionNumber>
            </web:GWCNOBJ>
        </soapenv:Header>
        <soapenv:Body>
            <web:ReadGuestListSearch>
              <web:parintStart>${start}</web:parintStart>
              <web:parintEnd>${end}</web:parintEnd>
              ${parstrSortBy}
              <web:parblnSortAsc>${sortAsc.toString()}</web:parblnSortAsc>
              <web:parOUTintCount>${outCount}</web:parOUTintCount>
              <web:pardstGST msdata:SchemaSerializationMode="ExcludeSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">
                <xs:schema id="dstGST" targetNamespace="http://webservices.guestware.com/dstGST.xsd" xmlns:mstns="http://webservices.guestware.com/dstGST.xsd" xmlns="http://webservices.guestware.com/dstGST.xsd" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata" xmlns:msprop="urn:schemas-microsoft-com:xml-msprop" attributeFormDefault="qualified" elementFormDefault="qualified">
                  <xs:element name="dstGST" msdata:IsDataSet="true" msdata:UseCurrentLocale="true">
                    <xs:complexType>
                      <xs:choice minOccurs="0" maxOccurs="unbounded"/>
                    </xs:complexType>
                  </xs:element>
                </xs:schema>
                <diffgr:diffgram xmlns:msdata="urn:schemas-microsoft-com:xml-msdata" xmlns:diffgr="urn:schemas-microsoft-com:xml-diffgram-v1"> 
                  <dstGST xmlns="http://webservices.guestware.com/dstGST.xsd">
                    ${this.objectToQueryInputParameters(queryInputParameters)}
                  </dstGST>
                </diffgr:diffgram>
              </web:pardstGST>
            </web:ReadGuestListSearch>
        </soapenv:Body>
      </soapenv:Envelope>
    `
  }

}

export default ReadGuestListSearchRequest