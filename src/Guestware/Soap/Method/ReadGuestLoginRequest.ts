import SoapRequest from '../SoapRequest'

class ReadGuestLoginRequest extends SoapRequest {

  id: string

  constructor(id: string) {
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
          <web:ReadGuestLogin>
              <web:parintGuestID>${id}</web:parintGuestID>
          </web:ReadGuestLogin>
        </soapenv:Body>
      </soapenv:Envelope>`
    );
  }

}

export default ReadGuestLoginRequest