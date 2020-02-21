let config = require('../config')
let koaJwt = require('jsonwebtoken')

module.exports = async (str) => {
    let new_str
    if (koaJwt.verify(str.split(" ")[1], config.secret)) {
        new_str = await koaJwt.verify(str.split(" ")[1], config.secret)
        return new_str
    } else {
        console.log('无效的')
        return false
    }
}