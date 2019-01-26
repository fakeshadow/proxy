const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dealsummarySchema = new Schema({
    region_id: {
        type: Number,
        required: true
    },
    platforms: {
        type: Array,
        required: true
    },
    last_update_date: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    cover: {
        type: String
    },
    last_update: {
        type: Object
    }
});

module.exports = mongoose.model('Dealsummary', dealsummarySchema);