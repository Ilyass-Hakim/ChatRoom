const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./messages/chatMessage'); 
const mongoClient = require('mongodb').MongoClient; 
// definition des noms de la base de donnees et des collections MongoDB
const dbname = 'chatApp';
const chatCollection = 'chats';
const userCollection = 'onlineUsers'; 
const port = 1000;
const database = 'mongodb://localhost:27017/';
const app = express();

const server = http.createServer(app);
const io = socketio(server);

// gestion des connexions socket
io.on('connection', (socket) => {
    console.log('New User Logged In with ID ' + socket.id);
    
    // lorsqu'un message de chat est reçu
    socket.on('chatMessage', (data) =>{ 
        var dataElement = formatMessage(data); // pour formater le message
        
        // connexion a la base de donnees MongoDB
        mongoClient.connect(database, (err, db) => {
            if (err)
                throw err;
            else {
                var onlineUsers = db.db(dbname).collection(userCollection); // collection des utilisateurs en ligne
                var chat = db.db(dbname).collection(chatCollection); // collection des messages de chat
                
                // inserer le message dans la collection de chat
                chat.insertOne(dataElement, (err, res) => { 
                    if(err) throw err;
                    socket.emit('message', dataElement); // emettre le message au client actuel
                });
                
                // trouver le destinataire du message dans la collection des utilisateurs en ligne
                onlineUsers.findOne({"name": data.toUser}, (err, res) => { 
                    if(err) throw err;
                    if(res != null) 
                        socket.to(res.ID).emit('message', dataElement); // emettre le message au destinataire
                });
            }
            db.close();
        });
    });

    // lorsqu'on reçoit les details de l'utilisateur
    socket.on('userDetails',(data) => { 
        mongoClient.connect(database, (err, db) => {
            if(err)
                throw err;
            else {
                var onlineUser = { 
                    "ID": socket.id,
                    "name": data.fromUser
                };
                var currentCollection = db.db(dbname).collection(chatCollection);
                var online = db.db(dbname).collection(userCollection);
                
                // inserer l'utilisateur en ligne dans la collection
                online.insertOne(onlineUser,(err, res) => { 
                    if(err) throw err;
                    console.log(onlineUser.name + " is online...");
                });
            
                // recuperer les messages entre les utilisateurs specifies
                currentCollection.find({ 
                    "from" : { "$in": [data.fromUser, data.toUser] },
                    "to" : { "$in": [data.fromUser, data.toUser] }
                },{projection: {_id:0}}).toArray((err, res) => {
                    if(err)
                        throw err;
                    else {
                        socket.emit('output', res); // emettre les messages au client actuel
                    }
                });
            }
            db.close();
        });   
    });  

    var userID = socket.id;
    
    // gestion de la deconnexion de l'utilisateur
    socket.on('disconnect', () => {
        mongoClient.connect(database, function(err, db) {
            if (err) throw err;
            var onlineUsers = db.db(dbname).collection(userCollection);
            var myquery = {"ID": userID};
            onlineUsers.deleteOne(myquery, function(err, res) {
              if (err) throw err;
              console.log("User " + userID + " went offline...");
              db.close();
            });
          });
    });
});

// configuration de l'application Express pour servir des fichiers statiques
app.use(express.static(path.join(__dirname, 'front')));

// ecoute du serveur sur le port specifie
server.listen(port, () => {
    console.log(`Chat Server listening to port ${port}...`);
});
