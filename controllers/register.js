const handleRegister=(req,res,postgres,bcrypt)=>{
	const {name,email,password} = req.body;
	if(!name || !email || !password){
		return res.status(400).json("incorrect details");
	}
	var hash = bcrypt.hashSync(password);
	postgres.transaction(trx=>{
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginemail => {
			return trx('users')
			.returning('*')
			.insert({
				email:loginemail[0],
				name:name,
				joined:new Date()
			  }).then(user =>{
				res.json(user[0]);	
			     })
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err=>res.status(400).json('unable to register'));
	// bcrypt.hash(password, null, null, function(err, hash) {
	// 	database.users.push({
	// 	id:'3',
	// 	name:name,
	// 	email:email,
	// 	password:password,
	// 	hash:hash,
	// 	entries:0,
	// 	joined: new Date()
	// })
	// });
}

module.exports = {
	handleRegister:handleRegister
}