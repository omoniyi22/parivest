const { model, Schema } = require("mongoose");

const DriverSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone_number: {
      type: Number,
      maxlength: 10,
      minlength: 10,
      required: true,
      unique: true,
    },

    license_number: {
      type: String,
      required: true,
      unique: true,
    },

    car_number: {
      type: String,
      required: true,
      unique: true,
    },

    location: {
      longitude: {
        type: Number,        
      },
      latitude: {
        type: Number,        
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("driver", DriverSchema);
