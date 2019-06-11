var express = require("express");
app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var expressSenitizer = require("express-sanitizer");
var flash = require("express-flash-messages");

var url = process.env.DATABASEURL || "mongodb://localhost:27017/contact";
//var url =
// "mongodb+srv://ankitspatel1990:%2AIndian3048%23@cluster1-gmj5b.mongodb.net/contact?retryWrites=true";
mongoose.connect(url, { useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSenitizer());
app.use(flash());

var contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

var Contact = mongoose.model("Contact", contactSchema);
//Routes
app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/index", function(req, res) {
  res.render("index");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/experince", function(req, res) {
  res.render("experince");
});

app.get("/project", function(req, res) {
  res.render("project");
});

app.get("/skill", function(req, res) {
  res.render("skill");
});

app.get("/work", function(req, res) {
  res.render("work");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.post("/contact", function(req, res) {
  console.log("In POST");
  // req.body.contact.body = req.sanitize(req.body.contact.body);
  Contact.create(req.body.contact, function(err, newContact) {
    if (err) res.render("landing");
    else res.redirect("/contact");
  });
});

var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function() {
  console.log(" Server Has Started! on envirment");
  console.log(port);
});
