import SoapRequest from '../SoapRequest'

class ReadGuestVisitRequest extends SoapRequest {

  constructor(guestID: string, locationID?: string) {
    const parstrLocationId = locationID ? `<web:parstrLocationId>${locationID}</web:parstrLocationId>` : ''
    super(`
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
            <web:ReadGuestVisit>
              <web:parintGuestID>${guestID}</web:parintGuestID>
              ${parstrLocationId}
            </web:ReadGuestVisit>
        </soapenv:Body>
      </soapenv:Envelope>`
    );
  }

}

export default ReadGuestVisitRequest