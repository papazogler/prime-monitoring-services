/**
 * Created by Stavros on 6/2/2015.
 */
'use strict';


var s1 = require("../../components/s1services/s1.query");

// Get list of customers
exports.index = function (req, res) {
  var name = req.query.name || '';
  var page = req.query.page || 1;
  var count = req.query.count || 10;

  var query_part = ' from trdr where isactive = 1 and name like \'%' + name + '%\'';
  var q = 'select trdr as id, code, name, email ' + query_part;
  var count_query = 'select count(*) count ' + query_part;
  s1.execute(count_query, function(totalRows) {
    s1.executeWithPaging(q, 'name', page, count, function (custs) {
      return res.json({count: totalRows[0].count, custs: custs});
    })
  });
};

exports.show = function (req, res) {
  var id = req.user.s1data.id;
  var q = 'select trdr as id, code, name, email from trdr where isactive = 1 and trdr = ' + id;

  s1.execute(q, function (custs) {
    callback(custs[0]);
  });
};
