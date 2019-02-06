var express = require('express');
var router = express.Router();
var fs = require('fs');
var mjml2html = require('mjml');
var Twig = require('twig')
var twig = Twig.twig;

Twig.extendFunction("url", function (value, times) {
    return "https://www.jobs.ch";
});

Twig.extendFunction("asset", function (value, times) {
    return "https://placehold.it/350x50";
});

Twig.extendFilter("addTrackingParameters", function (value, times) {
    return "";
});


var browserMode = true;

/* GET home page. */
router.get('/', function (req, res, next) {
    fs.readFile("./views/job-recommendation.mjml.twig", 'utf-8', (err, data) => {
        if (browserMode) {
            // render mjml to html and render twig to show the finished email in the browser
            var template = twig({
                data: data
            });

            var mjmlButRenderedTwig = template.render({
                jobs: [{
                        "id": "jujueidi",
                        "title": "fett",
                        "companyName": "JobCloud AG",
                        "place": "Zurich",
                        "companyLogoFile": "",
                        "companyVisible": false
                    },
                    {
                        "id": "youyoueyedee",
                        "title": "gandon",
                        "companyName": "JobCloud AG",
                        "place": "Zurich",
                        "companyLogoFile": "",
                        "companyVisible": true
                    }
                ]
            });

            var renderedMjml = mjml2html(mjmlButRenderedTwig).html;
            res.send(renderedMjml);
        } else {
            // render mjml to html but preserve twig syntax to create the html.twig template for the backend.
            var renderedMjml = mjml2html(data).html;
            res.send(renderedMjml);
        }
    });
});

module.exports = router;