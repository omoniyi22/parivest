const Driver = require("../models/driver");
const Status = require("./../handler/Status");
const { verifySigup } = require("./../handler/Email");
const haversineCalc = require("./../utils/haversine_calc");
const { registerDriver, addLocation } = require("../validator/driver");

const DriverController = {
  async Register(req, res) {
    try {
      const { error } = registerDriver.validate(req.body);
      if (error)
        res.status(Status.BAD_REQUEST.code).json({
          status: Status.type.FAILURE,
          reason: error.details[0].message,
        });

      const emailExist = await Driver.findOne({ email: req.body.email });
      if (emailExist)
        res.status(Status.SERVER_ERROR.code).send({
          status: Status.type.FAILURE,
          reason: "Email Already Exist",
        });
      else {
        verifySigup(req, res);
      }
    } catch (error) {
      res.status(Status.SERVER_ERROR.code).send({
        status: Status.type.FAILURE,
        reason: Status.SERVER_ERROR.message,
      });
    }
  },

  async VerifyEmail(req, res) {
    try {
      const emailExist = await Driver.findOne({ email: req.user.email });
      if (emailExist)
        res.status(Status.SERVER_ERROR.code).send({
          status: Status.type.FAILURE,
          reason: "Email Already Exist",
        });
      else {
        let newDriver = new Driver(req.user);
        let savedDriver = await newDriver.save();

        res.status(Status.CREATED.code).json({
          status: Status.type.SUCCESS,
          message: "Driver Successfully Registered",
          data: savedDriver,
        });
      }
    } catch (error) {
      // console.log(error);
      res.status(Status.SERVER_ERROR.code).send({
        status: Status.type.FAILURE,
        error: Status.SERVER_ERROR.message,
      });
    }
  },

  async ShareLocation(req, res) {
    try {
      const { error } = addLocation.validate({
        driver_id: req.params.id,
        ...req.body,
      });
      if (error)
        res.status(Status.BAD_REQUEST.code).json({
          status: Status.type.FAILURE,
          reason: error.details[0].message,
        });
      else {
        let driver = await Driver.findById(req.params.id);
        if (!driver)
          res.status(Status.NOT_FOUND.code).json({
            status: Status.type.FAILURE,
            reason: `Driver Is ${Status.NOT_FOUND.message}`,
          });
        driver.location = await req.body;
        let updatedDriver = await driver.save();
        res.status(Status.OK.code).json({
          status: Status.type.SUCCESS,
          message: `Location Shared ${Status.OK.message}`,
          data: updatedDriver.location,
        });
      }
    } catch (error) {
      res.status(Status.SERVER_ERROR.code).send({
        status: Status.type.FAILURE,
        reason: Status.SERVER_ERROR.message,
      });
    }
  },

  async FindCabs(req, res) {
    try {
      let { latitude, longitude } = req.body;
      const allDrivers = await Driver.find();

      const nearbyCabs = haversineCalc(allDrivers, latitude, longitude);

      if (!nearbyCabs)
        res.status(Status.NOT_FOUND.code).json({
          status: Status.type.FAILURE,
          reason: `No Nearby Cab Found`,
        });

      await res.status(Status.OK.code).json({
        status: Status.type.SUCCESS,
        message: `${Status.OK.message}`,
        available_cabs: nearbyCabs,
      });
    } catch (error) {
      await res.status(Status.SERVER_ERROR.code).json({
        status: Status.type.FAILURE,
        message: Status.SERVER_ERROR.message,
      });
    }
  },
};

module.exports = DriverController;
