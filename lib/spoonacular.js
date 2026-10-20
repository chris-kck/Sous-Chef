var API_KEY = process.env.SPOONACULAR_API_KEY || '20faf6bbe4074762be9f0c0db3fe9709';
var BASE_URL = 'https://api.spoonacular.com/';

// GET a Spoonacular endpoint and call back with (err, body).
// Query values that are undefined, null or empty are left out.
function spoonacular(path, query, callback) {
  var params = new URLSearchParams({ apiKey: API_KEY });
  Object.keys(query || {}).forEach(function (key) {
    var value = query[key];
    if (value !== undefined && value !== null && value !== '') params.append(key, value);
  });

  fetch(BASE_URL + path + '?' + params.toString())
    .then(function (response) {
      return response.json().catch(function () { return null; }).then(function (body) {
        if (!response.ok) {
          var err = new Error((body && body.message) || 'Spoonacular request failed with status ' + response.status);
          err.status = response.status;
          throw err;
        }
        return body;
      });
    })
    .then(function (body) { callback(null, body); }, function (err) { callback(err); });
}

module.exports = spoonacular;
