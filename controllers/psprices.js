const fetch = require('node-fetch');
const Dealsummary = require('../model/psprices/dealsummary');
const qs = require('qs');

require('dotenv').config();

exports.filterBoth = (req, res) => {
    const body = qs.parse(req.body)
    let results = [];
    let regions = body.region_id;
    let platforms = body.platforms;
    if (regions.length < 2) {
        const temp = new Promise((resolve) => {
            try {
                Dealsummary
                    .find({ region_id: value, platforms: [platforms] })
                    .then(res => {
                        results.push(res);
                        resolve();
                    })
            } catch { err => console.log(err) }
        }).then(() => res.json(results))
    } else {
        const temp = new Promise((resolve, reject) => {
            regions.forEach((value, index, array) => {
                try {
                    Dealsummary
                        .find({ region_id: value, platforms: [platforms] })
                        .then(res => {
                            console.log(res);
                            results.push(res);
                            if (index === array.length - 1) resolve();
                        })
                } catch { err => console.log(err) }
            })
        }).then(() => res.json(results))
    }
}


exports.filterRegion = (req, res) => {
    Dealsummary.find({ region_id: req.params.id })
        .then(result => res.json(result));
}

exports.filterPlatforms = (req, res) => {
    Dealsummary.find({ platforms: [req.params.id] })
        .then(result => res.json(result));
}

exports.fetchData = (req, res) => {
    let page;
    let count;
    fetch(process.env.URL)
        .then(response => response.json())
        .then(json => {
            count = json.count;
            console.log(json);
            saveOnePage(json.results);
        })
        .then(async function () {
            for (let i = 2; i < Math.ceil(count / 20); i++) {
                await wait(20000);
                try {
                    fetch(`${process.env.URL}&page=${i}`)
                        .then(response => response.json())
                        .then(json => {
                            console.log(`Page${i} Done`);
                            return saveOnePage(json.results);
                        })
                        .catch(err => console.log(err));
                } catch { err => console.log(err) }
            }
        }).catch(err => console.log(err))
}

saveOnePage = deals => {
    deals.forEach(deal => {
        Dealsummary.findOneAndUpdate({id: deal.id}, (err, dealold) => {
            if (err) {
                const region_id = deal.region_id;
                const platforms = deal.platforms;
                const last_update_date = deal.last_update_date;
                const name = deal.name;
                const release_date = deal.release_date;
                const id = deal.id;
                const cover = deal.cover;
                const last_update = deal.last_update
                const dealsummary = new Dealsummary({
                    region_id: region_id,
                    platforms: platforms,
                    last_update_date: last_update_date,
                    name: name,
                    release_date: release_date,
                    id: id,
                    cover: cover,
                    last_update: last_update
                });
                return dealsummary.save();    
            } 
            dealold.region_id = deal.region_id;
            dealold.platforms = deal.platforms;
            dealold.last_update_date = deal.last_update_date;
            dealold.name = deal.name;
            dealold.release_date = deal.release_date;
            dealold.id = deal.id;
            dealold.cover = deal.cover;
            dealold.last_update = deal.last_update;
            dealold.save();
        })
        
    })
}

wait = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
