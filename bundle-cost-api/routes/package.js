var express = require('express');
var router = express.Router();
const axios = require('axios');
const UrlHelper = require("../utils/UrlHelper");
const NpmDataTransformer = require("../utils/NpmDataTransformer");

router.get('/:packageName', function (req, res, next) {
    axios.get(UrlHelper.getPackageNpmUrl(req.params.packageName)).then(response => {
        const returnPayload = NpmDataTransformer.formatPayload(response.data, null)
        res.send(returnPayload);
    }).catch(error => {
        console.log(error);
    });
});

module.exports = router;
