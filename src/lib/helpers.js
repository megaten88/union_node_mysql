const bcrypt = require('bcryptjs');
const helpers = {
    encryptPassword: async function(password){
        let saltRounds = 10;
        let salt = await bcrypt.genSalt(saltRounds);
        let returnPass = await bcrypt.hash(password,salt);
        return returnPass;
    },
    comparePassword: async function(password,savedPass){
        try {
            console.log(await bcrypt.compare(password,savedPass));
            return await bcrypt.compare(password,savedPass);
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = helpers;