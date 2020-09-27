
const clarifai =  require('clarifai');

require('dotenv').config()

const app = new Clarifai.App({
 apiKey: process.env.API_KEY
});

 const handleApiCall =(req,res)=>{ app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
      .then(generalModel => {
        return generalModel.predict(req.body.input);
      }).then(data=>res.json(data))
      .catch(err=>res.status(400).json("cannot work with api"))
  }

const handleImage=(req,res,postgres,bcrypt)=>{
	const {id} = req.body;
	postgres('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'));
// bcrypt.compare("bacon", hash, function(err, res) {
// 	    // res == true
// 	})
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
}
module.exports={
	'handleImage':handleImage,
	'handleApiCall':handleApiCall
}

