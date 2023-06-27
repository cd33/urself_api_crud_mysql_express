# urself
## Projet
* Interface permettant de s'identifier (email / mot de passe) et d'afficher selon le profil (admin / classique), soit la liste des utilisateurs (si admin), soit l'utilisateur courant (si classique). 
* un CRUD serait apprécié !

## Contraintes
* Framework front et back au choix
* La base de données doit être Mysql, avec un minimum de 2 tables 
Faire en sorte que ce soit modulaire et donc évolutif, avec tout ce que tu jugeras utile à nous montrer.  
Présentation du projet, justification éventuelle des choix...

## Demo
* date d'expiration

## TODO
### FRONT
* admin update
récupérer le body coté api, user.tsx


### BACK: 
* user.middleware.ts, créer controle sur l'update et delete des variables
* Tests, puis revoir sur la sécurité et les controles
* Virer les any

## Ameliorations
* Stocker les jwt en db, et comparer à chaque requête entrante nécessitant une authentification
* Pour le user, getUserByUserId seulement si c'est son id
* Users: ajouter date d'inscription ?
* User: modification de son mot de passe et suppression compte ? Page de paramètre user ?
* Front: login automatique après register

## FRONT
* HOMEPAGE:
  - Si admin: Afficher liste des users (leurs ids, noms et mails) + possibilité de les supprimer
  - Si classicUser: afficher mon nom et mail + possibilité de modifier/supprimer mon compte


<!-- alter table users auto_increment = 4; -->
<!-- U6h?Lx%939Xkm= -->