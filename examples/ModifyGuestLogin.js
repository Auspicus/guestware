/**
 * This example illustrates how to modify
 * the email address field
 * in the GUEST_LOGIN row
 * in the Guest dataset.
 */

const {
  Client,
  Configuration,
  SoapResponse,
  ReadGuestLoginGuestIDStringRequest,
  UpdateGuestLoginRequest,
  DatasetGuestFromResponse,
  DatasetGuest
} = require('../lib')

const client = new Client({
  transport: null, // use default
  configuration: new Configuration({
    wsdl: 'wsdl',
    username: 'username',
    password: 'password',
    appName: 'appName',
    version: 'version'
  })
})

const doRequest = async () => {
  // Retrieve the dataset
  const xml = await client.send(new ReadGuestLoginGuestIDStringRequest('oldemailaddress@domain.com'))
  const dataset = DatasetGuestFromResponse(new SoapResponse(xml))

  // Modify the dataset
  const row = dataset.getRow('GUEST_LOGIN')
  row.modify('GuestLoginID', 'newemailaddress@domain.com')

  // Send the modified dataset to Guestware
  await client.send(new UpdateGuestLoginRequest(new DatasetGuest([row])))
}

doRequest()