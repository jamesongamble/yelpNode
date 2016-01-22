/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/yelp              ->  index
 * POST    /api/yelp              ->  create
 * GET     /api/yelp/:id          ->  show
 * PUT     /api/yelp/:id          ->  update
 * DELETE  /api/yelp/:id          ->  destroy
 */

'use strict';

var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'kYEFHjYH3refG3i8kT1VZQ',
  consumer_secret: 'g6H0tfIsdSzbbvReDEKulCLKU3g',
  token: 'UfUy9d0lcthVYyxLSe14UEaTB9cf2zKy',
  token_secret: 'F-D3KS0TBOXPUEHILeJ4msmvwh8'
});



// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'food', location: 'Montreal' })
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err);
});

// See http://www.yelp.com/developers/documentation/v2/business
yelp.business('yelp-san-francisco')
  .then(console.log)
  .catch(console.error);

yelp.phoneSearch({ phone: '+15555555555' })
  .then(console.log)
  .catch(console.error);

// A callback based API is also available:
yelp.business('yelp-san-francisco', function(err, data) {
  if (err) return console.log(error);
  console.log(data);
});

var _ = require('lodash');
var Yelp = require('./yelp.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Yelps
exports.index = function(req, res) {
  yelp.search({ term: 'food', location: 'Montreal' })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.error(err);
  });

  // Yelp.findAsync()
  //   .then(responseWithResult(res))
  //   .catch(handleError(res));
};

// Gets a single Yelp from the DB
exports.show = function(req, res) {
  Yelp.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Yelp in the DB
exports.create = function(req, res) {
  Yelp.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Yelp in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Yelp.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Yelp from the DB
exports.destroy = function(req, res) {
  Yelp.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
