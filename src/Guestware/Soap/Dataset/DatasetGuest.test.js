import fs from 'fs'
import path from 'path'
import { DatasetGuest, DatasetGuestRow, DiffgramRowAction, SoapResponse, DatasetGuestFromResponse } from '../../../../lib/index.js'

const readMockData = async (name) => await new Promise(resolve => {
  fs.readFile(path.join(__dirname, '../../__data__', name), 'utf8', (err, data) => {
    if (err)
      throw err
    else
      resolve(data)
  })
})

describe('DatasetGuest', () => {

  test('.serialize => returns XML representation', () => {
    const dataset = new DatasetGuest([
      new DatasetGuestRow('GUEST_LOGIN', DiffgramRowAction.Inserted, {
        GuestID: '1234567890',
        GuestLoginID: 'email@domain.com',
        GuestLoginPassword: 'password1',
      })
    ])
    expect(dataset.serialize()).toMatchSnapshot()
  })

  test('.serialize => respects row ID', () => {
    const dataset = new DatasetGuest([
      new DatasetGuestRow('GUEST_COMM_METHOD', DiffgramRowAction.Inserted, {
        GuestID: '1234567890',
        GuestLoginID: 'email@domain.com',
        GuestLoginPassword: 'password1',
      }),
      new DatasetGuestRow('GUEST_COMM_METHOD', DiffgramRowAction.Inserted, {
        GuestID: '1234567890',
        GuestLoginID: 'email@domain.com',
        GuestLoginPassword: 'password1',
      })
    ])
    expect(dataset.serialize()).toMatchSnapshot()
  })

  test('.fromResponse => returns DatasetGuest from SoapResponse', async () => {
    const data = await readMockData('UpdateGuestDetailTables.xml')
    const dataset = DatasetGuestFromResponse(new SoapResponse(data))
    expect(dataset.serialize()).toMatchSnapshot()
  })

  test('.getRow => returns first DatasetGuestRow with name', () => {
    const dataset = new DatasetGuest([
      new DatasetGuestRow('GUEST_LOGIN', DiffgramRowAction.Inserted, {
        GuestID: '1234567890',
        GuestLoginID: 'email@domain.com',
        GuestLoginPassword: 'password1',
      }),
      new DatasetGuestRow('GUEST_LOGIN', DiffgramRowAction.Inserted, {
        GuestID: '0987654321',
        GuestLoginID: 'email@domain.com',
        GuestLoginPassword: 'password1',
      })
    ])
    expect(dataset.getRow('GUEST_LOGIN').properties.GuestID).toEqual('1234567890')
  })


  test('.getRowN => returns n DatasetGuestRow with name', () => {
    const dataset = new DatasetGuest([
      new DatasetGuestRow('GUEST_LOGIN', DiffgramRowAction.Inserted, {
        GuestID: '1234567890',
        GuestLoginID: 'email@domain.com',
        GuestLoginPassword: 'password1',
      }),
      new DatasetGuestRow('GUEST_LOGIN', DiffgramRowAction.Inserted, {
        GuestID: '0987654321',
        GuestLoginID: 'email@domain.com',
        GuestLoginPassword: 'password1',
      })
    ])
    expect(dataset.getRowN('GUEST_LOGIN', 1).properties.GuestID).toEqual('0987654321')
  })

})