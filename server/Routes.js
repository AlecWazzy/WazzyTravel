"use strict";

var SabreDevStudio = require("sabre-dev-studio");

var sabreDevStudio = new SabreDevStudio({
	client_id:     "V1:vdgol6xa64l8e690:DEVCENTER:EXT",
	client_secret: "F2TKvt5n",
	uri:           "https://api.test.sabre.com"
});

var options = {};

function sabreCall(q, res) {
	sabreDevStudio.get(q, options, function(err, data) {
		response(res, err, data);
	});
}

function response(res, err, data) {
	if (err) {
		res.status(200).send({
			'status': false,
			'message': 'Error',
			'info': err
		});
	} else {
		res.status(200).send({
			'status': true,
			'message': 'Success',
			'info': data
		});
	}
}

module.exports = function(app) {
	
	app.get('/api/v1/cities', function(req,res) {
		sabreCall('/v1/lists/supported/cities', res);
	});
	
	app.get('/api/v1/countries', function(req,res) {
		sabreCall('/v1/lists/supported/countries', res);
	});
	
	app.get('/api/v1/places', function(req,res) {
		sabreCall('/v1/shop/flights/fares?origin=' + req.query.origin +
			'&departuredate=' + req.query.departuredate +
			'&returndate=' + req.query.returndate +
			'&maxfare=' + req.query.maxfare, res);
	});
};