/**
 * @param {GuestwareSoapClient} clientReference
 * @constructor
 */
function GuestwareAPIHelper(clientReference) {
  this.client = clientReference;
  this.update = this.client.update.bind(this.client);
  this.read = this.client.read.bind(this.client);
  this.formatResponse = this.client.formatResponse.bind(this.client);
}

/**
 * @param  {String} guestEmail
 * @return {Promise<Object>}
 */
GuestwareAPIHelper.prototype.getGuestInformationByEmail = function (guestEmail) {
  return this.read('ReadGuestLoginGuestIDString', { parstrGuestID: guestEmail })
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
 * @param  {Integer} guestID
 * @return {Promise<Object>}
 */
GuestwareAPIHelper.prototype.getGuestInformationByID = function (guestID) {
  return this.read('ReadGuestLogin', { parintGuestID: guestID })
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
 * @param  {Integer} guestID
 * @param  {String}  locationID (optional)
 * @return {Promise<Object>}
 */
GuestwareAPIHelper.prototype.getGuestVisits = function (guestID, locationID) {
  return this.read('ReadGuestVisit', {
    parintGuestID: guestID,
    parstrLocationID: locationID
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

/**
 * @param  {Array} details
 * @return {Promise<Object>}
 */
GuestwareAPIHelper.prototype.updateGuestDetails = function (details) {
  return this.update(
    'UpdateGuestDetailTables',
    'pardstGuestDetailTables',
    details
  );
}

/**
 * @param  {Integer} guestID
 * @return {Promise<Object>}
 */
GuestwareAPIHelper.prototype.getGuestDetails = function (guestID) {
  return this.read('ReadGuestDetailTables', {
    parintGuestID: guestID
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
 * @param  {Integer} guestID
 * @return {Promise<Object>}
 */
GuestwareAPIHelper.prototype.getGuestRewards = function (guestID) {
  return this.read('ReadGuestRewardTransactionAndDetailsByGuestID', {
    parintGuestID: guestID
  });
}

/**
 * @param  {Integer} guestID
 * @return {Promise<Object>}
 */
GuestwareAPIHelper.prototype.getGuestRewardBalance = function (guestID) {
  return this.read('ReadGuestRewardBalance', {
    parintGuestID: guestID
  });
}

module.exports = GuestwareAPIHelper;
