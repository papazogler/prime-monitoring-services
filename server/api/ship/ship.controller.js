'use strict';

var s1 = require("../../components/s1services/s1.query");

// Get list of ships
exports.index = function (req, res) {
  var id = req.user.s1data.id;

  var q = 'select s.CCCCUSTSHIP ShipId, s.name Name, count( * ) InstrumentsCount, sum( case f.CCCSTATUS when 3 then 1 else 0 end ) as Operative, sum( case f.CCCSTATUS when 1 then 1 when 2 then 1 else 0 end ) as Defective, sum( case f.CCCSTATUS when 5 then 1 else 0 end ) InService, sum( case when datediff(m, getdate(), f.date01) < 1 then 1 else 0 end ) CertificateRenewal from (select d.sncode, max(f1.findoc) findoc from mtrdoc d inner join FINDOC f1 on d.findoc = f1.findoc where d.sncode is not null group by d.sncode) v inner join FINDOC f on f.findoc = v.findoc inner join CCCCUSTSHIP s on f.CCCCUSTSHIP = s.CCCCUSTSHIP and f.trdr = s.trdr where s.trdr =' + id  + ' group by s.name, s.CCCCUSTSHIP order by s.name';

  s1.execute(q, function (vessels) {
    return res.json(vessels);
  })
};

exports.show = function (req, res) {
  var id = req.user.s1data.id;
  var shipId = req.params.id;

  var q = 'select s.CCCCUSTSHIP, s.name ShipName, v.name name, v.sncode sncode, f.date01 certDate, case  f.CCCSTATUS when 1 then \'Defective\' when 2 then \'Beyond Repair\' when 3 then \'Operative\' when 4 then \'History\' when 5 then \'In Service\' end status from (select d.sncode, max(f1.findoc) findoc, m.name from mtrdoc d inner join FINDOC f1 on d.findoc = f1.findoc inner join mtrl m on m.mtrl= d.mtrl where d.sncode is not null group by d.sncode, m.name) v inner join FINDOC f on f.findoc = v.findoc inner join CCCCUSTSHIP s on f.CCCCUSTSHIP = s.CCCCUSTSHIP and f.trdr = s.trdr where s.trdr = ' +id + ' and s.CCCCUSTSHIP=' + shipId + ' order by s.name';

  s1.execute(q, function (instruments) {
    for (var i = 0; i < instruments.length; i++) {
      instruments[i].certDate = new Date(Date.parse(instruments[i].certDate));
    }
    return res.json(instruments);
  })

};

function handleError(res, err) {
  return res.send(500, err);
}

