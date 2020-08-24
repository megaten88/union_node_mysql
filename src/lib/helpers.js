const bcrypt = require('bcryptjs');
const helpers = {
    encryptPassword: async function(password){
        let salt = await bcrypt.genSalt(10)
        let returnPass = await bcrypt.hash(password,salt);
        return returnPass;
    },
    comparePassword: async function(password,savedPass){
        try {
            return await bcrypt.compare(password,savedPass);
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = helpers;