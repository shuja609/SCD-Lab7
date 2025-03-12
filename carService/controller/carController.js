const Car = require('../model/Car');

exports.createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCarAvailability = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.carId,
      { isAvailable: req.body.isAvailable },
      { new: true }
    );
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};