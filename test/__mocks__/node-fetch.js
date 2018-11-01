const fetch = jest.fn().mockImplementation((_, opt) => {
  return Promise.resolve({
    ok: true,
    text: () => Promise.resolve(opt.body)
  })
})

export default fetch