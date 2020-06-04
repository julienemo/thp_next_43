### Project: THPGram

20200603-05 Julie K

---

This project is base on [this starter](https://github.com/julienemo/react_starter) and [this API](https://github.com/julienemo/thp_next_42) (which you will need to see the demo)

---

#### Difficulties

1. get jsx readable error from rails model validation error
2. in general, fetch error handling
3. how to let rails API accept params on result ordering ?

#### Discoveries

1. to get the headers from an API call, you'll need to intercept in the very first `then`, before `response.json()`. To get the authorization header, will need to do `response.headers.get('Authorization')`. `response.headers` alone will always be an empty object. To pile it with the response body, see [this SO solution](https://stackoverflow.com/questions/41812056/extract-both-json-and-headers-from-fetch/53826511#53826511).

#### Specs

- [x] user should be able to create account
- [x] user should be able to log in with existing account
- [x] un-logged user should be redirected to login page (if user tries to access a private route)
- [x] user should be able to log out and token revoked
- [x] user should see all photos he can see (from home)
- [x] user should be able to view own photos (from profile)
- [x] photo list should ordered by date, latest first
- [x] user should be able to see username of photo uploader

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

En cliquant sur une image, l'usager doit pouvoir consulter une image en particulier avec ses commentaires
L'usager doit pouvoir commenter une image
L'usager doit pouvoir supprimer un de ses commentaires

1. Bonus
   L'usager peut passer une image en privée et cette dernière devient visible uniquement par l'usager.

   En cliquant sur l'username, l'usager peut consulter la page de profile du username sur lequel il a cliqué et donc voir :
   Son username
   Son Prénom/Nom
   Son Email
   Sa date d'inscription
   Sa liste d'image
