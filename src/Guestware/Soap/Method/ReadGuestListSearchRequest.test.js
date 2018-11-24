import { ReadGuestListSearchRequest } from '../../../../lib/index.js'

describe('ReadGuestListSearchRequest', () => {

  test('.toString => returns XML with correctly formatted query', () => {
    const request = new ReadGuestListSearchRequest({
      start: '0',
      end: '1000',
      sortAsc: true,
      outCount: '1000',
      queryInputParameters: { CommValue: 'email@domain.com' }
    })
    expect(request.toString()).toMatchSnapshot()
  })

})