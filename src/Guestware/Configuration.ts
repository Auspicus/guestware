class Configuration {

  wsdl: string
  username: string
  password: string
  appName: string
  version: string

  constructor({
    wsdl,
    username,
    password,
    appName,
    version
  }) {
    this.wsdl = wsdl
    this.username = username
    this.password = password
    this.appName = appName
    this.version = version
  }

  apply(xmlBody: string) {
    xmlBody = xmlBody.replace(/{{UserName}}/g, this.username)
    xmlBody = xmlBody.replace(/{{PassWord}}/g, this.password)
    xmlBody = xmlBody.replace(/{{AppName}}/g, this.appName)
    xmlBody = xmlBody.replace(/{{Version}}/g, this.version)
    return xmlBody
  }

  unapply(xmlBody: string) {
    xmlBody = xmlBody.replace(this.username, `{{UserName}}`)
    xmlBody = xmlBody.replace(this.password, `{{PassWord}}`)
    xmlBody = xmlBody.replace(this.appName, `{{AppName}}`)
    xmlBody = xmlBody.replace(this.version, `{{Version}}`)
    return xmlBody
  }

}

export default Configuration