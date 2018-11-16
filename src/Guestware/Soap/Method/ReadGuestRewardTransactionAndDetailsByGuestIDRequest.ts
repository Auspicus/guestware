import SoapRequest from '../SoapRequest'

class ReadGuestRewardTransactionAndDetailsByGuestIDRequest extends SoapRequest {

  constructor(guestID: string) {
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
          <web:ReadGuestRewardTransactionAndDetailsByGuestID>
            <web:parintGuestID>${guestID}</web:parintGuestID>
          </web:ReadGuestRewardTransactionAndDetailsByGuestID>
        </soapenv:Body>
      </soapenv:Envelope>
    `)
  }

}

export default ReadGuestRewardTransactionAndDetailsByGuestIDRequest