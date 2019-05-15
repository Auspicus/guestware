import { DOMParser } from 'xmldom';
import Client from './Client';
import DatasetGuest from './Soap/Dataset/DatasetGuest';
declare class Legacy {
    parser: DOMParser;
    client: Client;
    constructor(wsdl: string, appName: string, version: string, username: string, password: string, appId: string);
    read(method: any, args: any): Promise<string>;
    generateReadRequestBody(method: any, args: any): {
        raw: any[];
        string: string;
    };
    generateReadBody(method: any, args: any, body?: any): any;
    update(method: any, objectName: any, changeList: any): void;
    generateUpdateRequestBody(method: any, objectName: any, changeList: any): {
        raw: any[];
        string: string;
    };
    generateElement(elementType: any, elementUpdated: any, elementId: any, elementProperties: any): {
        newObject: any[];
        oldObject: any[];
    };
    getGuestInformationByID(id: string): Promise<{
        id: string;
        email?: string;
        password?: string;
        language?: string;
        logActivity?: string;
        disableLogin?: string;
        created?: string;
        createdBy?: string;
        updated?: string;
        updatedBy?: string;
    }>;
    getGuestInformationByEmail(email: string): Promise<{
        id: string;
        email?: string;
        password?: string;
        language?: string;
        logActivity?: string;
        disableLogin?: string;
        created?: string;
        createdBy?: string;
        updated?: string;
        updatedBy?: string;
    }>;
    getGuestDetails(id: string): Promise<{
        guest: any[];
        classes: any[];
        communications: any[];
        events: any[];
        ids: any[];
        addresses: any[];
        interests: any[];
        logins: any[];
    }>;
    getGuestVisits(guestID: string, locationID?: string): Promise<object[]>;
    getGuestRewards(guestID: string): Promise<{
        parsed: Document;
        raw: string;
    }>;
    getGuestRewardBalance(guestID: string): Promise<{
        parsed: Document;
        raw: string;
    }>;
    updateGuestDetails(details: {
        type: string;
        updated: boolean;
        properties: {
            [fieldName: string]: string;
        };
    }[]): Promise<{
        parsed: Document;
        raw: string;
    }>;
    detailMapToDataset(details: {
        type: string;
        updated: boolean;
        properties: {
            [fieldName: string]: string;
        };
    }[]): DatasetGuest;
    formatResponse(parsed: Document, options: {
        liTagName: string;
        map: {
            [name: string]: string;
        };
    }): any[];
}
export default Legacy;
