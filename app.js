const express = require("express");
const app = express();
const sql = require("mssql");

app.get("/", (req, res) => {
  var dbConfig = {
    user: "sa",
    password: "oldshoe46",
    server: "localhost",
    database: "SampleDB",
  };

  sql.connect(dbConfig, (err) => {
    if (err) console.log(err);

    let sqlRequest = new sql.Request();

    let sqlQuery = "SELECT Name, Color, Cat From Products";

    sqlRequest.query(sqlQuery, (err, data) => {
      if (err) console.log(err);

      console.table(data.recordset);
      console.log(data.recordset[0]);
      res.send(data.recordset);
      sql.close();
    });
  });
});

const ws = app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
