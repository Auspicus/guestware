import 'regenerator-runtime/runtime'
import { DOMParser } from 'xmldom'
import { DatasetGuestRowFromElement } from '../../../../lib/index.js'

describe('DatasetGuestRow', () => {

  test('.constructor => returns an object representation of XML node', () => {
    const testId = '1234567890'
    const parser = new DOMParser
    const node = parser.parseFromString(`<GUEST_LOGIN><GuestID>${testId}</GuestID></GUEST_LOGIN>`)
    const dataset = DatasetGuestRowFromElement([node.firstChild]).shift()
    expect(dataset.properties.GuestID).toEqual(testId)
  })

})