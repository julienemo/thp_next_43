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
- [x] a private photo should only be visible by the uploader
- [ ] user should be able to upload a photo (the real photo is not ready but API call ok)
- [ ] user should be able to change description of own photo
- [ ] user should be able to delete own photo
- [ ] user should be able to decide and modify whether a photo is private
- [x] user should be able to click on a photo to see detail and relevant comments

L'usager doit pouvoir supprimer son compte
L'usager doit pouvoir consulter son profil usager (Username, first_name, last_name, email, created_at)
L'usager doit pouvoir éditer son profil (email, prénom, nom)

L'usager doit pouvoir commenter une image
L'usager doit pouvoir supprimer un de ses commentaires

En cliquant sur l'username, l'usager peut consulter la page de profile du username sur lequel il a cliqué et donc voir :username, first_name, last name inital, Sa liste d'image
