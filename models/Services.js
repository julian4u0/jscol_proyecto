/**
 * This will be the model to save our registered
 * users
 * Roles: ['Admin', 'User']
 */

const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    miniumPrice: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('service', ServiceSchema);