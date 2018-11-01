class PropertyNotFound extends Error {

  constructor(property: string) {
    super(`PropertyNotFound: ${property}`)
  }

}

export default PropertyNotFound