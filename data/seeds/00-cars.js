exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("cars").insert([
        { VIN: "abdef10000", make: "Toyota", model: "Camry", mileage: 12345 },
        { VIN: "abdef10001", make: "Tesla", model: "Model 3", mileage: 12030 },
        { VIN: "abdef10002", make: "Honda", model: "CR-V", mileage: 50345 },
        { VIN: "abdef10003", make: "Ford", model: "F-150", mileage: 44345 },
        { VIN: "abdef10004", make: "Toyota", model: "Prius", mileage: 100123 },
        {
          VIN: "abdef10005",
          make: "Chevrolet",
          model: "Camaro",
          mileage: 55555,
        },
        { VIN: "abdef10006", make: "BMW", model: "X3", mileage: 33333 },
        {
          VIN: "abdef10007",
          make: "Volkswagen",
          model: "Golf GTI",
          mileage: 44444,
        },
        { VIN: "abdef10008", make: "Subaru", model: "Impreza", mileage: 77777 },
      ]);
    });
};
