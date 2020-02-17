const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.post('/', (req, res) => {
    db('accounts').insert(req.body, 'id')
    .then(ids =>{
        res.status(201).json(ids)
    })
    .catch(err =>{
        res.status(500).json({error:'Failed to add account'})
        })
});

router.get('/', (req, res) =>{
    db('accounts')
    .then(accounts =>{
        res.status(200).json(accounts)
    })
    .catch(err =>{
        res.status(500).json({errorMessage:'Failed to get accounts'})
    })
})//working

router.get('/:id', (req, res) => {
    db('accounts').where({id: req.params.id})
    .first()
    .then(account =>{
        res.status(200).json(account)
    })
    .catch(err =>{
        res.status(500).json({error:'Failed to get account'})
        })
    });//working

router.put('/:id', (req, res) =>{
    db('accounts').where({id : req.params.id}).update(req.body)
    .then(count =>{
        res.status(200).json(count);
    })
    .catch(err =>{
        res.status(500).json({errorMessage:'Failed to update account'})
    })
})

router.delete('/:id', (req, res) =>{
    db('accounts').where({id:req.params.id}).del()
    .then(count =>{
        res.status(200).json(count);
    })
    .catch(err =>{
        res.status(500).json({errorMessage:'Failed to delete account'})
    })
})

module.exports = router;

function getById(id) {
    return db('accounts')
      .where({ id })
      .first();
  }


