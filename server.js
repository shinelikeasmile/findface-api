const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const postgres=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'shinelikeasmile',
    password : 'sripriya',
    database : 'smart-brain'
  }
});

// postgres.select('*').from('users').then(data=>{
// 	console.log(data);
// });

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

/*
/ --> res = this is working 
/signin --> POST = success/fail 
/register --> POST = user
/profile/:userid --> GET = user 
/image --> PUT --> user 
*/

app.get('/',(req,res)=>{
	postgres.select('*').from('users')
	.then(data=>{
		res.json(data);
	})
	.catch(err=>res.status(400).json("unable to get users"));
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,postgres,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,postgres,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,postgres,bcrypt)})

app.put('/image',(req,res)=>(image.handleImage(req,res,postgres,bcrypt)))

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

app.listen(3000,()=>{
	console.log("app is running ");
})