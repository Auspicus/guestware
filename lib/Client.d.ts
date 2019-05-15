import { Response, Request, RequestInit } from 'node-fetch';
import SoapRequest from './Soap/SoapRequest';
import Configuration from './Configuration';
declare class Client {
    transport: (url: string | Request, init?: RequestInit) => Promise<Response>;
    wsdl: string;
    configuration: Configuration;
    constructor(options: {
        transport: (url: string | Request, init?: RequestInit) => Promise<Response>;
        configuration: Configuration;
    });
    send(soapRequest: SoapRequest): Promise<string>;
}
export default Client;
