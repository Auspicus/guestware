class SoapRequest {

  xml: string

  constructor(xml: string) {
    this.xml = xml
  }

  toString(): string {
    return this.xml
  }

}

export default SoapRequest