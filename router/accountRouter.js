const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

//Create
router.post('/',(req,res) =>{
    if(!req.body.name || !req.body.budget){
        res.status(400).json({errorMessage:"Please provide both a unique name, and a budget"})
        
    } else{
        db('accounts').insert({name:req.body.name, budget:req.body.budget});
    }
    
})//timeout then comes back could not get any response want to try to add middleware

//Replicate
//all accounts
router.get('/', (req,res) =>{
    console.log('hi')
    db('accounts')
    .then(accounts =>{
        res.status(200).json(accounts);
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({errorMessage:'Failed to get accounts'})
    });
});//returning an empty array

//specific account
router.get('/:id', (req,res) =>{
    const {id} = req.params.id;
    db('accounts').where({id: id})
    .then(account =>{
        res.status(200).json(account)
    })
    .catch(err =>{
        res.status(500).json({errorMessage:'Failed to get account'})
    })
})//failed to get possibly bcuz empty

//Update
router.put('/:id', (req,res) =>{
    const {id} = req.params.id;
    db('accounts').where({id:id}).update({name:req.body.name, budget:req.body.budget});
}) //cant check til display, want to try to add middleware

//Delete
router.delete('/:id', (req, res) =>{
    const { id } = req.params.id;
    db('accounts').where({id:id}).del()
})//cant display get account to check




module.exports = router;

//middleware

function validateAccount(req, res, next){
    if(!req.body.name || !req.body.budget){
        res.status(400).json({errorMessage:"Please provide both a unique name, and a budget"})
        
    } else{
       next()
    }

}