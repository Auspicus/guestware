import SoapRequest from '../SoapRequest'
import DatasetGuest from '../Dataset/DatasetGuest'

class UpdateGuestLoginRequest extends SoapRequest {

  constructor(dataset: DatasetGuest) {
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
          <web:UpdateGuestLogin>
            <web:pardstGuest
              xmlns:msdata="urn:schemas-microsoft-com:xml-msdata"
              msdata:SchemaSerializationMode="ExcludeSchema">
              ${dataset.serialize()}
            </web:pardstGuest>
          </web:UpdateGuestLogin>
        </soapenv:Body>
      </soapenv:Envelope>`
    );
  }

}

export default UpdateGuestLoginRequest