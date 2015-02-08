'use strict';

var s1 = require("../../components/s1services/s1.query");

// Get list of ships
exports.index = function (req, res) {
  var page = req.query.page || 1;
  var count = req.query.count || 10;

  var q = "select s.name Name, count( * ) InstrumentsCount, sum( case v.status when 3 then 1 else 0 end ) as Operative, sum( case v.status when 1 then 1 when 2 then 1 else 0 end ) as Defective, sum( case v.status when 5 then 1 else 0 end ) InService, sum( case when datediff(m, getdate(), v.date01) < 1 then 1 else 0 end ) CertificateRenewal from( select d.sncode, max(f.trndate) trndate, max(f.date01) date01, f.CCCSTATUS as Status, f.CCCCUSTSHIP, f.trdr from mtrdoc d inner join FINDOC f on d.findoc = f.findoc where f.cccstatus in (1, 2, 3, 5) group by d.sncode, f.CCCSTATUS, f.CCCCUSTSHIP, f.trdr ) v inner join CCCCUSTSHIP s on v.CCCCUSTSHIP = s.CCCCUSTSHIP and v.trdr = s.trdr where s.trdr = " + req.user.s1data.id  + " group by s.name order by s.name ";

  s1.execute(q, function (vessels) {
    return res.json(vessels);
  })
};

exports.show = function (req, res) {
};

function handleError(res, err) {
  return res.send(500, err);
}
