import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';

import dotEnv from 'dotenv';
dotEnv.config({ path: './config.env' });

import { extractClassInfo } from './utils.js'

const HTTP_STATUS_OK = 200;
const classSearchEndpoint = process.env.CLASS_SEARCH_ENDPOINT;
const referrer = process.env.REFERRER;
const headers = process.env.HEADERS;
const bodySetup = process.env.BODY_SETUP;

const subject = 'COMP'
const exactMatch = 'T'
const limit = '599'
const acadCareer = ''
const openOnly = 'N'

const searchRoutes = express.Router();

searchRoutes.route('/app/search/').get(function (req, res, next) {
    fetch(classSearchEndpoint, {
        "headers": JSON.parse(headers),
        "body": bodySetup
            + `&SSR_CLSRCH_WRK_SUBJECT$0=${subject}`
            + `&SSR_CLSRCH_WRK_SSR_EXACT_MATCH1$1=${exactMatch}`
            + `&SSR_CLSRCH_WRK_CATALOG_NBR$1=${limit}`
            + `&SSR_CLSRCH_WRK_ACAD_CAREER$2=${acadCareer}`
            + `&SSR_CLSRCH_WRK_SSR_OPEN_ONLY$chk$3=${openOnly}`,
        "referrer": referrer,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "method": "POST",
        "mode": "cors"
    })
        .then(rawResponse => rawResponse.text())
        .then(textResponse => {
            // see full text response in a new file by uncommenting the line below
            // fs.writeFileSync('./testSearch', textResponse);
            let extractedClassInfo = extractClassInfo(textResponse);
            res.status(HTTP_STATUS_OK).json(extractedClassInfo);
        });
});

export default searchRoutes;