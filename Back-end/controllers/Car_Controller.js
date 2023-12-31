const Car = require('../models/CarModel.js');
const mongoose = require('mongoose');

const carController = {};

carController.createCar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ status: 400, message: 'Bad Request', error: error.message });
  }
};

carController.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().select('-_id -__v');
    res.json(cars);
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
};

carController.updateCar = async (req, res) => {
  try {
    const car = await Car.findOneAndUpdate({carNo:req.body.carNo}, req.body ,{ new: true });
    if (!car) {
      return res.status(404).json({ status: 404, message: 'Not Found', error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
};
 
carController.deleteCar = async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ carNo: req.body.carNo });
    if (!car) {
      return res.status(404).json({ status: 404, message: 'Not Found', error: 'Car not found' });
    }
    res.json({ status: 200, message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
};

module.exports = carController;
