var express = require('express');
var router = express.Router();
var fs = require('fs')

var json=fs.readFileSync('logindata.json','utf-8')
var convert=JSON.parse(json)

const jsons = fs.readFileSync('formdata.json', 'utf-8')
const conv = JSON.parse(jsons)
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(convert);
  let login =convert.find(value => value.Email==req.query.email && value.password == req.query.password)
  console.log(login);
  if (login) {
    res.redirect('/dashbroad') 
  } else {
    res.render('index',  {});
  }
});

router.get('/dashbroad', function(req, res, next) {
 res.render('dashbroad',{})
});


router.get("/usermodule", function (req, res, next) {
  var curentdata = { FirstName: "", LastName: "", Email: "", Role: "", Status: "", Created: "" };
  let id = req.query.id
  if (id > 0 || id == 0) {
    curentdata = conv[id]
  }
  res.render("usermodule", { data: conv, i: req.query.id, currents: curentdata });
});

router.get("/add", function (req, res, next) {
  let id=req.query.id
  console.log(id,req.query);
  if (id>=0) {
    conv.splice(id,1,{
      FirstName: req.query.fname, LastName: req.query.lname, Email: req.query.Email, Role: req.query.Role, Status: req.query.Status, Created: req.query.Created
    })
  } else {
    conv.push({
      FirstName: req.query.fname, LastName: req.query.lname, Email: req.query.Email, Role: req.query.Role, Status: req.query.Status, Created: req.query.Created
    });
  }
 
  fs.writeFileSync("data.json", JSON.stringify(conv));
  console.log(conv);
  res.redirect("/usermodule");
});

router.get("/delete", function (req, res, next) {
  let id = req.query.id;
  conv.splice(id, 1);
  res.redirect("/usermodule");
  fs.writeFileSync("data.json", JSON.stringify(conv));
});


module.exports = router;
