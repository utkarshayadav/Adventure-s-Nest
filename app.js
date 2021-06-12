var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds")
var flash = require("connect-flash");

var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index")

var mongoose = require("mongoose");
 // mongoose.set('useNewUrlParser', true);
 // mongoose.set('useFindAndModify', false);
 // mongoose.set('useCreateIndex', true);
 // mongoose.set('useUnifiedTopology', true);
 // mongoose.connect("mongodb://localhost/yelp_camp");    //will make name_of_database if it doesn't already exist.
 mongoose.connect('mongodb+srv://Utkarsha:okay@cluster0.z5446.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
 useNewUrlParser: true,
 useCreateIndex: true
 }).then(() => {
 console.log("connected");
 }).catch(err => {
 console.log("error", err.message);
 });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();


// Campground.create(
// {
// 	name: "Granite Hill", image: "https://media.kare11.com/assets/KARE/images/437173820/437173820_750x422.png",
// 	description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
// }, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("newly created campground: ");
// 		console.log(campground);
// 	}
// });
app.use(require("express-session")({
	secret: "Rusty is best!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("YelpCamp server has started!!");
});




