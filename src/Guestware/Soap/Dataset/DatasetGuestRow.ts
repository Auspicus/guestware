import DiffgramRowAction from '../DiffgramRowAction'

class DatasetGuestRow {

  name: string
  diff: DiffgramRowAction
  properties: { [fieldName: string]: string }

  constructor(name: string, diff: DiffgramRowAction, properties: { [fieldName: string]: string }) {
    this.name = name
    this.diff = diff
    this.properties = properties
  }

  serialize(rowId: number): { before: string, current: string } {
    const xmlProperties = Object
      .keys(this.properties)
      .map(propertyName => `<${propertyName}>${this.properties[propertyName]}</${propertyName}>`)
      .join('')
    return { before: this.diff === DiffgramRowAction.Modified ? `
      <${this.name}
        diffgr:id="${this.name}${rowId + 1}"
        xmlns="http://webservices.guestware.com/dstGST.xsd"
        msdata:rowOrder="${rowId}">
        ${xmlProperties}
      </${this.name}>
    ` : ``, current: `
      <${this.name} diffgr:id="${this.name}${rowId + 1}" msdata:rowOrder="${rowId}" diffgr:hasChanges="${this.diff}">
        ${xmlProperties}
      </${this.name}>
    ` }
  }

}

const fromElements = (elements: Element[]): DatasetGuestRow[] => {
  return elements.map(element => {
    return new DatasetGuestRow(
      element.nodeName,
      DiffgramRowAction.NotSet,
      Object
      .keys(element.childNodes)
      .map(key => element.childNodes[key])
      .filter(child => child.nodeName && child.nodeName !== '#text')
      .reduce((a, child) => child ? Object.assign(a, { [child.nodeName]: `${child.firstChild}` }) : a, {})
    )
  })
}
export { fromElements }

export default DatasetGuestRow