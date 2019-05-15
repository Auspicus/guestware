import 'regenerator-runtime/runtime'

import { SoapRequest } from '../../../lib/index.js'

describe('SoapRequest', () => {

  test('.toString => returns XML body', () => {
    expect(new SoapRequest('<xml></xml>').toString()).toMatchSnapshot()
  })

})