jest.mock('node-fetch')

import { Configuration } from '../../lib/index.js'

describe('Configuration', () => {

  const secrets = {
    wsdl: 'wsdl',
    username: 'username',
    password: 'password',
    appName: 'appName',
    version: 'version'
  }
  const configuration = new Configuration(secrets)
  let xmlRequest = `
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
            <web:parintGuestID>1234567890</web:parintGuestID>
        </web:ReadGuestLogin>
      </soapenv:Body>
    </soapenv:Envelope>`

  test('.apply => returns XML request with configuration applied', () => {
    xmlRequest = configuration.apply(xmlRequest)
    expect(xmlRequest).toMatchSnapshot()
  })

  test('.unapply => returns XML request with configuration removed', () => {
    xmlRequest = configuration.unapply(xmlRequest)
    expect(xmlRequest).toMatchSnapshot()
  })

})