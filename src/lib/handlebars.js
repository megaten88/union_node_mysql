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
        }else if(value=="seller"){
            return "Seller";
        }else{
            return "Consultant";
        }
    },
    isIndoor: function(value){
        if(value=="0"){
            return "Indoor"
        }else{
            return "Outdoor"
        }
    }
};
module.exports = helpers;