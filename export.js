var fs = require('fs');


// script should be startable with a param "for which project do you want to export the email templates" (e.g. jobs, jobup, alpha, etc.)
// create output dir for project (in ./export/<project-name>)
// load correct style for the chosen project for every mail template
// render every existing mjml template and store every file in "/export/<project-name>/" and name it "<mail-name>.html.twig"
// note: the <mail-name> must never change! i recommend taking over the ones we used in the backend
