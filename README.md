# urself
## Projet
* Interface permettant de s'identifier (email / mot de passe) et d'afficher selon le profil (admin / classique), soit la liste des utilisateurs (si admin), soit l'utilisateur courant (si classique). 
* un CRUD serait apprécié !

## Contraintes
* Framework front et back au choix
* La base de données doit être Mysql, avec un minimum de 2 tables 
Faire en sorte que ce soit modulaire et donc évolutif, avec tout ce que tu jugeras utile à nous montrer.  
Présentation du projet, justification éventuelle des choix...

## Ameliorations
* Stocker les jwt en db, et comparer à chaque requête entrante nécessitant une authentification
* Front: login automatique après register
* Remplacer les any restants

<!-- alter table users auto_increment = 4; -->