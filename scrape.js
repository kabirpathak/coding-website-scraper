const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()
const codechef_url = 'https://www.codechef.com/users/kabirpathak';
const hackerrank_url = 'https://www.hackerrank.com/rest/hackers/TARUN_V_REDDY/rating_histories_elo';
const hackerearth_url = 'https://www.hackerearth.com/@prashantpokhriyal/';


exports.scrape = function(url, website) {
    let current_rating = 0, max_rating = 0;
    axios(url, {headers: { 'User-Agent':'firefox' }})
    .then(response => {
        switch(website) {
            case 'hackerrank':
                const $hr = response.data.models;
                list = [];
                for(let i = 0;i < $hr.length;i++) {
                    if($hr[i].category == 'Algorithms') list = $hr[i].events;
                }

                for(let i = 0;i < list.length;i++) {
                    current_rating = list[i].rating;
                    if(current_rating > max_rating)max_rating = current_rating;
                }
            break;

            case 'codechef':
                const $ = cheerio.load(response.data);
                $('.rating-number', response.data).each(function() {
                current_rating = $(this).text();
                })
            break;

            case 'codeforces':
                const $cf = cheerio.load(response.data);
                $('.')
            break;
        }

        console.log(current_rating);

        return [current_rating, max_rating];
    }).catch(err => console.log(err));
}

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
