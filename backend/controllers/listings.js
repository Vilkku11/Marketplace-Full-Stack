const Joi = require("joi");
const listings = require("../models/listings");
const users = require("../models/users");

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
    image: Joi.string(),
    userId: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error.details[0].message);
    res.status(400).send(error.details[0].message);
    return;
  }

  // fetch user name for listing
  const user = await users.findByUserId(req.body.userId);
  if (!user) {
    res.status(400).send("No user found");
  }

  const listing = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    user_id: req.body.userId,
    user: user[0].name,
  };
  console.log(listing);
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

const deleteListing = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await listings.deleteById(id);
    if (response) {
      res.status(200).json("Listing deleted");
    }
  } catch (err) {
    res.status(500).send("Somethin went wrong :(");
  }
};
module.exports = {
  getListings,
  createListing,
  deleteListing,
};
