/**
 * Create a new GuestwareAPIHelper
 * @param       {GuestwareSoapClient} clientReference a reference to the GuestwareSoapClient
 * @constructor
 */
function GuestwareAPIHelper(clientReference) {
  this.client = clientReference;
  this.update = this.client.update.bind(clientReference);
  this.read = this.client.read.bind(clientReference);
  this.formatResponse = this.client.formatResponse.bind(clientReference);
}

/**
 * Get a guests information
 * @param  {String} email guest's email
 * @return {Promise<Object>}
 */
GuestwareAPIHelper.prototype.getGuestByEmail = function (email) {
  return this.read('ReadGuestLoginGuestIDString', { parstrGuestID: email })
  .then(function (response) {
    return this.formatResponse(response.parsed, {
      $$liTagName: 'GUEST_LOGIN',
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
    })[0];
  }.bind(this))
  .catch(function (err) {
    console.log(err);
  });
}

/**
 * Get a guests information
 * @param  {Integer} id   guest's ID
 * @return {Promise<Object>}
 */
GuestwareAPIHelper.prototype.getGuestById = function (id) {
  return this.read('ReadGuestLogin', { parintGuestID: id })
  .then(function (response) {
    return this.formatResponse(response.parsed, {
      $$liTagName: 'GUEST_LOGIN',
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
    })[0];
  }.bind(this))
  .catch(function (err) {
    console.log(err);
  });
}

/**
 * Get a guests visit history
 * @param  {Integer} id           guest's ID
 * @param  {String}  locationId   location's ID
 * @return {Promise<Object>}
 */
GuestwareAPIHelper.prototype.getGuestVisits = function (id, locationId) {
  return this.read('ReadGuestVisit', {
    parintGuestID: id,
    parstrLocationID: locationId
  })
  .then(function (response) {
    return this.formatResponse(response.parsed, {
      $$liTagName: 'GUEST_VISIT',
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
    })
  }.bind(this))
  .catch(function (err) {
    console.log(err);
  });
}

GuestwareAPIHelper.prototype.updateGuestDetails = function (details) {
  return this.update('UpdateGuestDetailTables', 'pardstGuestDetailTables', details);
}

GuestwareAPIHelper.prototype.getGuestDetails = function (id) {
  return this.read('ReadGuestDetailTables', {
    parintGuestID: id
  })
  .then(function (response) {
    return {
      interests: this.formatResponse(response.parsed, {
        $$liTagName: 'GUEST_INTERESTS',
        id: 'GuestID',
        interest: 'Interest',
        commFormatType: 'CommFormatType',
        optOut: 'OptOut',
        created: 'EntryDate',
        createdBy: 'EntryBy',
        updated: 'LastEditDate',
        updatedBy: 'LastEditBy'
      }),
      logins: this.formatResponse(response.parsed, {
        $$liTagName: 'GUEST_LOGIN',
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
      })
    };
  }.bind(this));
}

/**
 * Get a guests reward history
 * @param  {Integer} id   guest's ID
 * @return {Promise<Object>}
 */
GuestwareAPIHelper.prototype.getGuestRewards = function (id) {
  return this.read('ReadGuestRewardTransactionAndDetailsByGuestID', {
    parintGuestID: id
  });
}

/**
 * Get a guests reward balance
 * @param  {Integer} id   guest's ID
 * @return {Promise<Object>}
 */
GuestwareAPIHelper.prototype.getGuestRewardBalance = function (id) {
  return this.read('ReadGuestRewardBalance', { parintGuestID: id });
}

module.exports = GuestwareAPIHelper;