        ****  Mini-Projet : Application de Chat avec MongoDB et Socket.io ***

Cher Prof vous trouverez ci-joint le projet consistant en une application de chat en temps reel developpee avec les technologies MongoDB, Express.js et Socket.io. L'objectif etait de creer une plateforme permettant a plusieurs utilisateurs de communiquer entre eux via des messages texte, tout en stockant ces messages dans une base de donnees pour une recuperation ulterieure.

**Fonctionnalites principales :
Envoi et reception de messages en temps reel : Les utilisateurs peuvent envoyer des messages et les autres utilisateurs connectes recoivent ces messages instantanement grace a la technologie Socket.io.

**Persistance des donnees : Les messages de chat sont enregistres dans une base de donnees MongoDB pour permettre une recuperation ulterieure et garantir une experience utilisateur coherente.

**Gestion des utilisateurs en ligne : L'application gere les utilisateurs en ligne en ajoutant et supprimant dynamiquement leurs informations dans la base de donnees.

**Structure du code :
Le code de l'application est organise de maniere modulaire et reutilisable. Chaque partie du code est accompagnee de commentaires explicatifs pour en faciliter la comprehension et l'entretien. Voici une breve description des principaux fichiers et dossiers :

server.js : Ce fichier contient le code principal du serveur, y compris la configuration de Socket.io et les routes de l'API.

messages/ : Ce dossier contient les modules utilitaires, tels que le formateur de messages (chatMessage.js), utilise pour formater les messages avant de les stocker en base de donnees.

front/ : Ce dossier contient les fichiers frontend de l'application, tels que les fichiers HTML, CSS et JavaScript necessaires a l'interface utilisateur.

**Perspectives d'amelioration :
Ajouter des fonctionnalites de securite telles que l'authentification des utilisateurs.
Ameliorer l'interface utilisateur avec des fonctionnalites telles que l'affichage des utilisateurs en ligne et la gestion des conversations.

**Test :
L'application a ete testee avec des donnees simulees pour verifier le bon fonctionnement des fonctionnalites de chat en temps reel et de persistance des donnees.

Pour tester l'application localement, suivez ces etapes :

1. Clonez ce depot sur votre machine en utilisant la commande suivante dans votre terminal : $ git clone https://github.com/Ilyass-Hakim/ChatRoom.git

2. Accedez au repertoire du projet : $ cd chatroom

3. Installez les dependances avec la commande : $ npm install

4. Demarrez le serveur avec la commande : $ node server.js

5. Une fois le serveur demarre, ouvrez votre navigateur et accedez a l'application a l'adresse suivante : http://localhost:1000/Sunset_Chat.html



