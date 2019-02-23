var express = require("express");
var mongo = require("mongoose");
var app = express();
var parser = require("body-parser");
var method = require("method-override");
var model = require("./models/schema");
var User = require("./models/users");
var user = require("./models/ussr");
var profile = require("./models/profile");
var session = require("express-session");
var passport = require("passport");
var local = require("passport-local");
var mongosession = require("passport-local-mongoose");
app.use(require("express-session")({ secret:"secret",resave:false , saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new local(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
var seedDB = require("./seed/seed");
app.use(parser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(method("_method"));
mongo.connect("mongodb://localhost:27017/posty", { useNewUrlParser: true });
seedDB();
app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});//https://media.beliefnet.com/~/media/photos-with-attribution/angels/angel-woman-clouds-wings_credit-shutterstock.jpg?as=1&w=400

app.get("/profile/:id", logoutt, function(req, res){
	model.find({'pstname':req.user.username}, function(err, resll){
	 	if(err) {console.log(err);}
		else{//res.send(+" h "+resll);
	profile.find({'ide': req.params.id }, function(err, resl){
	 	if(err) {console.log(err);}
		else{//console.log(resl);
	if(resl != 0){res.render("proview", {data:resl, post:resll, ide:req.params.id});}
	else {
		res.render("profile", {data:req.params.id});
	}}});}
});
});

app.get("/like/:id", logoutt, function(req, res){
	//console.log(req.params.id+" "+req.user.id);
	model.findById(req.params.id, function(err, resll){
	profile.find({'ide':req.user.id}, function(err, resell){
		//console.log(resell[0].status+" ha "+resll.likes);
		if(resell[0].status==0){resell[0].status=1;resll.likes=resll.likes+1;}
		else{resell[0].status=0;resll.likes=resll.likes-1;}
		//console.log(resll.likes+" h "+resell[0].status);
		var stat = {likes:resll.likes};
	profile.findOneAndUpdate({'ide':req.user.id},  {status:resell[0].status},function(err, respo){
		if(err){console.log(err);}});
	model.findByIdAndUpdate(req.params.id,  stat, function(err, resl){
	  	res.redirect("/");});
	  	});
	});
});

app.get("/profile/:id/create", logoutt, function(req, res){
	res.render("profile", {data:req.params.id});
});

app.post("/profile/:id", function(req, res){//profile.deleteMany({}, function(req,res){});//'ide': req.params.id 
	profile.find({'ide': req.params.id }, function(err, resl){
	 	if(err) {console.log(err);}
		else{//console.log("created id");
	if(resl != 0){
	 	for (var i = 0; i < resl.length; i++) {
	 	if(resl[i].ide == req.params.id) {
	 		//console.log("Id already exists");
		res.render("redirect", {data:resl, ide:req.params.id});	
		break;}
	 	if(i == resl.length-1){ console.log("Either");
	 		profile.create(req.body, function(err, resll){
	 		if(err) {console.log(err);}
	 		else{
	 			res.render('redirect', {ide:req.params.id}); }
	 		});
	 	}}}//res.render("proview", {data:resl, ide:req.params.id});
		else{//console.log("id is not present...");
		if(resl == 0){
		 	profile.create(req.body, function(err, resll){
	 		if(err) {console.log(err);}
	 		else{
	 			res.render("redirect", {ide:req.params.id}); }
	 		});
	}}}});
});// profile.find({}, function(err, respons){if(err){ console.log(err); }// 	else{console.log(respons+" h ");}});

app.get("/proedit", function(req, res){
	
	profile.find({'ide':req.user.id}, function(err, resl){//console.log(resl);
		if(err){console.log(err);}
		else{
		res.render("profile_edit", {data:resl, data2:req.user.id});
	}});
});

app.put("/profile/:id", function(req, res){
	//console.log(req.body);
	profile.findOneAndUpdate({'ide':req.params.id}, req.body, function(err, resl){
		if(err){console.log(err);}
		else{
		res.redirect(''+req.params.id);	
	}});
});

app.get("/search", function(req, res){
	res.render("search");
});

app.get("/findall", function(req, res){
	User.find({}, function(err, resl){
		if(err){console.log(err);}
		else{res.render("searchall", {data:resl});}
	});
	
});

app.post("/search", function(req, res){//'':req.params.id
	User.find({'username':req.body.search}, function(err, resl){
		if(err){console.log(err);res.send('<h1>User does not exist.</h1>');}
		else{if(resl[0] == null ){res.send('<h1>User does not exist.</h1>');}
			else{profile.find({'ide':resl[0].id}, function(err, resll){
		if(err){console.log(err);res.send('<h1>User does not exist.</h1>');}
		else{res.render("alluzers", {data:resll, usrid:resl[0].username});
		}});
	}}});
});

app.get("/auth", function(req, res){
	res.render("auth");
});

app.get("/signup", function(req, res){
	res.render("register");
});

app.post("/signup", function(req, res){
	User.register(new User({username:req.body.username}), req.body.password, function(err, resl){
		if(err) {console.log(err);
			return res.redirect("/signup");}
		passport.authenticate("local")(req, res, function(){
			console.log(req.user.id);
			res.redirect('/profile/'+req.user.id);
		});
	});
});

app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login", passport.authenticate("local", 
	{successRedirect: "/", failureRedirect: "/login"}), function(req, res){
});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/login");
});

