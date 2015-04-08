'use strict';
var config = require('../../config/environment');
var filePluginLib = require('mongoose-file'),
    filePlugin = filePluginLib.filePlugin;
//,
//    make_upload_to_model = filePluginLib.make_upload_to_model;

var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

//var path = require('path'),
//    uploads_base = path.join(config.certificateDir, "certificates"),
//    uploads = path.join(uploads_base, "u");


var InstrumentCertificateSchema = new Schema({
  instrumentId: String,
  serialNo: String
});

InstrumentCertificateSchema.plugin(filePlugin, {
});

InstrumentCertificateSchema.index({instrumentId: 1, serialNo: 1}, {unique: true});

module.exports = mongoose.model('InstrumentCertificate', InstrumentCertificateSchema);