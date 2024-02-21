const Thing = require("../models/Thing")

exports.createThing = (req, res, next) => {
  try {
    // Vérifiez si req.body.thing est défini et non vide
    if (!req.body.thing) {
      return res
        .status(400)
        .json({ error: 'Missing or empty "thing" field in the request body.' })
    }
    const thingObject = JSON.parse(req.body.thing)
    delete thingObject._id
    delete thingObject._userId
    const thing = new Thing({
      ...thingObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    })

    thing
      .save()
      .then(() => {
        res.status(201).json({ message: "Objet enregistré !" })
      })
      .catch((error) => {
        res.status(400).json({ error })
      })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: 'Invalid JSON format in the "thing" field.' })
  }
}

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }))
}

exports.getAllStuff = (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }))
}

exports.modifyThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié" }))
    .catch((error) => res.status(400).json({ error }))
}

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé" }))
    .catch((error) => res.status(400).json({ error }))
}
