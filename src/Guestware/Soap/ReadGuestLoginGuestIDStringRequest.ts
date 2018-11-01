import { SoapRequest } from "..";

class ReadGuestLoginGuestIDStringRequest extends SoapRequest {

  id: string

  constructor(email: string) {
    super(`
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.guestware.com/">
        <soapenv:Header>
          <web:GWCNOBJ>
            <web:UserName>{{UserName}}</web:UserName>
            <web:PassWord>{{Password}}</web:PassWord>
            <web:ApplicationName>{{ApplicationName}}</web:ApplicationName>
            <web:VersionNumber>{{VersionNumber}}</web:VersionNumber>
          </web:GWCNOBJ>
        </soapenv:Header>
        <soapenv:Body>
          <web:ReadGuestLoginGuestIDString>
              <web:parstrGuestID>${email}</web:parstrGuestID>
          </web:ReadGuestLoginGuestIDString>
        </soapenv:Body>
      </soapenv:Envelope>`
    );
  }

}

export default ReadGuestLoginGuestIDStringRequest