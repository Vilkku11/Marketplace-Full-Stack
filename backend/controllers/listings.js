const Joi = require("joi");
const listings = require("../models/listings");

const getListings = async (req, res) => {
  try {
    const response = await listings.findAll();
    if (response) {
      res.send(response);
    }
    console.log(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong in getlistings");
  }
};

const createListing = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    price: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const listing = {
    name: req.body.name,
    price: req.body.price,
  };

  try {
    const result = await listings.findByListing(listing);
    if (result.length > 0) {
      res.status(400).send("Listing already in db");
      return;
    }
    const response = await listings.create(listing);
    if (response) {
      listing.id = response.insertId;
      res.status(201).send(listing);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong :(");
  }
};

module.exports = {
  getListings,
  createListing,
};