app.get("/", logoutt, function(req, res){
	model.find({}).populate("comments").exec(function(err, resl){
		if(err) {console.log(err);}
		else {	
			User.find({}, function(err, resll){
				if(err) {console.log(err);}
		else {
		profile.find({}, function(err, ress){
				if(err) {console.log(err);}
		else {//console.log(resll+" haha ");	
		res.render("landing", {data:resl, user:req.user, uzer:req.user, alluser:resll, profiles:ress});
	}});}
	})}});
});

app.get("/start", logoutt, function(req, res){
	res.render("start", {data:req.user.username});
});

app.get("/view/:id", logoutt, function(req, res){
	model.findById(req.params.id).populate("comments").exec(function(err, resl){
		if(err) {console.log(err);}
		else {res.render("show", {data:resl, usr:req.user});
		}
});
});

app.post("/land", logoutt, function(req, res){	 
	//data = {pstname:req.user.username, image:req.body.image, imgname:req.body.imgname, description:req.body.description};
	model.create(req.body, function(err, resl){
		if(err) {console.log(err);}
		else {var data = {text:"NA", author:"."};
		user.create(data, function(err, ressl){
		if(err) {console.log(err);}
		else {
			resl.comments.push(ressl);
			resl.save();
			res.redirect("/");
		}});
}});
});

app.post("/view/comnt/:id", function(req, res){
	var data = {text:req.body.txt, author:req.body.author};
	model.findById(req.params.id, function(err, ress){
	if(err) {console.log(err);}
		else {
			user.create(data, function(err, resl){
		if(err) {console.log(err);}
		else {
			ress.comments.push(resl);
			ress.save();
			res.redirect('/view/'+req.params.id);
		}
	});}
});
});

app.get("/edit/:id", logoutt, function(req, res){
	model.findById(req.params.id, function(err, resl){
		if(err) {console.log("err");}
		else {res.render("edit", {data:resl, valu:req.user.username});}
});
});

app.put("/update/:usr/:id", logoutt, function(req, res){
	if(req.user.username === req.params.usr){
	model.findByIdAndUpdate(req.params.id, req.body, function(err, resl){
		if(err) {console.log(err);}
		else {res.redirect("/view/"+req.params.id);}
});
}
else{//console.log("You are not authorised to update that...");
	res.render("commentform", {data:req.params.id});
}
});

app.delete("/delete/:usr/:id", function(req, res){
	if(req.user.username === req.params.usr){
	model.findByIdAndRemove(req.params.id, function(err, resl){
		if(err) {console.log("err");}
		else {
			res.redirect("/");}});
}
	else{//console.log("You are not authorised to delete that...");
		res.render("commentform", {data:req.params.id});
	}
});

function logoutt(req, res, next){
	if(req.isAuthenticated()){
		return next();}
	res.redirect("/login");
};

app.get("*", function(req, res){
	res.send("Some err...");
});
app.listen(2006, 2007, function(err, res){
	if(err) {console.log(err)}
	else
	{console.log("Server Started at port 2006...");}
});

