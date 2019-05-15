declare class SoapRequest {
    xml: string;
    constructor(xml: string);
    toString(): string;
    objectToQueryInputParameters(object: {
        [name: string]: string;
    }): string;
}
export default SoapRequest;
