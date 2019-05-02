let mockResponses
const __setMockResponses = (responses) => mockResponses = responses
export { __setMockResponses }

const fetch = async () => Promise.resolve(mockResponses.shift())
export default fetch