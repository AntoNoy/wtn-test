# Test technique Back end

---

## Déroulé et organisation

Ce Test est en deux parties : MVP + Features bonus.

"MVP" : Ce sont les requirements minimum attendues pour la réalisation du test.

Features Bonus : fonctionnalités bonus "à la carte", appréciés mais non-obligatoire pour la réalisation du test.

L'objectif n'étant pas que tu y passes tout ton temps. Tu peux caper le développement de ce "projet" à 2h.

PS: n'hésites pas à le faire par étape ! (surtout pour la réalisation des bonus)

### Contexte de l'application

Pour une application de messageries interne à l'entreprise, nous souhaitons développer une API REST, permettant de lire, écrire, modifier et supprimer des messages.

Les messages seront de 2 types : SMS et email.

Un utilisateur sera en mesure de lire les messages qui lui ont été envoyés, d'y répondre et/ou de les supprimer.
L'utilisateur pourra aussi envoyer un message à un autre utilisateur de l'application et aussi modifier celui-ci.

Il n'est pas possible pour un utilisateur de lire/modifier/supprimer les messages destinés à un autre utilisateur.

Les messages comporteront au moins les informations suivantes :
- le message
- l'expéditeur
- la date d'envoi.

## Fonctionnalités souhaitées
- envoie de message
- lecture de message
- suppression de message
- lister tous les messages
- marquer un message comme lu

### BONUS :
- création d'utilisateur
- login d'utilisateur
- déconnexion
- accès à la corbeille
- répondre à un message spécifique
- modification et historisation d'un message

Tu pourras, si le temps te le permet, développer ces bonus. 

Dans le cas contraire, n'hésite pas à nous faire part de tes reflexions à l'écrit sur comment tu aurais réalisé ces bonus. 


## Contraintes techniques :
- API REST
- Node.js

## Bonus techniques :
- DB (de ton choix)
- Nest.js
- Docker
- tests fonctionnels

### Rendu

---

Tu pourras rendre ton projet, soit via un projet github soit via dossier zip.

Si tu choisis le format github, ne mentionne pas Wethenew. Tu pourras faire passer ça pour un projet perso ;) 
On compte sur toi ! 

L'équipe tech Wethenew