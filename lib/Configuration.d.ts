declare class Configuration {
    wsdl: string;
    username: string;
    password: string;
    appName: string;
    version: string;
    appId: string;
    constructor({ wsdl, username, password, appName, version, appId }: {
        wsdl: any;
        username: any;
        password: any;
        appName: any;
        version: any;
        appId?: any;
    });
    apply(xmlBody: string): string;
    unapply(xmlBody: string): string;
}
export default Configuration;
