import DiffgramRowAction from '../DiffgramRowAction'

class DatasetGuestRow {

  name: string
  diff: DiffgramRowAction
  properties: { [fieldName: string]: string }
  updatedProperties: { [fieldName: string]: string }

  constructor(name: string, diff: DiffgramRowAction, properties: { [fieldName: string]: string }) {
    this.name = name
    this.diff = diff
    this.properties = properties
    this.updatedProperties = {}
  }

  serialize(rowId: number): { before: string, current: string } {
    const serializeProperties = obj => (
      Object
      .keys(obj)
      .map(propertyName => `<${propertyName}>${obj[propertyName]}</${propertyName}>`)
      .join('')
    )
    const oldProperties = serializeProperties(this.properties)
    const newProperties = serializeProperties({ ...this.properties, ...this.updatedProperties })

    const includeInBefore = (
      this.diff === DiffgramRowAction.Modified
      || this.diff === DiffgramRowAction.Deleted
    )
    const includeInCurrent = this.diff !== DiffgramRowAction.Deleted

    const diffgrHasChanges = this.diff === DiffgramRowAction.NotSet
      ? ``
      : ` diffgr:hasChanges="${this.diff}"`
    
    return {
      before: includeInBefore ? `
        <${this.name}
          diffgr:id="${this.name}${rowId + 1}"
          xmlns="http://webservices.guestware.com/dstGST.xsd"
          msdata:rowOrder="${rowId}">
          ${oldProperties}
        </${this.name}>
      ` : ``,
      current: includeInCurrent ? `
        <${this.name}
          diffgr:id="${this.name}${rowId + 1}" 
          xmlns="http://webservices.guestware.com/dstGST.xsd"
          msdata:rowOrder="${rowId}"${diffgrHasChanges}>
          ${newProperties}
        </${this.name}>
      ` : ``
    }
  }

  values() {
    return { ...this.properties, ...this.updatedProperties }
  }

  modify(name: string, value: string) {
    this.diff = DiffgramRowAction.Modified
    this.updatedProperties[name] = value
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
      .reduce((a, child) => child ? Object.assign(a, { [child.nodeName]: `${child.firstChild || ''}` }) : a, {})
    )
  })
}
export { fromElements }

export default DatasetGuestRow