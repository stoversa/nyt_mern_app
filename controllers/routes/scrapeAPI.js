const express = require("express");
const router = express.Router();
const db = require("../models");
const request = require("request");

  request.get({
    url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    qs: {
      'api-key': "32adc87bd5c947cd96ced3c75b161322",
      'q': "obama",
      'begin_date': "20171111",
      'end_date': "20181111",
      'sort': "newest",
      'fl': "headline,web_url,document_type,pub_date",
      'page': 2,
      'facet_field': "headline,document_type",
      'facet_filter': "true"
    },
  }, function (err, response, body) {
    body = JSON.parse(body);
    console.log(body);
  })