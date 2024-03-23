// importer la bibliotheque moment pour manipuler les dates et les heures
const moment = require('moment');

// definir une fonction pour formater un message
function formatMessage(data) {
    // creer un objet nome msg 
    var msg = {
        from: data.fromUser,            
        to: data.toUser,                
        message: data.msg,              
        date: moment().format("YYYY-MM-DD"),  
        time: moment().format("hh:mm a")      
    };
    // retourner l'objet msg
    return msg;
}

// exporter la fonction formatMessage pour qu'elle soit accessible depuis d'autres modules
module.exports = formatMessage;
