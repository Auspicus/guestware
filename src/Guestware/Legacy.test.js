jest.mock('node-fetch')

import fs from 'fs'
import path from 'path'
import { DOMParser } from 'xmldom'

import Legacy from '../../lib/index.js'
import { __setMockResponses } from 'node-fetch'

const readMockData = async (name) => await new Promise(resolve => {
  fs.readFile(path.join(__dirname, './__data__', name), 'utf8', (err, data) => {
    if (err)
      throw err
    else
      resolve(data)
  })
})

describe('Legacy', () => {

  const parser = new DOMParser()
  const legacy = new Legacy(
    'wsdl',
    'appName',
    'version',
    'appId',
    'username',
    'password'
  )

  test('.formatResponse => converts Node to object based on map', async () => {
    expect.assertions(1)
    const xml = await readMockData('ReadGuestLogin.xml')
    const doc = parser.parseFromString(xml)
    const options = {
      liTagName: 'GUEST_LOGIN',
      map: {
        id: 'GuestID',
        email: 'GuestLoginID',
        password: 'GuestLoginPassword'
      }
    }
    expect(legacy.formatResponse(doc, options)).toMatchSnapshot()
  })

  test('.detailMapToDataset => converts detail map array to Dataset', async () => {
    expect(legacy.detailMapToDataset([
      {
        type: 'GUEST',
        updated: true,
        properties: {
          GuestID: '1234567890',
          GivenName: 'Bob',
          Surname: 'Dylan',
        }
      },
      {
        type: 'GUEST_INTERESTS',
        updated: false,
        properties: {
          GuestID: '1234567890',
          Interest: 'Cookies',
        }
      },
    ])).toMatchSnapshot()
  })

  test('.getGuestInformationByID => returns mapped response', async () => {
    expect.assertions(1)
    __setMockResponses([
      { ok: true, text: async () => await readMockData('ReadGuestLogin.xml') }
    ])
    await expect(legacy.getGuestInformationByID('1234567890')).resolves.toMatchSnapshot()
  })

  test('.getGuestInformationByEmail => returns mapped response', async () => {
    expect.assertions(1)
    __setMockResponses([
      { ok: true, text: async () => await readMockData('ReadGuestLoginGuestIDString.xml') }
    ])
    await expect(legacy.getGuestInformationByEmail('email@domain.com')).resolves.toMatchSnapshot()
  })

})