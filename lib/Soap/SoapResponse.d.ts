import { SelectedValue } from 'xpath';
declare enum ParserStrictness {
    Strict = 0,
    Flexible = 1
}
export { ParserStrictness };
declare class SoapResponse {
    xml: string;
    document: Document;
    constructor(xml: string);
    baseXPath(): string;
    baseXPathDiffgr(): string;
    defaultNamespaces(): {
        [name: string]: string;
    };
    queryFirst(xpathQuery: string, namespaces?: {
        [name: string]: string;
    }): SelectedValue;
    queryAll(xpathQuery: string, namespaces?: {
        [name: string]: string;
    }): Array<SelectedValue>;
    format(listItem: string, map: {
        [name: string]: string;
    }, strictness?: ParserStrictness): any[];
}
export default SoapResponse;
