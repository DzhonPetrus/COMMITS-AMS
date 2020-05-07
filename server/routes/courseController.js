const express = require('express');
const course = require('../db/course');

const router = express.Router();

router.get('/', async(req, res) => {
  try{
    let results = await course.all();
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No course!`});
    res.status(200).send(results);
  }catch(e){
    res.status(500).send(e);
  }
});

router.post('/', async(req,res) => {
  try{
    let newCourse = req.body;
    let results = await course.create(newCourse);
    res.status(201).send({msg:`Org created!`, results, newCourse});
  }catch(e){
    res.status(500).send(e);
  }
});

router.get('/:courseCode', async(req,res) => {
  try{
    let results = await course.findByCourseCode(req.params.courseCode);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No course with courseCode ${req.params.courseCode}`});
    res.status(200).send(results);
  }catch(e){
    res.status(500).send(e);
  }
});

router.patch('/:id', async(req,res) => {
  try{
    let updatedCourse = req.body;
    updatedCourse.id = req.params.id;
    let results = await course.update(updatedCourse);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No course with id ${req.params.id}`});
    res.status(200).send({msg:`Course updated!`, results, updatedCourse});
  }
  catch(e){
    res.status(500).send(e);
  }
});

router.delete('/:id', async(req,res) => {
  try{
    let results = await course.delete(req.params.id);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No course with id ${req.params.id}`});
    res.status(200).send({msg:`Course deleted!`, results});
  }
  catch(e){
    res.status(500).send(e);
  }
});

module.exports = router;
