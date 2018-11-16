class SoapRequest {

  xml: string

  constructor(xml: string) {
    this.xml = xml
  }

  toString(): string {
    return this.xml
  }

  objectToQueryInputParameters(object: { [name: string]: string }): string {
    const parts = []
    Object.keys(object).forEach((key, i) => {
      parts.push(`
        <virtual_QueryInputParameters diffgr:id="virtual_QueryInputParameters${i + 1}" msdata:rowOrder="${i}" diffgr:hasChanges="inserted">
          <FieldName>${key}</FieldName>
          <FieldValue>${object[key]}</FieldValue>
        </virtual_QueryInputParameters>`
      )
    })
    return parts.join('')
  }

}

export default SoapRequest