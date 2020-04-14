const router = require("express").Router();
const db = require("../data/dbConfig.js");

router.get("/", (req, res, next) => {
  console.log(req.query);
  const { limit, sortby, sortdir } = req.query;
  db.select("*")
    .from("cars")
    .orderBy(sortby || "id", sortdir || "ASC")
    .limit(limit)
    .then((cars) => {
      cars.length > 0 ? res.json(cars) : res.status(404).send("no cars yet");
    })
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was an error getting the cars" });
    });
});

router.get("/:id", (req, res, next) => {
  db("cars")
    .where("id", req.params.id)
    .then((cars) => {
      cars.length > 0 ? res.json(cars) : res.status(404).send("car not found");
    })
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was an error retrieving the car" });
    });
});

router.post("/", (req, res, next) => {
  const { VIN, make, model, mileage, transmission, title } = req.body;
  if (!(VIN && make && model && mileage))
    return next({ code: 400, message: "Please provide all required fields" });
  db("cars")
    .insert({ VIN, make, model, mileage, transmission, title })
    .then((ids) => {
      const id = ids[0];
      return db("cars").where({ id });
    })
    .then((car) => res.status(201).json(car))
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was an error creating the car" });
    });
});

router.put("/:id", (req, res, next) => {
  const { VIN, make, model, mileage, transmission, title } = req.body;
  if (!(VIN && make && model && mileage))
    return next({ code: 400, message: "Please provide all required fields" });
  db("cars")
    .where("id", req.params.id)
    .update({ VIN, make, model, mileage, transmission, title })
    .then((updates) => {
      updates > 0 ? res.json(updates) : res.status(404).send("car not found");
    })
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was an error updating the car" });
    });
});

router.delete("/:id", (req, res, next) => {
  db("cars")
    .where("id", req.params.id)
    .del()
    .then(() => res.status(204).send())
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was an error deleting the car" });
    });
});

module.exports = router;
