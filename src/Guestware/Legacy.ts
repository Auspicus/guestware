import fetch from 'node-fetch'
import { DOMParser } from 'xmldom'
import { useNamespaces as XPathSelectWithNamespaces } from 'xpath'

import Client from './Client'
import Configuration from './Configuration'

import ReadGuestLoginRequest from './Soap/Method/ReadGuestLoginRequest'
import ReadGuestLoginGuestIDStringRequest from './Soap/Method/ReadGuestLoginGuestIDStringRequest'
import ReadGuestVisitRequest from './Soap/Method/ReadGuestVisitRequest'
import ReadGuestDetailTablesRequest from './Soap/Method/ReadGuestDetailTablesRequest'
import ReadGuestRewardTransactionAndDetailsByGuestIDRequest from './Soap/Method/ReadGuestRewardTransactionAndDetailsByGuestIDRequest'
import ReadGuestRewardBalanceRequest from './Soap/Method/ReadGuestRewardBalanceRequest'

import DatasetGuest from './Soap/Dataset/DatasetGuest'
import DatasetGuestRow from './Soap/Dataset/DatasetGuestRow'
import DiffgramRowAction from './Soap/DiffgramRowAction'
import UpdateGuestDetailTablesRequest from './Soap/Method/UpdateGuestDetailTablesRequest'

class Legacy {
  
  parser: DOMParser
  client: Client

  constructor(
    wsdl: string,
    appName: string,
    version: string,
    appId: string,
    username: string,
    password: string
  ) {
    const configuration = new Configuration({
      wsdl,
      appName,
      version,
      username,
      password
    })
    this.parser = new DOMParser()
    this.client = new Client({
      transport: fetch,
      configuration,
    })
  }

