const app = require("../src/app");
const request = require("supertest");
const mongoose = require("mongoose");

describe("API Testing", () => {
    beforeAll(async () => {
        jest.setTimeout(5 * 1000);
        // A connection to a test database is created.
        connection =  mongoose.createConnection(process.env.MONGODB_URL);
        db = mongoose.connection;
    });

    afterAll(async () => {
        await db.dropDatabase();
        await db.close();
        await connection.close();
        //we reset the timeout value in the default value
        jest.setTimeout(5 * 1000);
    });

    // -------- Testing for "healthcheck endpoint" --------------------------------------------------------
    describe("Testing 'admin/healthcheck'", () => {
        it("should succeed if the database is connected", async () => {
            const response = await request(app).get(
                "/interoperability/api/admin/healthcheck"
            );
            expect(response.status).toBe(200);
        });
    });

    // -------- Testing for "resetpasses endpoint" --------------------------------------------------------
    describe("Testing 'admin/resetpasses'", () => {
        it("should succeed if Passes collection is emptied", async () => {
            const response = await request(app).post(
                "/interoperability/api/admin/resetpasses"
            );
            expect(response.status).toBe(200);
        });
    });

    // -------- Testing for "passesupd endpoint" --------------------------------------------------------
    describe("Testing 'admin/passesupd'", () => {
        jest.setTimeout(100000);
        it("should fail because of wrong file type (.csv)", async () => {
            const response = await request(app)
                .post("/interoperability/api/admin/passesupd")
                .query({
                    filepath: "../passesTesting.pdf",
                });
            expect(response.status).toBe(400);
        });

        it("should fail because of missing file", async () => {
            const response = await request(app)
                .post("/interoperability/api/admin/passesupd")
                .query({
                    filepath: "../NonExistentFile.csv",
                });
            expect(response.status).toBe(500);
        });

        it("should succeed if passes should be added Passes collection", async () => {
            const response = await request(app)
                .post("/interoperability/api/admin/passesupd")
                .query({
                    filepath: "./passes.csv",
                });
            expect(response.status).toBe(200);
        });
    });

    // -------- Testing for "resetvehicles endpoint" --------------------------------------------------------
    describe("Testing 'admin/resetvehicles'", () => {
        it("should succeed if Vehicles collection is reset", async () => {
            const response = await request(app).post(
                "/interoperability/api/admin/resetvehicles"
            );
            expect(response.status).toBe(200)
        });
    });

    // -------- Testing for "resetstations endpoint" --------------------------------------------------------
    describe("Testing 'admin/resetstations'", () => {
        it("should succeed if Stations collection is reset", async () => {
            const response = await request(app).post(
                "/interoperability/api/admin/resetstations"
            );
            expect(response.status).toBe(200)
        });
    });

    // -------- Testing for "PassesPerStation endpoint" --------------------------------------------------------
    describe("Testing 'PassesPerStation'", () => {
        it("should return a specific number of of passes for a specific station", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/PassesPerStation/KO01/20190101/20190110"
                )
                .query({
                    format: "json",
                });
            expect(response.body.NumberOfPasses).toBe(7);
        });
    });

    describe("Testing 'PassesPerStation'", () => {
        it("should succeed  if the returned array is sorted", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/PassesPerStation/KO01/20190101/20290312"
                )
                .query({
                    format: "json",
                });
            let result = 1;
            for (let i = 0; i < response.body.PassesList.length - 1; i++) {
                if (
                    new Date(response.body.PassesList[i].PassTimeStamp) >
                    new Date(response.body.PassesList[i + 1].PassTimeStamp)
                )
                    result = 0;
            }
            expect(result).toBe(1);
        });
    });

    describe("Testing 'PassesPerStation'", () => {
        it("should fail because date_to is earlier than date_from", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/PassesPerStation/KO01/20200110/20190101"
                )
                .query({
                    format: "json",
                });
            expect(response.status).toBe(400);
        });
    });

    describe("Testing 'PassesPerStation'", () => {
        it("should fail because of invalid operator abbreviation", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/PassesPerStation/ggdsgkvghjk/20190110/20190201"
                )
                .query({
                    format: "json",
                });
            expect(response.status).toBe(400);
        });
    });

    describe("Testing 'PassesPerStation'", () => {
        it("should fail because of invalid format", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/PassesPerStation/KO01/20200110/20190401"
                )
                .query({
                    format: "cghfcg",
                });
            expect(response.status).toBe(400);
        });
    });

    // -------- Testing for "PassesAnalysis endpoint" --------------------------------------------------------
    describe("Testing 'PassesAnalysis'", () => {
        it("should return 10 passes", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/PassesAnalysis/aodos/kentriki_odos/20211005/20211110"
                )
                .query({
                    format: "json",
                });
            expect(response.body.NumberOfPasses).toBe(10);
        });
    });

    describe("Testing 'PassesAnalysis'", () => {
        it("should succeed if the returned array is sorted", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/PassesAnalysis/aodos/kentriki_odos/20211005/20211110"
                )
                .query({
                    format: "json",
                });
            let result = 1;
            for (let i = 0; i < response.body.PassesList.length - 1; i++) {
                if (
                    new Date(response.body.PassesList[i].PassTimeStamp) >
                    new Date(response.body.PassesList[i + 1].PassTimeStamp)
                )
                    result = 0;
            }
            expect(result).toBe(1);
        });
    });

    describe("Testing 'PassesAnalysis'", () => {
        it("should fail because date_to is earlier than date_from", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/PassesAnalysis/aodos/kentriki_odos/20261005/20211005"
                )
                .query({
                    format: "csv",
                });
            expect(response.body).toEqual({});
        });
    });

    describe("Testing 'PassesAnalysis'", () => {
        it("should fail because of wrong input", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/PassesAnalysis/sadf/kentrifdsfski_odos/fdsfd/2021fdsfds1005"
                )
                .query({
                    format: "fdsfdfs",
                });
            expect(response.status).toBe(400);
        });
    });

    // -------- Testing for "PassesCost endpoint" --------------------------------------------------------
    describe("Testing 'PassesCost'", () => {
        it("should return PassesCost value of 28", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/PassesCost/aodos/gefyra/20211001/20211031"
                )
                .query({
                    format: "json",
                });
            expect(response.body.PassesCost).toEqual(28);
        });
    });

    describe("Testing 'PassesCost'", () => {
        it("should fail because of wrong input", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/PassesCost/fd/fsdfds/fdsfdsfd/fdsfdsfdsfds"
                )
                .query({
                    format: "dsfsfasdsfs",
                });
            expect(response.status).toBe(400);
        });
    });

    describe("Testing 'PassesCost'", () => {
        it("should fail because date_to is earlier than date_from", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/PassesCost/aodos/gefyra/20291005/20211110"
                )
                .query({
                    format: "json",
                });
            expect(response.status).toBe(400);
        });
    });

    // -------- Testing for "ChargesBy endpoint" --------------------------------------------------------
    describe("Testing 'ChargesBy'", () => {
        it("should return more than one charges", async () => {
            const response = await request(app)
                .get("/interoperability/api/ChargesBy/aodos/20211005/20211110")
                .query({
                    format: "json",
                });
            expect(response.body.PPOList.length).toBeGreaterThan(1);
        });
    });

    describe("Testing 'ChargesBy'", () => {
        it("should fail because date_to is earlier than date_from", async () => {
            const response = await request(app)
                .get("/interoperability/api/ChargesBy/aodos/20291005/20211110")
                .query({
                    format: "json",
                });
            expect(response.status).toBe(400);
        });
    });

    describe("Testing 'ChargesBy'", () => {
        it("should fail because of invalid operator", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/ChargesBy/aodos12345/20211005/20211110"
                )
                .query({
                    format: "json",
                });
            expect(response.status).toBe(400);
        });
    });

    describe("Testing 'ChargesBy'", () => {
        it("should fail because of wrong input", async () => {
            const response = await request(app)
                .get("/interoperability/api/ChargesBy/aod/fsdfsdf/20211110")
                .query({
                    format: "fdaslkfasd",
                });
            expect(response.status).toBe(400);
        });
    });

    describe("Testing 'ChargesBy'", () => {
        it("should return a list with length 6", async () => {
            const response = await request(app)
                .get("/interoperability/api/ChargesBy/aodos/20211005/20211110")
                .query({
                    format: "json",
                });
            expect(response.body.PPOList.length).toBe(6);
        });
    });

    // -------- Testing for "OperatorBalances endpoint" --------------------------------------------------------
    describe("Testing 'OperatorBalances'", () => {
        it("should fail because date_to is earlier than date_from", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/OperatorBalances/aodos/20191005/20171110"
                )
                .query({
                    format: "json",
                });
            expect(response.status).toBe(400);
        });
    });

    describe("Testing 'OperatorBalances'", () => {
        it("should fail because of invalid operator", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/OperatorBalances/aodos12345/20211005/20211110"
                )
                .query({
                    format: "json",
                });
            expect(response.status).toBe(400);
        });
    });

    describe("Testing 'OperatorBalances'", () => {
        it("should fail because of wrong input", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/OperatorBalances/aod/fsdfsdf/20211110"
                )
                .query({
                    format: "fdaslkfasd",
                });
            expect(response.status).toBe(400);
        });
    });

    describe("Testing 'OperatorBalances'", () => {
        it("should return a Balances array with specific values", async () => {
            let correctResult = [
                { abbr: "EG", balance: 15.2 },
                { abbr: "AO", balance: 0 },
                { abbr: "NE", balance: 9.6 },
                { abbr: "OO", balance: 11.4 },
                { abbr: "KO", balance: 12.3 },
                { abbr: "GF", balance: 2 },
                { abbr: "MR", balance: 6.9 },
            ];

            const response = await request(app)
                .get(
                    "/interoperability/api/OperatorBalances/aodos/20211001/20211031"
                )
                .query({
                    format: "json",
                });
            expect(response.body.Balances).toEqual(correctResult);
        });
    });

    // -------- Testing for "YearlyPassesCount endpoint" --------------------------------------------------------
    describe("Testing 'YearlyPassesCount'", () => {
        it("should fail because date_to is earlier than date_from", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/YearlyPassesCount/aodos/egnatia/20191005/20171110"
                )
                .query({
                    format: "json",
                });
            expect(response.status).toBe(400);
        });
    });

    describe("Testing YearlyPassesCount", () => {
        it("should fail because of invalid operator", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/YearlyPassesCount/aodos12345/egnatia/20211005/20211110"
                )
                .query({
                    format: "json",
                });
            expect(response.status).toBe(400);
        });
    });

    describe("Testing 'YearlyPassesCount'", () => {
        it("should fail because of wrong input", async () => {
            const response = await request(app)
                .get(
                    "/interoperability/api/YearlyPassesCount/aod/sad/fsdfsdf/20211110"
                )
                .query({
                    format: "fdaslkfasd",
                });
            expect(response.status).toBe(400);
        });
    });

    describe("Testing 'YearlyPassesCount'", () => {
        it("should return a PassesPerMonth array with specific values", async () => {
            let correctResult = [5, 12, 11, 5, 9, 5, 7, 11, 10, 9, 5, 0];

            const response = await request(app)
                .get(
                    "/interoperability/api/YearlyPassesCount/aodos/egnatia/20210101/20211231"
                )
                .query({
                    format: "json",
                });
            expect(response.body.PassesPerMonth).toEqual(correctResult);
        });
    });
});
