const express = require('express');
const student = require('../db/student');

const router = express.Router();

router.get('/', async(req, res) => {
  try{
    let results = await student.all();
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No student!`});
    res.status(200).send(results);
  }catch(e){
    res.status(500).send(e);
  }
});

router.post('/timeIn', async(req,res) => {
  try{
    let newStudent = req.body;
    newStudent.id = global.generateID();
    let results = await student.create(newStudent);
    res.status(201).send({msg:`Student created!`, results, newStudent});
  }catch(e){
    res.status(500).send(e);
  }
});

router.get('/:studentNo', async(req,res) => {
  try{
    let results = await student.findByStudentNo(req.params.studentNo);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No student with studentNo ${req.params.studentNo}`});
    res.status(200).send(results);
  }catch(e){
    res.status(500).send(e);
  }
});

router.patch('/timeOut/:id', async(req,res) => {
  try{
    let updatedStudent = req.body;
    updatedStudent.id = req.params.id;
    let results = await student.update(updatedStudent);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No student with id ${req.params.id}`});
    res.status(200).send({msg:`Student updated!`, results, updatedStudent});
  }
  catch(e){
    res.status(500).send(e);
  }
});

router.delete('/:id', async(req,res) => {
  try{
    let results = await student.delete(req.params.id);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No student with id ${req.params.id}`});
    res.status(200).send({msg:`User deleted!`, results});
  }
  catch(e){
    res.status(500).send(e);
  }
});

module.exports = router;
