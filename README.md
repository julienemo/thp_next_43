### Project: THPGram

20200603-05 Julie K

---

This project is base on [this starter](https://github.com/julienemo/react_starter) and [this API](https://github.com/julienemo/thp_next_42) (which you will need to see the demo)

---

#### Discoveries

1. rails validation errors are always an object with keys that you can't know in advance, this is really unpleasant for readability
2. to get the headers from an API call, you'll need to intercept before `response.json()`. To get the authorization header, will need to do `response.headers.get('Authorization')`. `response.headers` alone will always be an empty object.

#### Specs

- [x] user should be able to create account
- [x] user should be able to log in with existing account
- [x] unlogged user should be redirected to login page (if user tries to access a private route)
- [x] user should be able to log out and token revoked

L'usager doit pouvoir supprimer son compte
L'usager doit pouvoir consulter son profil usager :
Username
Prénom/Nom
Email
Date d'inscription
L'usager doit pouvoir éditer son profil (email, prénom, nom)
L'usager doit pouvoir uploader une image avec une description
L'usager doit pouvoir modifier la description d'une de ses images
L'usager doit pouvoir supprimer une de ses images
L'usager doit pouvoir consulter ses images
L'usager doit pouvoir consulter une liste d'images ordonnées par date, tout usager confondu.
En cliquant sur une image, l'usager doit pouvoir consulter une image en particulier avec ses commentaires
L'usager doit pouvoir commenter une image
L'usager doit pouvoir supprimer un de ses commentaires

3. Bonus
   L'usager peut passer une image en privée et cette dernière devient visible uniquement par l'usager.
   L'usager doit pouvoir voir le username de la personne qui a upload l'image.
   En cliquant sur l'username, l'usager peut consulter la page de profile du username sur lequel il a cliqué et donc voir :
   Son username
   Son Prénom/Nom
   Son Email
   Sa date d'inscription
   Sa liste d'image
