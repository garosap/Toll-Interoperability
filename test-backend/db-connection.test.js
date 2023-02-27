const mongoose = require("mongoose");
const Pass = require("../src/models/Pass");
const Station = require("../src/models/Station");
const Vehicle = require("../src/models/Vehicle");
const moment = require("moment");
const app = require("../src/app");

const {
  testPass,
  testPassesArray,
  testStationArray,
  testVehicleArray,
  arrayOfStationIds,
  testVehicle,
  testStation,
} = require("../../test-backend/testingObjects");

describe("Backend Testing", () => {
  beforeAll(async () => {
    // A connection to a test database is created.
    connection = mongoose.createConnection(process.env.MONGODB_URL);
    db = mongoose.connection;
  });

  afterAll(async () => {
    await db.dropDatabase();
    await db.close();
    await connection.close();
  });


  // -------- Testing for "passes" collection --------------------------------------------------------

  // #Passes_test_1 Add a single pass to the "passes" collection (CREATE)
  test("Single pass added", async () => {
    const response = await new Pass(testPass);
    await response.save();
    expect(response.passID).toBe("WSI3219904");
  });

  // #Passes_test_2 Failed to add a single pass that already exists to the "passes" collection (Validating data duplication)
  test("Duplicate pass NOT added", async () => {
    let errorThrown = false;
    try {
      const response = await new Pass(testPass);
      await response.save();
    } catch (e) {
      errorThrown = true;
    }
    expect(errorThrown).toBeTruthy();
  });

  // #Passes_test_3 Search a single pass by id from the "passes" collection  (READ)
  test("Single pass found by id", async () => {
    const passID = "WSI3219904";
    const pass = await Pass.findOne({ passID: passID });
    expect(pass.passID).toBe("WSI3219904");
    expect(pass.stationRef).toBe("KO01");
    expect(pass.vehicleRef).toBe("ED51EWW52190");
  });

  // #Passes_test_4 Search a single pass by id that DOES NOT exist from the "passes" collection (READ)
  test("Single pass not found (non-existent id)", async () => {
    const passID = "1234567890";
    const pass = await Pass.findOne({ passID: passID });
    expect(pass).toBeNull();
  });

  // #Passes_test_5 Update some value in a document (UPDATE)
  test("Update pass", async () => {
    const response = await Pass.updateOne(
      { passID: "WSI3219904" },
      { charge: 2.9 }
    );
    expect(response.acknowledged).toBeTruthy();
  });

  // #Passes_test_6 Check the update was successful
  test("Pass update is correct", async () => {
    const responseTwo = await Pass.findOne({
      passID: "WSI3219904",
    });
    expect(responseTwo.charge).toBe(2.9);
  });

  // #Passes_test_7 Delete a single pass by id from the "passes" collection (DELETE)
  test("Single pass deleted", async () => {
    const response = await Pass.deleteOne({ passID: "WSI3219904" });
    expect(response.deletedCount).toBe(1);
  });

  // #Passes_test_8 Add an array of passes to the "passes" collection (CREATE)
  test("Many passes added", async () => {
    const response = await Pass.insertMany(testPassesArray);
    expect(response.length).toBe(5);
  });

  // #Passes_test_9 Filter passes whose stationRef is included in an array of stationIDs,
  // their home == false and have occured between to dates
  test("Filter passes by stationRef and home and timestamps ", async () => {
    const response = await Pass.find({
      stationRef: { $in: arrayOfStationIds },
      home: { $eq: "false" },
      $and: [
        { timestamp: { $gte: moment("20170101") } },
        { timestamp: { $lte: moment("20180101") } },
      ],
    });
    expect(response.length).toBe(2);
  });

  // -------- Testing for "vehicles" collection --------------------------------------------------------

  // #Vehicles_test_1 Add a single pass to the "vehicles" collection (CREATE)
  test("Single vehicle added", async () => {
    const response = await new Vehicle(testVehicle);
    await response.save();
    expect(response.tagID).toBe("KO69R5415");
  });

  // #Vehicles_test_2 Failed to add a single pass that already exists to the "vehicles" collection (Validating data duplication)
  test("Duplicate vehicle NOT added", async () => {
    let errorThrown = false;
    try {
      const response = await new Vehicle(testVehicle);
      await response.save();
    } catch (e) {
      errorThrown = true;
    }
    expect(errorThrown).toBeTruthy();
  });

  // #Vehicles_test_3 Search a single pass by id from the "vehicles" collection  (READ)
  test("Single vehicle found by id", async () => {
    const vehicleID = "PH87TIY76602";
    const vehicle = await Vehicle.findOne({ vehicleID: vehicleID });
    expect(vehicle.vehicleID).toBe("PH87TIY76602");
    expect(vehicle.tagID).toBe("KO69R5415");
    expect(vehicle.tagProvider).toBe("kentriki_odos");
  });

  // #Vehicles_test_4 Search a single pass by id that DOES NOT exist from the "vehicles" collection (READ)
  test("Single vehicle not found (non-existent id)", async () => {
    const vehicleID = "OH273IY06602";
    const vehicle = await Vehicle.findOne({ vehicleID: vehicleID });
    expect(vehicle).toBeNull();
  });

  // #Vehicles_test_5 Update some value in a document (UPDATE)
  test("Update vehicle", async () => {
    const response = await Vehicle.updateOne(
      { vehicleID: "PH87TIY76602" },
      { licenseYear: 2000 }
    );
    expect(response.acknowledged).toBeTruthy();
  });

  // #Vehicles_test_6 Check the update was successful
  test("Vehicle update is correct", async () => {
    const responseTwo = await Vehicle.findOne({
      vehicleID: "PH87TIY76602",
    });
    expect(responseTwo.licenseYear).toBe(2000);
  });

  // #Vehicles_test_7 Delete a single pass by id from the "vehicles" collection (DELETE)
  test("Single vehicle deleted", async () => {
    const response = await Vehicle.deleteOne({ vehicleID: "PH87TIY76602" });
    expect(response.deletedCount).toBe(1);
  });

  // #Vehicles_test_8 Add an array of Vehicles to the "vehicles" collection (CREATE)
  test("Many vehicles added", async () => {
    const response = await Vehicle.insertMany(testVehicleArray);
    expect(response.length).toBe(2);
  });

  // // -------- Testing for "stations" collection --------------------------------------------------------

  // #Stations_test_1 Add a single station to the "stations" collection (CREATE)
  test("Single station added", async () => {
    const response = await new Station(testStation);
    await response.save();
    expect(response.stationID).toBe("AO10");
  });

  // #Stations_test_2 Failed to add a single station that already exists to the "stations" collection (Validating data duplication)
  test("Duplicate station NOT added", async () => {
    let errorThrown = false;
    try {
      const response = await new Station(testStation);
      await response.save();
    } catch (e) {
      errorThrown = true;
    }
    expect(errorThrown).toBeTruthy();
  });

  // #Stations_test_3 Search a single station by id from the "stations" collection  (READ)
  test("Single station found by id", async () => {
    const StationId = "AO10";
    const station = await Station.findOne({ StationId: StationId });
    expect(station.stationID).toBe("AO10");
    expect(station.stationProvider).toBe("aodos");
    expect(station.stationName).toBe("aodos tolls station 10");
  });

  // #Stations_test_4 Search a single station by id that DOES NOT exist from the "stations" collection (READ)
  test("Single station not found (non-existent id)", async () => {
    const stationID = "AO10123";
    const station = await Station.findOne({ stationID: stationID });
    expect(station).toBeNull();
  });

  // #Stations_test_5 Update some value in a document (UPDATE)
  test("Update station", async () => {
    const response = await Station.updateOne(
      { stationID: "AO10" },
      { stationName: "aodos tolls new station 10" }
    );
    expect(response.acknowledged).toBeTruthy();
  });

  // #Stations_test_6 Check the update was successful
  test("Station update is correct", async () => {
    const responseTwo = await Station.findOne({
      stationID: "AO10",
    });
    expect(responseTwo.stationName).toBe("aodos tolls new station 10");
  });

  // #Stations_test_7 Delete a single station by id from the "stations" collection (DELETE)
  test("Single station deleted", async () => {
    const response = await Station.deleteOne({ stationID: "AO10" });
    expect(response.deletedCount).toBe(1);
  });

  // #Stations_test_8 Add an array of stations to the "stations" collection (CREATE)
  test("Many stations added", async () => {
    const response = await Station.insertMany(testStationArray);
    expect(response.length).toBe(2);
  });
});
