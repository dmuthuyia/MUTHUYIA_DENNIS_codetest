var express = require("express");
var router = express.Router();

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "oaf"
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET clients. */

router.get("/clients", function(req, res, next) {
  connection.query("SELECT * FROM clients", function(err, row, fields) {
    if (err) console.log(err);

    if (row.length > 0) {
      res.status(200).json({
        message: "Albums found.",
        album: row
      });
    } else {
      res.send({
        success: false,
        message: "No data"
      });
    }
  });
});

// find Long Rains 2011
router.get("/seasons", function(req, res, next) {
  var SeasonName = "Mar. 2011, Long Rain";

  connection.query(
    "SELECT * FROM seasons WHERE SeasonName = ?",
    [SeasonName],

    function(err, row, fields) {
      if (err) console.log(err);

      if (row.length > 0) {
        res.send({ seasonlist: row[0] });
      } else {
        res.send({
          success: false,
          message: "nothing found, please try again"
        });
      }
    }
  );
});

// get Long Rains season 2011
router.get("/longrains", function(req, res, next) {
  connection.query(
    //"SELECT Seasons.SeasonName, districts.DistrictName, sectors.SectorName, Sites.SiteName, Groups.GroupName, COUNT(Groups.GroupName) AS total_active_groups FROM Seasons INNER JOIN districtson districts.DistrictID = 5INNER JOIN Siteson Seasons.SeasonName = 'Mar. 2011, Long Rain' AND Seasons.SeasonID = Sites.FirstSeason OR Seasons.SeasonID = Sites.LastSeasonINNER JOIN Groupson Groups.Active = 1 AND Groups.SiteID = Sites.SiteIDINNER JOIN sectorson Seasons.SeasonName = 'Mar. 2011, Long Rain' AND districts.DistrictID = 5 AND Seasons.SeasonID = sectors.FirstSeason OR Seasons.SeasonID = sectors.LastSeason GROUP BY Sites.SiteName ORDER BY Sectors.SectorName ASC, Sites.SiteName ASC",
    "SELECT Seasons.SeasonID, Sites.SiteID FROM Seasons INNER JOIN Sites on Seasons.SeasonName = 'Mar. 2011, Long Rain' AND Seasons.SeasonID = Sites.LastSeason ORDER BY Sites.SiteID",
    function(err, row, fields) {
      if (err) console.log(err);

      if (row.length > 0) {
        res.end(JSON.stringify(row));
      } else {
        res.send({
          success: false,
          message: "nothing found, please try again"
        });
      }
    }
  );
});

module.exports = router;
