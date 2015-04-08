'use strict';

var s1query = require("../../components/s1services/s1.query");
var s1file = require("../../components/s1services/s1.file");
var InstrumentCertificate = require('../instrumentCertificate/instrumentCertificate.model');

exports.index = function (req, res) {
	var id = parseInt(req.user.s1data.id);

	var q = 'select v.mtrl instrumentId, m.name, count( * ) instrumentsCount, sum( case f.CCCSTATUS when 3 then 1 else 0 end ) as operative, sum( case f.CCCSTATUS when 1 then 1 when 2 then 1 else 0 end ) as defective, sum( case f.CCCSTATUS when 5 then 1 else 0 end ) inService, sum( case when datediff(m, getdate(), f.date01) < 1 then 1 else 0 end ) certificateRenewal from (select d.mtrl, d.sncode, max(f1.findoc) findoc from mtrdoc d inner join FINDOC f1 on d.findoc = f1.findoc where d.sncode is not null group by d.mtrl, d.sncode) v inner join FINDOC f on f.findoc = v.findoc inner join mtrl m on v.mtrl = m.mtrl where f.trdr = ' + id + ' group by v.mtrl, m.name order by m.name';

	s1query.execute(q, function (instruments) {
		return res.json(instruments);
	})
};

exports.show = function (req, res) {
	var instrumentId = req.params.id;
	var sncode = decodeURIComponent(req.params.sncode);


	var q = 'select m.name name, m.webpage, x.sodata image, xdoc.xdoc, xdoc.name docname, me.VARCHAR04 simlink, d.sncode from mtrl m inner join mtrdoc d on m.mtrl = d.mtrl inner join mtrextra me on me.mtrl = m.mtrl inner join xtrdocdata x on m.mtrl = x.Refobjid left outer join xdoc on x.xdoc= xdoc.xdoc where m.mtrl = ' + instrumentId + ' and d.sncode = \'' + sncode + '\' order by x.lnum';

	s1query.execute(q, function (instruments) {
		var instrument = {};
		instrument.documents = [];
		var imageid;
		for (var i = 0; i < instruments.length; i++) {
			instrument.serial = instruments[i].sncode;
			instrument.name = instruments[i].name;
			instrument.webpage = instruments[i].webpage;
			instrument.simulation = instruments[i].simlink;
			if (instruments[i].image) {
				imageid = instruments[i].image;
			}
			if (instruments[i].xdoc) {
				instrument.documents.push({docId: instruments[i].xdoc, name: instruments[i].docname});
			}
		}
		var fetchCert = function () {
			InstrumentCertificate.findOne({
				'instrumentId': instrumentId,
				'serialNo': sncode
			}, function (err, instrumentCertificate) {
				if (err) {
					return handleError(res, err);
				}
				if (instrumentCertificate) {
					instrument.certificate = instrumentCertificate.file;
				}
				return res.json(instrument);
			});
		};

		if (imageid) {
			s1file.getFile(imageid, function (image) {
				instrument.image = image;
				fetchCert();
				//return res.json(instrument);
			});
		} else {
			fetchCert();
			//return res.json(instrument);
		}
	});
};


exports.spares = function (req, res) {
	var instrumentId = req.params.id;
	var q = 'select m.code2 code, m.name from CCCS1PARTSLNK c inner join mtrl m on m.mtrl = c.mtrl where c.item = ' + instrumentId + ' order by m.code2';
	s1query.execute(q, function (spares) {
		return res.json(spares);
	});
};

exports.serials = function (req, res) {
	var id = parseInt(req.user.s1data.id);
	var instrumentId = parseInt(req.params.id);

	var q = 'select s.CCCCUSTSHIP shipId, s.name shipName, v.mtrl instrumentId, v.name name, v.sncode sncode, f.date01 certDate, case  f.CCCSTATUS when 1 then \'Defective\' when 2 then \'Beyond Repair\' when 3 then \'Operative\' when 4 then \'History\' when 5 then \'In Service\' end status from (select m.mtrl, d.sncode, max(f1.findoc) findoc, m.name from mtrdoc d inner join FINDOC f1 on d.findoc = f1.findoc inner join mtrl m on m.mtrl= d.mtrl where d.sncode is not null group by m.mtrl, d.sncode, m.name) v inner join FINDOC f on f.findoc = v.findoc inner join CCCCUSTSHIP s on f.CCCCUSTSHIP = s.CCCCUSTSHIP and f.trdr = s.trdr where s.trdr = ' + id + ' and v.mtrl = ' + instrumentId + ' and f.CCCSTATUS in (1, 2, 3, 5) order by s.name';

	s1query.execute(q, function (instruments) {
		for (var i = 0; i < instruments.length; i++) {
			instruments[i].certDate = new Date(Date.parse(instruments[i].certDate));
		}
		return res.json(instruments);
	})
};

exports.logbook = function (req, res) {
	var custId = parseInt(req.user.s1data.id);
	var instrumentId = req.params.id;
	var sncode = req.params.sncode;

	var q = 'select m.name, f.findoc id, f.trndate date, s.CCCCUSTSHIP shipId ,s.name shipname, s.email, f.comments result, f.remarks notes from mtrl m left outer join mtrdoc d on m.mtrl = d.mtrl inner join FINDOC f on d.findoc = f.findoc inner join CCCCUSTSHIP s on f.CCCCUSTSHIP = s.CCCCUSTSHIP and f.trdr = s.trdr where s.trdr = ' + custId + ' and d.mtrl = ' + instrumentId + ' and d.sncode = \'' + sncode + '\'';

	s1query.execute(q, function (logs) {
		var instr = {};
		if (!!logs) {
			instr.name = logs[0].name;
			for (var i = 0; i < logs.length; i++) {
				logs[i].date = new Date(Date.parse(logs[i].date));
			}
			instr.logs = logs;
		}
		return res.json(instr);
	});
};


exports.getFile = function (req, res) {
	var fileId = req.params.fileId;

	var q = 'select top 1 sodata from xdoc where xdoc = ' + fileId;
	s1query.execute(q, function (filenames) {
		if (filenames) {
			var filename = filenames[0].sodata;
			if (filename) {
				s1file.getStreamFile(filename, res);
			}
		}
	});
};

function handleError(res, err) {
	return res.send(500, err);
}

