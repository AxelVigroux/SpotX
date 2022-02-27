const Spot = require("../models/spot");

exports.add = (req, res, next) => {
  const spot = new Spot({
    name: req.body.name,
    category: req.body.category,
    location: req.body.location,
    imageURL: req.body.imageURL,
    user_id: req.body.user_id,
  });
  spot
    .save()
    .then(() => res.status(201).json({ message: "Spot enregistré !" }))
    .catch((error) => res.status(400).json({ error }))
    .catch((error) => res.status(500).json({ error }));
};

exports.picture = (req, res) => {
  Spot.updateOne({
    ...req.body.imageURL,
    id: req.body.id,
  })
    .then(() => res.status(200).json({ message: "Photo ok" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.all = (req, res) => {
  const spots = Spot.find()
    .then((spots) => res.status(200).json({ spots }))
    .catch((error) => res.status(400).json({ error }));
};
