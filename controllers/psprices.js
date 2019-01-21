const fetch = require('node-fetch');
const getDb = require('../util/database').getDb;
const util = require('util');


require('dotenv').config();

exports.fetchData = (req, res) => {
    let page;
    let count;
    fetch(process.env.URL)
        .then(response => response.json())
        .then(json => {
            count = json.count;
            page = json.next;
            max = Math.ceil(count / 20);
            console.log(max);
            return saveOnePage(json.results);
        })
        .then(async function()  {
            for (let i = 0; i < max; i++) {
               await fetch(page).then(res => res.json())
                    .then(json => {
                        page = json.next;
                        console.log(page);
                        return saveOnePage(json.results);
                    })
            }
        })
        .catch(err => res.send(err));
}

exports.filterRegion = (req, res) => {

}

exports.filterPlatforms = (req, res) => {

}

async function saveOnePage(deals) {
    const db = getDb();
    for (let deal of deals) {
        await db.collection('deals').insertOne(deal);
    }
}
