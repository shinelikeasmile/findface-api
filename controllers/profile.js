const handleProfile=(req,res,postgres)=>{
	const {id} = req.params;
	postgres.select('*').from('users').where({id:id}).then(user=>{
		if(user.length){res.json(user[0]);}
		else{res.status(400).json("not found");}
	});
	/*database.users.forEach(user=>{
		if(user.id===id){
			return res.json(user);
		}
	})*/
	
}

module.exports={
	'handleProfile':handleProfile
}