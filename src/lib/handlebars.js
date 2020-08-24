const {format} =require('timeago.js')
const helpers={
    isRed: function(value){
        if(value==1){
            return "Red";
        }
        return "White"
    },
    timeago: function(timestamp){
        return format(timestamp)
    }
};
module.exports = helpers;