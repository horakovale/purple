const express = require('express');
const router = express.Router();

const fetch = require("node-fetch");

const apiKey = '10ea24fb9c7a53b0e0e767eb408d2cc8';
const apiUrl = 'http://data.fixer.io/api/';

/* GET home page. */
router.get('/', function (req, res, next) {

  let query = fetch(`${apiUrl}latest?access_key=${apiKey}`);

  query
    .then(response => response.json())
    .then(data => displayData(data, req.query.amount, req.query.sourceCode, req.query.destinationCode))
    .catch(error => {
      console.log(error);
      next(error);
    });

  function displayData(data, amount, sourceCode, destinationCode) {

    let result = "";
    if (sourceCode && amount && destinationCode) {
      result = ((amount / data.rates[sourceCode]) * data.rates[destinationCode]).toString();
    }

    res.render('index', {
      title: 'Currency conversion app',
      sourceCurrencyList: currencyList(sourceCode, data),
      destinationCurrencyList: currencyList(destinationCode, data),
      amount: amount,
      result: result
    });
  }
});

function currencyList(code, data) {
  let html = "";
  for (var key in data.rates) {

    if (key === code) {
      html = html + `
       <option selected>
       ${key}
       </option>      
     `;
    } else {
      html = html + `
       <option>
       ${key}
       </option>      
     `;
    }
  };
  return html;
}

module.exports = router;
