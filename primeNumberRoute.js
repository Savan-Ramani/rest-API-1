const express = require("express");
const Record = require("../models/record");
const { primeNumberGenerator } = require("../utils/primeNumberGenerator");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const records = await Record.find();
    res.send(records);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const upperNumber = body.upperNumber;
    const lowerNumber = body.lowerNumber;

    const numbers = primeNumberGenerator(upperNumber, lowerNumber);

    const record = new Record({
      timeStamp: Date.now(),
      upperRange: upperNumber,
      lowerRange: lowerNumber,
      primeNumbers: numbers,
      algorithm: "default",
    });
    const result = await record.save();
    res.status(200).json({
      message: `Prime numbers between range ${upperNumber} and ${lowerNumber} : ${numbers}`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.delete("/purge", async (req, res) => {
  try {
    const records = await Record.find();
    for (const record of records) {
      await Record.findByIdAndDelete(record.id);
    }
    res.send("done");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
