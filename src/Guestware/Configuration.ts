class Configuration {

  wsdl: string
  username: string
  password: string
  appName: string
  version: string
  appId: string

  constructor({
    wsdl,
    username,
    password,
    appName,
    version,
    appId = null
  }) {
    this.wsdl = wsdl
    this.username = username
    this.password = password
    this.appName = appName
    this.version = version
    this.appId = appId
  }

  apply(xmlBody: string) {
    return (
      xmlBody
      .replace(/{{UserName}}/g, this.username)
      .replace(/{{PassWord}}/g, this.password)
      .replace(/{{AppName}}/g, this.appName)
      .replace(/{{Version}}/g, this.version)
    )
  }

  unapply(xmlBody: string) {
    return (
      xmlBody
      .replace(this.username, `{{UserName}}`)
      .replace(this.password, `{{PassWord}}`)
      .replace(this.appName, `{{AppName}}`)
      .replace(this.version, `{{Version}}`)
    )
  }

}

export default Configuration