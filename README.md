# urself
## Projet
* Interface permettant de s'identifier (email / mot de passe) et d'afficher selon le profil (admin / classique), soit la liste des utilisateurs (si admin), soit l'utilisateur courant (si classique). 
* un CRUD serait apprécié !

## Contraintes
* Framework front et back au choix
* La base de données doit être Mysql, avec un minimum de 2 tables 
Faire en sorte que ce soit modulaire et donc évolutif, avec tout ce que tu jugeras utile à nous montrer.  
Présentation du projet, justification éventuelle des choix...

## TODO
* SERVER: Sécuriser le jwt, refresh, changement de mot de passe...
* SERVER: Différencier les droits user et admin
* FRONT: réadapter le front avec les changements de l'api
* FRONT: navbar, ajouter déconnexion, afficher login et register seulement si déconnecté et inversement avec home
* SERVER: Tests, puis revoir sur la sécurité et les controles
* Virer les any

## FRONT
* LOGIN PAGE:
  - form avec 2 inputs email et password
  - login => state global, jwt => reconnexion automatique, si jwt présent et non périmé
  <!-- - controle sur les inputs (errors et touched) -->
  <!-- ajouter date d'inscription ? -->
* REGISTER PAGE:
  - form avec 4 inputs name, email, password et confimationPassword
  - création du user si non existant
  <!-- - ajouter des controles en amont et après l'envoi de la requete (dto...) -->
* HOMEPAGE:
  - Si pas loggé, redirection login
  - Si admin: Afficher liste des users (leurs ids, noms et mails) + possibilité de les supprimer
  - Si classicUser: afficher mon nom et mail + possibilité de modifier/supprimer mon compte
  <!-- - modification du mot de passe ? -->


<!-- alter table users auto_increment = 5; -->