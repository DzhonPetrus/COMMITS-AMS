const express = require('express');
const event = require('../db/event');

const router = express.Router();

router.get('/', async(req, res) => {
  try{
    let results = await event.all();
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No event!`});
    res.status(200).send(results);
  }catch(e){
    res.status(500).send(e);
  }
});

router.post('/', async(req,res) => {
  try{
    let newEvent = req.body;
    newEvent.id = global.generateID();
    let results = await event.create(newEvent);
    res.status(201).send({msg:`Event created!`, results, newEvent});
  }catch(e){
    res.status(500).send(e);
  }
});

router.get('/:id', async(req,res) => {
  try{
    let results = await event.findById(req.params.id);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No event with id ${req.params.id}`});
    res.status(200).send(results);
  }catch(e){
    res.status(500).send(e);
  }
});

router.patch('/:id', async(req,res) => {
  try{
    let updatedEvent = req.body;
    updatedEvent.id = req.params.id;
    let results = await event.update(updatedEvent);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No event with id ${req.params.id}`});
    res.status(200).send({msg:`Event updated!`, results, updatedEvent});
  }
  catch(e){
    res.status(500).send(e);
  }
});

router.delete('/:id', async(req,res) => {
  try{
    let results = await event.delete(req.params.id);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No event with id ${req.params.id}`});
    res.status(200).send({msg:`Event deleted!`, results});
  }
  catch(e){
    res.status(500).send(e);
  }
});

module.exports = router;
