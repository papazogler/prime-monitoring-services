'use strict';

var fs = require('fs');
var InstrumentCertificate = require('./instrumentCertificate.model');
var config = require('../../config/environment');

exports.index = function (req, res) {
	InstrumentCertificate.find({}, function (err, instrumentCertificates) {
		if (err) return res.send(500, err);
		res.json(200, instrumentCertificates);
	});
};

// Get a single instrumentCertificate
exports.show = function (req, res) {
	var id = req.params.id;
	InstrumentCertificate.findById(id, function (err, instrumentCertificate) {
		if (err) {
			return handleError(res, err);
		}
		if (!instrumentCertificate) {
			return res.send(404);
		}
		return res.json(instrumentCertificate);
	});
};

// Creates or Updates an existing instrumentCertificate in the DB.
exports.update = function (req, res) {
	InstrumentCertificate.findOne({
		'instrumentId': req.params.instrumentId,
		'serialNo': req.params.serial
	}, function (err, instrumentCertificate) {
		if (err || !instrumentCertificate) {
			instrumentCertificate = new InstrumentCertificate({
				'instrumentId': req.params.instrumentId,
				'serialNo': req.params.serial
			});
		}else{
			fs.unlink(instrumentCertificate.file.path, function (err) {
				if (err) throw err;
				console.log('successfully deleted ' + instrumentCertificate.file.path);
			});
		}
		var test = config.certificateDir;
		instrumentCertificate.file = req.files.file;

		instrumentCertificate.save(function (err, instrumentCertificate) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(201, instrumentCertificate);
		});
	})
};

// Deletes a instrumentCertificate from the DB.
exports.destroy = function (req, res) {
	var id = req.params.id;
	InstrumentCertificate.findById(id, function (err, instrumentCertificate) {
		if (err) {
			return handleError(res, err);
		}
		if (!instrumentCertificate) {
			return res.send(404);
		}
		instrumentCertificate.remove(function (err) {
			if (err) {
				return handleError(res, err);
			}
			if(instrumentCertificate.file.path) {
				fs.unlink(instrumentCertificate.file.path, function (err) {
					if (err) throw err;
					console.log('successfully deleted '+ instrumentCertificate.file.path);
				});
			}
			return res.send(204);
		});
	});
};

function handleError(res, err) {
	return res.send(500, err);
}