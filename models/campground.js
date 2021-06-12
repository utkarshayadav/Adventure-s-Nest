var mongoose = require("mongoose");
 // mongoose.set('useNewUrlParser', true);
 // mongoose.set('useFindAndModify', false);
 // mongoose.set('useCreateIndex', true);
 // mongoose.set('useUnifiedTopology', true);
 // mongoose.connect("mongodb://localhost/yelp_camp"); 
 mongoose.connect('mongodb+srv://Utkarsha:okay@cluster0.z5446.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
 useNewUrlParser: true,
 useCreateIndex: true
 }).then(() => {
 console.log("connected");
 }).catch(err => {
 console.log("error", err.message);
 });


var campgroundSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = mongoose.model("Campground", campgroundSchema);