  async getGuestInformationByID(id: string): Promise<{
    id: string
    email?: string
    password?: string
    language?: string
    logActivity?: string
    disableLogin?: string
    created?: string
    createdBy?: string
    updated?: string
    updatedBy?: string
  }> {
    const xmlResponse = await this.client.send(new ReadGuestLoginRequest(id))
    return (
      this.formatResponse(this.parser.parseFromString(xmlResponse), {
        liTagName: 'GUEST_LOGIN',
        map: {
          id: 'GuestID',
          email: 'GuestLoginID',
          password: 'GuestLoginPassword',
          language: 'CultureID',
          logActivity: 'LogActivity',
          disableLogin: 'DisableLogin',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      }).shift()
    )
  }

  async getGuestInformationByEmail(email: string): Promise<{
    id: string
    email?: string
    password?: string
    language?: string
    logActivity?: string
    disableLogin?: string
    created?: string
    createdBy?: string
    updated?: string
    updatedBy?: string
  }> {
    const xmlResponse = await this.client.send(new ReadGuestLoginGuestIDStringRequest(email))
    return (
      this.formatResponse(this.parser.parseFromString(xmlResponse), {
        liTagName: 'GUEST_LOGIN',
        map: {
          id: 'GuestID',
          email: 'GuestLoginID',
          password: 'GuestLoginPassword',
          language: 'CultureID',
          logActivity: 'LogActivity',
          disableLogin: 'DisableLogin',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      }).shift()
    )
  }

  async getGuestDetails(id: string) {
    const xmlResponse = await this.client.send(new ReadGuestDetailTablesRequest(id))
    const parsed = this.parser.parseFromString(xmlResponse)
    return ({
      guest: this.formatResponse(parsed, {
        liTagName: 'GUEST',
        map: {
          id: 'GuestID',
          program: 'GstRecordType',
          type: 'ProfileType',
          source: 'Source',
          first_name: 'GivenName',
          last_name: 'Surname',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      }),
      classes: this.formatResponse(parsed, {
        liTagName: 'GUEST_CLASS',
        map: {
          id: 'GuestID',
          classId: 'GuestClassID',
          className: 'ClassName',
          classReason: 'ClassReason',
          location: 'LocationID',
          start: 'StartDate',
          end: 'EndDate',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      }),
      communications: this.formatResponse(parsed, {
        liTagName: 'GUEST_COMM_METHOD',
        map: {
          id: 'GuestID',
          type: 'GuestCommType',
          value: 'CommValue',
          format: 'FormatType',
          optOut: 'OptOut',
          preferred: 'PreferredFlag',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      }),
      events: this.formatResponse(parsed, {
        liTagName: 'GUEST_EVENT',
        map: {
          id: 'GuestID',
          type: 'GuestEventType',
          order: 'DisplayOrder'
        }
      }),
      ids: this.formatResponse(parsed, {
        liTagName: 'GUEST_ISSUED_ID',
        map: {
          id: 'GuestID',
          logNumber: 'IssueLogNo',
          contactType: 'ContactType',
          associateName: 'AssociateName',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      }),
      addresses: this.formatResponse(parsed, {
        liTagName: 'GUEST_ADDRESS',
        map: {
          id: 'GuestID',
          type: 'AddressType',
          string: 'CompleteAddress',
          country: 'CountryCode',
          postal: 'PostalCode',
          state: 'StateCode',
          city: 'City',
          address1: 'AddressLine1',
          address2: 'AddressLine2',
          undeliverable: 'Undeliverable',
          preferred: 'PreferredFlag',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      }),
      interests: this.formatResponse(parsed, {
        liTagName: 'GUEST_INTERESTS',
        map: {
          id: 'GuestID',
          interest: 'Interest',
          commFormatType: 'CommFormatType',
          optOut: 'OptOut',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      }),
      logins: this.formatResponse(parsed, {
        liTagName: 'GUEST_LOGIN',
        map: {
          id: 'GuestID',
          email: 'GuestLoginID',
          password: 'GuestLoginPassword',
          language: 'CultureID',
          logActivity: 'LogActivity',
          disableLogin: 'DisableLogin',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      })
    })
  }

  async getGuestVisits(guestID: string, locationID?: string): Promise<object[]> {
    const xmlResponse = await this.client.send(new ReadGuestVisitRequest(guestID, locationID))
    return (
      this.formatResponse(this.parser.parseFromString(xmlResponse), {
        liTagName: 'GUEST_VISIT',
        map: {
          id: 'VisitLogNo',
          confirmation: 'ConfirmationNo',
          location: 'LocationID',
          status: 'VisitStatus',
          arrival: 'ArrivalDate',
          departure: 'DepartureDate',
          reservationDate: 'ReservationDate',
          reservationSource: 'ReservationSource',
          roomNumber: 'RoomNo',
          roomType: 'RoomType',
          roomRate: 'RoomRate',
          revenueRoom: 'VisitRoomRevenue',
          revenueFb: 'VisitFBRevenue',
          revenueMisc: 'VisitMiscRevenue',
          revenueUserDef1: 'UserDefRevenue1',
          revenueUserDef2: 'UserDefRevenue2',
          currency: 'CurrencyCode',
          marketCode: 'MarketCode',
          note: 'VisitNote',
          numberOfVisits: 'NumberOfVisits',
          numberOfNights: 'NumberOfNights',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy',
          folioId: 'FolioID',
          visitRecordType: 'VisitRecordType'
        }
      })
    )
  }

  async getGuestRewards(guestID: string) {
    const xmlResponse = await this.client.send(new ReadGuestRewardTransactionAndDetailsByGuestIDRequest(guestID))

    return {
      parsed: this.parser.parseFromString(xmlResponse),
      raw: xmlResponse
    }
  }

  async getGuestRewardBalance(guestID: string) {
    const xmlResponse = await this.client.send(new ReadGuestRewardBalanceRequest(guestID))

    return {
      parsed: this.parser.parseFromString(xmlResponse),
      raw: xmlResponse
    }
  }

  async updateGuestDetails(details: {
    type: string,
    updated: boolean,
    properties: { [fieldName: string]: string }
  }[]): Promise<{ parsed: Document, raw: string }> {
    const dataset = this.detailMapToDataset(details)
    const xmlResponse = await this.client.send(new UpdateGuestDetailTablesRequest(dataset))

    return {
      parsed: this.parser.parseFromString(xmlResponse),
      raw: xmlResponse
    }
  }

  detailMapToDataset(details: {
    type: string,
    updated: boolean,
    properties: { [fieldName: string]: string }
  }[]): DatasetGuest {
    return new DatasetGuest(details.map(detail => {
      return new DatasetGuestRow(
        detail.type,
        detail.updated ? DiffgramRowAction.Modified : DiffgramRowAction.Inserted,
        detail.properties
      )
    }))
  }

  formatResponse(parsed: Document, options: {
    liTagName: string,
    map: { [name: string]: string }
  }) {
    const { liTagName, map } = options
    const result = []
    const XPathSelect = XPathSelectWithNamespaces({ dstGST: 'http://webservices.guestware.com/dstGST.xsd' })
    XPathSelect(`//dstGST:${liTagName}`, parsed).forEach(node => {
      const item = {}
      Object.keys(map).forEach(key => {
        item[key] = XPathSelect(`dstGST:${map[key]}/text()`, <Node> node, true).toString()
      })
      result.push(item)
    })
    return result
  }

}

export default Legacy