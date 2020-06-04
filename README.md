### Project: THPGram

20200603-05 Julie K

---

This project is base on [this starter](https://github.com/julienemo/react_starter) and [this API](https://github.com/julienemo/thp_next_42) (which you will need to see the demo)

---

#### Difficulties

1. get jsx readable error from rails model validation error
2. in general, fetch error handling
3. how to let rails API accept params on result ordering ?
4. how to prefill antD form with existing value in edit ?
5. things work on chrome but got huge "TypeError: b is undefined" in firefox....
6. "Method PATCH is not allowed by Access-Control-Allow-Methods in preflight response.
   ChangeImage.jsx:16 PATCH http://localhost:3000/image"

#### Discoveries

1. to get the headers from an API call, you'll need to intercept in the very first `then`, before `response.json()`. To get the authorization header, will need to do `response.headers.get('Authorization')`. `response.headers` alone will always be an empty object. To pile it with the response body, see [this SO solution](https://stackoverflow.com/questions/41812056/extract-both-json-and-headers-from-fetch/53826511#53826511).
2. It is possible to pass object props from Link to Route like [this](https://www.youtube.com/watch?v=nmbX2QL7ZJc), but it won't persist. Not sure how interesting it is, but there is one less API call.
3. Despite my cors settings, `PATCH` requests are still blocked. [this chrome extension](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino/related) is doing fine for now.

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
- [x] user should be able to change description and is_private of own photo
- [x] user should be able to delete own photo (only from detail view, not from list view)
- [x] user should be able to click on a photo to see detail and relevant comments
- [x] own profile or other people's profile should contain a list of photo of the user
- [x] on click of username, should be directed to user profile (both from image and from comment)

L'usager doit pouvoir supprimer son compte

L'usager doit pouvoir commenter une image
L'usager doit pouvoir supprimer un de ses commentaires

other people's profile :username, first_name, last name initial
own profile: Username, first_name, last_name, email, created_at
own profile: modify Username, first_name, last_name, email
