var mongo = require("mongoose");
var model = require("../models/schema");
var user = require("../models/users");

var data = [
{
	pstname: "Harshit",
	image: "https://ci3.googleusercontent.com/proxy/3u6Bvj8y457jl9lYLVhXwvHiuKFJmK7Ntl1hAvfKlrfREw9ZPjNqdKV6v_uptFVlkaxhx4-6ThuuI-GItQ=s0-d-e1-ft",
	imgname: "first image",
	description: "This is description of harshit" 
},
{
	pstname: "Sahai",
	image: "https://ci3.googleusercontent.com/proxy/3u6Bvj8y457jl9lYLVhXwvHiuKFJmK7Ntl1hAvfKlrfREw9ZPjNqdKV6v_uptFVlkaxhx4-6ThuuI-GItQ=s0-d-e1-ft",
	imgname: "second image",
	description: "This is description of Sahai" 
},
{
	pstname: "Saxena",
	image: "https://ci3.googleusercontent.com/proxy/3u6Bvj8y457jl9lYLVhXwvHiuKFJmK7Ntl1hAvfKlrfREw9ZPjNqdKV6v_uptFVlkaxhx4-6ThuuI-GItQ=s0-d-e1-ft",
	imgname: "image three",
	description: "This is description of Saxena" 
}
]

 function seeddata(){
// // model.remove({}, function(err){
// // 	console.log("all campgrounds removed..");
// //  });
// data.forEach(function(seed){
// 	model.create(seed, function(err, res){
// 		if(err) {console.log(err);}
// 		else {console.log(res);}
// 	user.create({
// 		text:"This is first comment!!", 
// 		author:"Soni"
// 	}, function(err, resl){
// 		if(err) {console.log(err);}
// 		else {
// 			res.comments.push(resl);
// 			res.save();
// 			//res.render(""+ resl);
// 			console.log("new comment added!!"+ resl);
// 		}
// 	});
// 	});
// });
 }
module.exports = seeddata;

