const express = require('express');
const attendance = require('../db/attendance');

const router = express.Router();

router.get('/', async(req, res) => {
  try{
    let results = await attendance.all();
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No attendance!`});
    res.status(200).send(results);
  }catch(e){
    res.status(500).send(e);
  }
});

router.post('/', async(req,res) => {
  try{
    let newAttendance = req.body;
    newAttendance.id = global.generateID();
    let results = await attendance.timeIn(newAttendance);
    res.status(201).send({msg:`Time in success!`, results, newAttendance});
  }catch(e){
    res.status(500).send(e);
  }
});

router.get('/:id', async(req,res) => {
  try{
    let results = await attendance.findById(req.params.id);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No attendance with id ${req.params.id}`});
    res.status(200).send(results);
  }catch(e){
    res.status(500).send(e);
  }
});

router.patch('/:id', async(req,res) => {
  try{
    let updatedAttendance = req.body;
    updatedAttendance.id = req.params.id;
    let results = await attendance.timeOut(updatedAttendance);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No attendance with id ${req.params.id}`});
    res.status(200).send({msg:`Time out success!`, results, updatedAttendance});
  }
  catch(e){
    res.status(500).send(e);
  }
});

router.delete('/:id', async(req,res) => {
  try{
    let results = await attendance.delete(req.params.id);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No attendance with id ${req.params.id}`});
    res.status(200).send({msg:`Attendance deleted!`, results});
  }
  catch(e){
    res.status(500).send(e);
  }
});

module.exports = router;
