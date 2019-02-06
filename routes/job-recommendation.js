var express = require('express');
var router = express.Router();
var fs = require('fs');
var mjml2html = require('mjml');
var Twig = require('twig')
var twig = Twig.twig;

Twig.extendFunction("url", function (routeName, params) {
    return "https://www.jobs.ch";
});

Twig.extendFunction("asset", function (asset, location) {
    return "https://placehold.it/350x50";
});

Twig.extendFilter("addTrackingParameters", function (templateName, urlType, userId, messageId) {
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
                        "id": "f17817a2-2307-4eaf-a59c-f9b6d971e89c",
                        "title": "Test Job 1",
                        "companyName": "JobCloud AG",
                        "place": "8032 Zurich",
                        "companyLogoFile": null,
                        "companyVisible": false
                    },
                    {
                        "id": "8dfe9f6f-c6c4-45a9-b4bd-f18e1a91926a",
                        "title": "Test Job 2",
                        "companyName": "JobCloud AG",
                        "place": "Zurich",
                        "companyLogoFile": "https://avatars1.githubusercontent.com/u/3427265?s=280&v=4",
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