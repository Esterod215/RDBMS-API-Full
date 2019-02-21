const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/api/cohorts', async(req,res)=>{
    try{
      const cohorts = await db('cohorts');//all records from table
      res.status(200).json(cohorts);
    }catch(error){
      res.status(500).json(error);
    }
  });

  server.get('/api/cohorts/:id', async(req,res)=>{
    try{
      const cohort = await db('cohorts').where({id:req.params.id}).first();
      res.status(200).json(cohort);
    }catch(error){
      res.status(500).json(error);
    }
  });

  server.post('/api/cohorts',async(req,res)=>{
    try{
      const [id]= await db('cohorts').insert(req.body);
      const cohort = await db('cohorts').where({ id }).first();
      res.status(201).json(cohort);
    }catch(error){
      res.status(500).json(error);
      }
  });

  server.put('/api/cohorts/:id',async(req,res)=>{
    try{
      const count = await db('cohorts').where({id:req.params.id}).update(req.body);
      if(count>0){
        const cohort = await db('cohorts').where({ id:req.params.id}).first();
      res.status(200).json(cohort)
      }else{
        res.status(404).json('Cohort Not Found')
      }
    }catch(error){}
  });
  
  server.delete('/api/cohorts/:id',async(req,res)=>{
    try{
      const count = await db('cohorts')
      .where({id:req.params.id})
      .del();
      
      if(count > 0){
      res.status(204).end();
      }else{
        res.status(404).json('Cohort Not Found')
      }
    }catch(error){}
  });

  server.get('/api/cohorts/:id/students', async(req,res)=>{
    try{
      
        const cohorts = await db('cohorts').join('students', 'cohorts.id', '=', 'students.cohort_id');
      

      res.status(200).json(cohorts);
    }catch(error){
      res.status(500).json(error);
    }
  });


const port = 3000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});