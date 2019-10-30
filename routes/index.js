var express = require('express');
var router = express.Router();

const fetch = require("node-fetch");

/* GET home page. */
router.get('/', function (req, res, next) {

  console.log(req.query.amount);
  console.log(req.query.code);

  const apiKey = '10ea24fb9c7a53b0e0e767eb408d2cc8';
  const apiUrl = 'http://data.fixer.io/api/';

  let query = fetch(`${apiUrl}latest?access_key=${apiKey}`);

  query
    .then(response => response.json())
    .then(displayCurrencyCodes)
    .catch(error => {
      console.log('Došlo k chybě', error);
      next(error)
    }
    );

  function displayCurrencyCodes(data) {
    let html = '';

    for (var key in data.rates) {
      html = html + `
                <option>
                ${key}
                </option>      
                `;
    };

    res.render('index', { title: 'Currency conversion app', currencyList: html });
  }

});

module.exports = router;
