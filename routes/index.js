var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const Task = require("../model/tasks");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//Router to add task

router.post("/addtask", (req, res, next) => {
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
  });
  task
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Task created Successfully",
        createdTask: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//Router to fetch single task

router.get("/fetchtask/:id", (req, res, next) => {
  const taskid = req.params.id;
  Task.findById(taskid)
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(401).json({ error: "Couldnt found data with provided id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//Router to fetch all the task

router.get("/fetchall", (req, res, next) => {
  Task.find()
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//Router to modify task

router.put("/edittask/:id", (req, res, next) => {
  const taskid = req.params.id;
  //const query =
  const data = req.body;
  console.log(taskid);
  //return next();

  Task.findOneAndUpdate({ _id: taskid }, data, {
    returnOriginal: false,
    useFindAndModify: false,
  })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//Router to delete a task

router.delete("/deletetask/:id", (req, res, next) => {
  const taskid = req.params.id;
  Task.remove({ _id: taskid })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
