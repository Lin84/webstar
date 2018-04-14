// server.js
const mokker = require('mokker')
const testData = require('./mock-data/test-data')

const routes = [
    {
        method: 'get',
        url: '/simple-get',
        json: { data: testData }
    },
]

mokker.start({ routes })
