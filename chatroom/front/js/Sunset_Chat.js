// etablissement de la connexion avec le serveur WebSocket
socket = io();

// recuperation des elements du DOM
const chatForm = document.getElementById('chat-form'); 
const chatMessages = document.querySelector('.chat-messages'); 
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true }); 

// initialisation des variables pour l'expediteur et le destinataire par defaut
let fromUser = "Ilyass";
let toUser = "Prof.H.BENALLA";

// fonction pour mettre a jour les details de l'utilisateur
function storeDetails() {
    // recuperation des valeurs des champs d'expediteur et de destinataire
    fromUser = document.getElementById('from').value;
    toUser = document.getElementById('to').value;
    // emission des details de l'utilisateur au serveur via WebSocket
    socket.emit('userDetails', { fromUser, toUser });
}

// soumission du formulaire de chat
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // empeche le comportement par defaut du formulaire
    // recuperation du message a envoyer
    const msg = e.target.elements.msg.value;
    // creation de l'objet contenant les details du message
    const final = {
        'fromUser': fromUser,
        'toUser': toUser,
        'msg': msg
    };
    // emission du message au serveur via WebSocket
    socket.emit('chatMessage', final);
    // effacement du champ de saisie
    document.getElementById('msg').value = "";
});

// ecoute des evenements provenant du serveur

// reception de l'historique de chat initial
socket.on('output', (data) => {
    // affichage de l'historique de chat
    for (var i = 0; i < data.length; i++) {
        outputMessage(data[i]);
    }
    // defilement automatique vers le bas pour afficher les derniers messages
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// reception de nouveaux messages
socket.on('message', (data) => {
    // affichage du nouveau message
    outputMessage(data);
    // defilement automatique vers le bas pour afficher le nouveau message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// fonction pour afficher un message dans le DOM
function outputMessage(message) {
    // creation d'un element div pour le message
    const div = document.createElement('div');
    // ajout des classes CSS au div
    div.classList.add('message');
    // remplissage du contenu HTML du div avec les détails du message
    div.innerHTML = `<p class="meta">${message.from}<span> ${message.time}, ${message.date}</span></p>
    <p class ="text">${message.message}</p>`;
    // ajout du div contenant le message a la section des messages
    document.querySelector('.chat-messages').appendChild(div);
}
