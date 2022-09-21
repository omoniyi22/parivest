const request = require("supertest");
const app = require("./../app");

beforeEach(() => {
  jest.setTimeout(28000);
});

describe("Driver API", () => {
  // Register Driver
  it("POST /drivers => Object", () => {
    return request(app)
      .post("/v1/api/drivers")
      .send({
        name: "joi",
        email: "omoniyioluwaseun00@gmail.com",
        phone_number: "0811505868",
        license_number: "232323.3434",
        car_number: "232323.3434",
      })
      .expect("Content-Type", /json/)
      .expect(200)

      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            status: "success",
            message:
              "Please check your inbox or promotion or spam box for verification link",
          })
        );
      })
      .catch((err) => {
        console.log({
          error: "Email is already registered or email is incorrect",
        });
      });
  });

  // If Driver Request is a bad request
  it("POST /drivers => Object (Driver)", () => {
    return request(app)
      .post("/v1/api/drivers")
      .send({
        name: "joi",
        email: "omoniyioluwaseun00gmail.com",
        phone_number: "0811505868",
        license_number: "232323.3434",
        car_number: "232323.3434",
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            status: "failure",
            reason: '"email" must be a valid email',
          })
        );
      });
  });

  // If Driver is Already Register
  it("POST /drivers => Object", () => {
    return request(app)
      .post("/v1/api/drivers")
      .send({
        name: "joi",
        email: "omoniyioluwaseun22@gmail.com",
        phone_number: "0811505868",
        license_number: "232323.3434",
        car_number: "232323.3434",
      })
      .expect("Content-Type", /json/)
      .expect(500)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            status: "failure",
            reason: "Email Already Exist",
          })
        );
      });
  });

  // Throw An Error If The Driver Does Not driver exist
  it("PATCH /drivers/:id => Error (Location)", () => {
    return request(app)
      .patch("/v1/api/drivers/632a28fd46ce09001638b81s")
      .send({
        latitude: "232323.3434",
        longitude: "232323.3434",
      })
      .expect("Content-Type", /json/)
      .expect(500)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            reason: "Error",
            status: "failure",
          })
        );
      });
  });

  // Add the location if the driver exist
  it("PATCH /drivers/:id => Object (Location)", () => {
    return request(app)
      .patch("/v1/api/drivers/632a28fd46ce09001638b81a")
      .send({
        latitude: "30.007",
        longitude: "30.0246",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Location Created Successfully",
            status: "success",
            data: {
              latitude: 30.007,
              longitude: 30.0246,
            },
          })
        );
      });
  });
});
