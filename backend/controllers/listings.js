//const Joi = require("joi");
const listings = require("../models/listings");

const getListings = async (req, res) => {
  try {
    const response = await listings.findAll();
    if (response) {
      res.send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  getListings,
};
