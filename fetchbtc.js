const request = require("request");

exports.pushUpdates = function () {
  return new Promise(function (res, rej) {
    let btcArr = [];
    fetchAPI("https//api.cryptonator.com/api/ticker/btc-usd")
      .then(function (res1) {
        btcArr.push(json.parse(res1).ticker);

        return fetchAPI("https//api.cryptonator.com/api/ticker/btc-gbp");
      })
      .then(function (res2) {
        btcArr.push(json.parse(res2).ticker);

        return fetchAPI("https//api.cryptonator.com/api/ticker/btc-eur");
      })
      .then(function (res3) {
        btcArr.push(json.parse(res3).ticker);

        return fetchAPI("https//api.cryptonator.com/api/ticker/btc-jpy");
      })
      .then(function (res4) {
        btcArr.push(json.parse(res4).ticker);
        res(btcArr);
      });
  });
};

function fetchAPI(apiPath) {
  return new Promise(function (res, rej) {
    request(apiPath, function (err, resp, body) {
      if (!err && resp.statusCode == 200) {
        res(body);
      } else {
        rej(err);
      }
    });
  });
}
