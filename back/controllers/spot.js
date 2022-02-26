const Spot = require("../models/spot");

exports.add = (req, res, next) => {
  const spot = new Spot({
    name: req.body.name,
    category: req.body.category,
    // user_id: req.body.user_id,
    // location: req.body.location,
    imageURL: req.body.imageURL,
  });
  spot
    .save()
    .then(() => res.status(201).json({ message: "Spot enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.picture = (req, res) => {
  Spot.updateOne({ ...req.body.imageURL, _id: req.body.id })
    .then(() => res.status(200).json({ message: "Picture oK???" }))
    .catch((error) => res.status(400).json({ error }));
};
