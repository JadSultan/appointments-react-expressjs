const express = require('express'),
  router = express.Router();

// get user lists
router.get('/appointments', function(req, res) {
  let sql = `SELECT id, name, DATE_FORMAT(dt, "%Y-%m-%d") as date_alias, time(dt) as time_alias FROM appointments  order by dt desc;`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Appointments lists retrieved successfully"
    })
  })
});

// get user byId
router.get('/appointments/:id', function(req, res) {
  let sql = `SELECT id, name, DATE_FORMAT(dt, "%Y-%m-%d") as date_alias, time(dt) as time_alias FROM appointments where id=?;`;
  db.query(sql, [req.params.id], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Appointments lists retrieved successfully"
    })
  })
});


// create new user
router.post('/appointments', function(req, res) {
  let sql = `INSERT INTO appointments(name, dt) VALUES (?)`;
  let values = [
    req.body.name,
    req.body.dt, 
  ];
  db.query(sql, [values], function(err, data, fields) {
    if (err){
      console.log(err)
      res.json({
        message: "Duplicate"
      })
    }else{
      res.json({
        status: 200,
        message: "New User Added successfully"
      })
    }
  })
});


// create new user
router.delete('/appointments', function(req, res) {
  let sql = `DELETE FROM appointments WHERE ID = (?)`;
  let id = [req.body.id]
  db.query(sql, id, function(err, data, fields) {
    if (err) throw err
    res.json({
        status: 200,
        message: "User Deleted"
      })
  })
});

module.exports = router;