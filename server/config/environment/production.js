'use strict';

// Production specific configuration
// =================================
module.exports = {
	// Server IP
	ip: process.env.OPENSHIFT_NODEJS_IP ||
	process.env.IP ||
	undefined,

	// Server port
	port: process.env.OPENSHIFT_NODEJS_PORT ||
	process.env.PORT ||
	8080,

	// MongoDB connection options
	mongo: {
		uri: process.env.MONGOLAB_URI ||
		process.env.MONGOHQ_URL ||
		process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
		'mongodb://localhost/primemonitoringservices'
	},

	s1HttpOptions: function (body) {
		return {
			hostname: process.env.S1_SERVICE_HOST || 'prime.oncloud.gr',
			port: process.env.S1_SERVICE_PORT,
			path: process.env.S1_SERVICE_PATH || '/s1services',
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Content-Length": Buffer.byteLength(body)
			}
		};
	},

	//s1 user
	s1User: {
		username: process.env.S1_USERNAME,
		password: process.env.S1_PASSWORD,
		appId: process.env.S1_APPID
	},

	certificateDir: process.env.OPENSHIFT_DATA_DIR,
	tmpUploadDir: process.env.OPENSHIFT_TMP_DIR

};
