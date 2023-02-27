const testPass = {
  passID: "WSI3219904",
  timestamp: "2018-12-31T23:33:00.000Z",
  stationRef: "KO01",
  vehicleRef: "ED51EWW52190",
  charge: 2.8,
  tagAbbr: "KO",
  home: "true",
};

const testPassesArray = [
  {
    passID: "TOB7336760",
    timestamp: "2017-04-12T23:37:00.000Z",
    stationRef: "OO12",
    vehicleRef: "AT19HLV57173",
    charge: 2.8,
    tagAbbr: "AO",
    home: "false",
  },
  {
    passID: "LDD7262109",
    timestamp: "2017-01-01T00:50:00.000Z",
    stationRef: "OO06",
    vehicleRef: "AT19HLV57173",
    charge: 2.8,
    tagAbbr: "AO",
    home: "false",
  },
  {
    passID: "NSR5538511",
    timestamp: "2017-01-01T03:23:00.000Z",
    stationRef: "AO07",
    vehicleRef: "DP11ENT03275",
    charge: 3.8,
    tagAbbr: "AO",
    home: "true",
  },
  {
    passID: "OSR5538549",
    timestamp: "2020-01-01T03:23:00.000Z",
    stationRef: "AO07",
    vehicleRef: "DP11ENT03275",
    charge: 3.1,
    tagAbbr: "EO",
    home: "false",
  },
  {
    passID: "QSR5538551",
    timestamp: "2015-01-01T03:23:00.000Z",
    stationRef: "AO07",
    vehicleRef: "GY11ENT03223",
    charge: 2.2,
    tagAbbr: "EO",
    home: "false",
  },
];

const testStation = {
  stationID: "AO10",
  stationProvider: "aodos",
  stationName: "aodos tolls station 10",
};

const testVehicle = {
  vehicleID: "PH87TIY76602",
  tagID: "KO69R5415",
  tagProvider: "kentriki_odos",
  providerAbbr: "KO",
  licenseYear: 2003,
};

const testStationArray = [
  {
    stationID: "AO00",
    stationProvider: "aodos",
    stationName: "aodos tolls station 00",
  },
  {
    stationID: "AO01",
    stationProvider: "aodos",
    stationName: "aodos tolls station 01",
  },
];

const testVehicleArray = [
  {
    vehicleID: "RV87TIY76692",
    tagID: "KO69R5975",
    tagProvider: "kentriki_odos",
    providerAbbr: "KO",
    licenseYear: 2001,
  },
  {
    vehicleID: "RR73DWB65452",
    tagID: "AO13W1028",
    tagProvider: "aodos",
    providerAbbr: "AO",
    licenseYear: 2017,
  },
];

const arrayOfStationIds = ["OO12", "OO06", "OO01"];

module.exports = {
  testPass,
  testPassesArray,
  testStationArray,
  testVehicleArray,
  arrayOfStationIds,
  testStation,
  testVehicle,
};
