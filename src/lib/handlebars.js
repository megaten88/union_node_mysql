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
    },
    getRole: function(value){
        if(value=="admin"){
            return "Administrator";
        }else if(value=="sellet"){
            return "Seller";
        }else{
            return "Consultant";
        }
    }
};
module.exports = helpers;