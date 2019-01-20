const fetch = require('node-fetch');
const getDb = require('../util/database').getDb;

require('dotenv').config();

exports.fetchData = (req, res) => {
    let page;
    let count;
    fetch(process.env.URL)
        .then(response => response.json())
        .then(json => {
            count = json.count;
            page = json.next;
            console.log(page);
            return saveOnePage(json.results);
        })
        .then(() => {
            for (let i = 0; i < Math.ceil(count / 20); i++) {
                async function getPage() {
                    let response = await fetch(page);
                    let json = await response.json();
                    page = json.next;
                    await saveOnePage(json.results);
                    return console.log(page);
                }
            }
        })
        .then(() => res.send('Done'))
        .catch(err => res.send(err));
}


exports.filterRegion = (req, res) => {

}

exports.filterPlatforms = (req, res) => {

}

const saveOnePage = deals => {
    const db = getDb();
    for (let deal of deals) {
        db.collection('deals').insertOne(deal);
    }
}
