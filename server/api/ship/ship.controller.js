'use strict';

var s1 = require("../../components/s1services/s1.query");

// Get list of ships
exports.index = function (req, res) {
  var page = req.query.page || 1;
  var count = req.query.count || 10;

  var q = 'select s.name Name, count( * ) InstrumentsCount, sum( case f.CCCSTATUS when 3 then 1 else 0 end ) as Operative, sum( case f.CCCSTATUS when 1 then 1 when 2 then 1 else 0 end ) as Defective, sum( case f.CCCSTATUS when 5 then 1 else 0 end ) InService, sum( case when datediff(m, getdate(), f.date01) < 1 then 1 else 0 end ) CertificateRenewal from (select d.sncode, max(f1.findoc) findoc from mtrdoc d inner join FINDOC f1 on d.findoc = f1.findoc where d.sncode is not null group by d.sncode) v inner join FINDOC f on f.findoc = v.findoc inner join CCCCUSTSHIP s on f.CCCCUSTSHIP = s.CCCCUSTSHIP and f.trdr = s.trdr where s.trdr =' + req.user.s1data.id  + ' group by s.name order by s.name';

  s1.execute(q, function (vessels) {
    return res.json(vessels);
  })
};

exports.show = function (req, res) {
};

function handleError(res, err) {
  return res.send(500, err);
}

