import { Configuration, Client, SoapRequest, FailedRequest } from '../lib/index.js'

const mockFetch = (response) => jest.fn().mockImplementation(() => Promise.resolve(response))

describe('Client', () => {

  const configuration = new Configuration({
    wsdl: 'http://localhost:9000?wsdl',
    username: 'username',
    password: 'password',
    appName: 'appName',
    version: 'version'
  })

  test('.send => transport XML HTTP request', async () => {
    expect.assertions(1)
    const mockFn = mockFetch({
      ok: true,
      text: () => Promise.resolve('')
    })
    const client = new Client(mockFn, configuration);

    try {
      await client.send(new SoapRequest('<xml></xml>'))
    } catch (e) { throw e }
    
    expect(mockFn.mock.calls).toMatchSnapshot()
  })

  test('.send => return xml response on success', async () => {
    expect.assertions(1)
    const responseBody = '<xml>Response Body</xml>'
    const client = new Client(mockFetch({
      ok: true,
      text: () => Promise.resolve(responseBody)
    }), configuration);

    let response
    try {
      response = await client.send(new SoapRequest('<xml></xml>'))
    } catch (e) { throw e }
    
    expect(response).toEqual(responseBody)
  })

  test('.send => throw FailedRequest on error', async () => {
    expect.assertions(1)
    const client = new Client(mockFetch({
      ok: false,
      text: () => Promise.resolve('')
    }), configuration);

    expect(client.send(new SoapRequest('<xml></xml>'))).rejects.toThrow()
  })

})