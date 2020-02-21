let jwt = require('jsonwebtoken')
let verifytoken = require('./jwt_verify')

module.exports = function() {
    return async function(ctx, next) {
        try {
            const token = ctx.header.authorization
            if(token) {
                let payload
                try {
                    payload = await verifytoken(token)
                    console.log(payload)
                    ctx.state.user = {
                        number: payload.number,
                        password: payload.password
                    }
                    // console.log('--------------------\n',ctx)
                    // console.log('--------------------')
                } catch(err) {
                    console.log('verfytoken.ts token verify fail', err)
                }
            } 
            await next(ctx)
        } catch(err) {
            if(err.status === 401){
                ctx.response.status = 401;
                ctx.response.body = 'Protected resource, use Authorization header to get access\n';
            }else{
                throw err;
            }
        }
    }
}