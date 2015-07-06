'use strict';

var s1 = require("../../components/s1services/s1.query");

// Get list of ships
exports.index = function (req, res) {
  var id = parseInt(req.user.s1data.id);

  var q = 'select s.CCCCUSTSHIP ShipId, s.name Name, count( * ) InstrumentsCount, sum( case f.CCCSTATUS when 3 then 1 else 0 end ) as Operative, sum( case f.CCCSTATUS when 1 then 1 when 2 then 1 else 0 end ) as Defective, sum( case f.CCCSTATUS when 5 then 1 else 0 end ) InService, sum( case when datediff(m, getdate(), f.date01) < 1 then 1 else 0 end ) CertificateRenewal from (select d.sncode, max(f1.findoc) findoc from mtrdoc d inner join FINDOC f1 on d.findoc = f1.findoc where d.sncode is not null and f1.trdr = ' + id + ' group by d.sncode, d.mtrl) v inner join FINDOC f on f.findoc = v.findoc inner join CCCCUSTSHIP s on f.CCCCUSTSHIP = s.CCCCUSTSHIP and f.trdr = s.trdr where s.trdr =' + id  + ' and f.CCCSTATUS in (1, 2, 3, 5) and f.bool01=1 group by s.name, s.CCCCUSTSHIP order by s.name';

  s1.execute(q, function (vessels) {
    return res.json(vessels);
  })
};

exports.show = function (req, res) {
  var id = parseInt(req.user.s1data.id);
  var shipId = parseInt(req.params.id);

  var q = 'select s.CCCCUSTSHIP, s.name ShipName, v.category, v.mtrl instrumentId, v.name name, v.sncode sncode, f.date01 certDate, case  f.CCCSTATUS when 1 then \'Defective\' when 2 then \'Beyond Repair\' when 3 then \'Operative\' when 4 then \'History\' when 5 then \'In Service\' end status from (select m.mtrl, d.sncode, u.name category, max(f1.findoc) findoc, m.name from mtrdoc d inner join FINDOC f1 on d.findoc = f1.findoc inner join mtrl m on m.mtrl= d.mtrl  left outer join mtrextra me on me.mtrl=d.mtrl left outer join utbl04 u on u.utbl04=me.utbl04 and u.SODTYPE=51 and u.company=1 where d.sncode is not null group by m.mtrl, d.sncode, m.name, u.name) v inner join FINDOC f on f.findoc = v.findoc inner join CCCCUSTSHIP s on f.CCCCUSTSHIP = s.CCCCUSTSHIP and f.trdr = s.trdr where s.trdr = ' +id + ' and s.CCCCUSTSHIP=' + shipId + ' and f.CCCSTATUS in (1, 2, 3, 5) and f.bool01=1 order by s.name';

  s1.execute(q, function (instruments) {
    for (var i = 0; i < instruments.length; i++) {
      instruments[i].certDate = new Date(Date.parse(instruments[i].certDate));
      if(!instruments[i].category ) {
        instruments[i].category = "Other";
      }
    }
    return res.json(instruments);
  })

};

function handleError(res, err) {
  return res.send(500, err);
}

