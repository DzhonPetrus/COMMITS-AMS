const express = require('express');
const org = require('../db/org');

const router = express.Router();

router.get('/', async(req, res) => {
  try{
    let results = await org.all();
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No org!`});
    res.status(200).send(results);
  }catch(e){
    res.status(500).send(e);
  }
});

router.post('/', async(req,res) => {
  try{
    let newOrg = req.body;
    let results = await org.create(newOrg);
    res.status(201).send({msg:`Org created!`, results, newUser});
  }catch(e){
    res.status(500).send(e);
  }
});

router.get('/:orgCode', async(req,res) => {
  try{
    let results = await org.findByOrgCode(req.params.orgCode);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No org with orgCode ${req.params.orgCode}`});
    res.status(200).send(results);
  }catch(e){
    res.status(500).send(e);
  }
});

router.patch('/:id', async(req,res) => {
  try{
    let updatedOrg = req.body;
    updatedOrg.id = req.params.id;
    let results = await org.update(updatedOrg);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No org with id ${req.params.id}`});
    res.status(200).send({msg:`Org updated!`, results, updatedUser});
  }
  catch(e){
    res.status(500).send(e);
  }
});

router.delete('/:id', async(req,res) => {
  try{
    let results = await org.delete(req.params.id);
    if(results.affectedRows === 0)
      res.status(400).send({msg:`No org with id ${req.params.id}`});
    res.status(200).send({msg:`Org deleted!`, results});
  }
  catch(e){
    res.status(500).send(e);
  }
});

router.post('/exist', async(req,res) => {
  try{
    let {orgname, password} = req.body;
    let results = await org.exist(orgname,password);
    if(results.length > 0)
      res.status(200).send({msg: `User exist!`, results});
    res.status(200).send(results);
  }
  catch(e){
    res.status(500).send(e);
  }
});

module.exports = router;
