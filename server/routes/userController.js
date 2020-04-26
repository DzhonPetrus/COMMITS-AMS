const express = require('express');
const user = require('../db/user');

const router = express.Router();

router.get('/', async(req, res) => {
  try{
    let results = await user.all();
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No user!`});
    res.status(200).send(results);
  }catch(e){
    res.status(500).send(e);
  }
});

router.post('/', async(req,res) => {
  try{
    let newUser = req.body;
    newUser.id = global.generateID();
    let results = await user.create(newUser);
    res.status(201).send({msg:`User created!`, results, newUser});
  }catch(e){
    res.status(500).send(e);
  }
});

router.get('/:id', async(req,res) => {
  try{
    let results = await user.findById(req.params.id);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No user with id ${req.params.id}`});
    res.status(200).send(results);
  }catch(e){
    res.status(500).send(e);
  }
});

router.patch('/:id', async(req,res) => {
  try{
    let updatedUser = req.body;
    updatedUser.id = req.params.id;
    let results = await user.update(updatedUser);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No user with id ${req.params.id}`});
    res.status(200).send({msg:`User updated!`, results, updatedUser});
  }
  catch(e){
    res.status(500).send(e);
  }
});

router.delete('/:id', async(req,res) => {
  try{
    let results = await user.delete(req.params.id);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No user with id ${req.params.id}`});
    res.status(200).send({msg:`User deleted!`, results});
  }
  catch(e){
    res.status(500).send(e);
  }
});

router.post('/exist', async(req,res) => {
  try{
    let {username, password} = req.body;
    let results = await user.exist(username,password);
    if(results.length > 0)
      res.status(200).send({msg: `User exist!`, results});
    res.status(200).send(results);
  }
  catch(e){
    res.status(500).send(e);
  }
});

module.exports = router;
