import fs from 'fs'
import path from 'path'
import { Configuration, Client, ReadGuestLoginRequest, ReadGuestLoginGuestIDStringRequest, SoapResponse } from '../lib/index.js'

const readMockData = async (name) => await new Promise(resolve => {
  fs.readFile(path.join(__dirname, './__data__', name), 'utf8', (err, data) => {
    if (err)
      throw err
    else
      resolve(data)
  })
})
const mockFetch = (response) => jest.fn().mockImplementation(() => Promise.resolve(response))

describe('SoapResponse', () => {

  const configuration = new Configuration({
    wsdl: 'http://localhost:9000?wsdl',
    username: 'username',
    password: 'password',
    appName: 'appName',
    version: 'version'
  })

  test('.queryAll => should return a list of DOM nodes', async () => {
    expect.assertions(1)
    const mockFn = mockFetch({
      ok: true,
      text: () => readMockData('ReadGuestLogin.xml')
    })
    const client = new Client(mockFn, configuration);

    let soapResponse
    try {
      let xmlResponse = await client.send(new ReadGuestLoginRequest('1234567890'))
      soapResponse = new SoapResponse(xmlResponse)
    } catch (e) { throw e }

    const queryResult = soapResponse.queryAll(`${soapResponse.baseXPathDiffgr()}/dstGST:dstGST/dstGST:GUEST_LOGIN`)
    expect(queryResult.toString()).toMatchSnapshot()
  })

  test('.queryFirst => should return the first DOM node match', async () => {
    expect.assertions(1)
    const mockFn = mockFetch({
      ok: true,
      text: () => readMockData('ReadGuestLoginGuestIDString.xml')
    })
    const client = new Client(mockFn, configuration);

    let soapResponse
    try {
      let xmlResponse = await client.send(new ReadGuestLoginGuestIDStringRequest('email@domain.com'))
      soapResponse = new SoapResponse(xmlResponse)
    } catch (e) { throw e }

    const queryResult = soapResponse.queryFirst(`${soapResponse.baseXPathDiffgr()}/dstGST:dstGST/dstGST:GUEST_LOGIN`)
    expect(queryResult.toString()).toMatchSnapshot()
  })

})