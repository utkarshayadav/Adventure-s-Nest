var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/cat_app");    //will make cat_app if it doesn't already exist.

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

var george = new Cat({
	name: "George",
	age: 11,
	temperament: "Grouchy"
});
// george.save();   	//adds it to the database
//however many times for some reason it doesn't (no internet etc) then we should add a call back function which is called when the save is done
george.save(function(err, cat){      //cat is the item saved
	if(err){
		console.log("something went wrong!!");
	}
	else
		{
			console.log("cat just got saved to db");
			console.log(cat);
		}
});
