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

#### Discoveries

1. to get the headers from an API call, you'll need to intercept in the very first `then`, before `response.json()`. To get the authorization header, will need to do `response.headers.get('Authorization')`. `response.headers` alone will always be an empty object. To pile it with the response body, see [this SO solution](https://stackoverflow.com/questions/41812056/extract-both-json-and-headers-from-fetch/53826511#53826511).
2. It is possible to pass object props from Link to Route like [this](https://www.youtube.com/watch?v=nmbX2QL7ZJc), but it won't persist. Not sure how interesting it is, but there is one less API call.
3. Despite my cors settings, `PATCH` requests are still blocked. [this chrome extension](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino/related) is doing fine for now. (PUT is also available)
4. Browser NEEDS to have redux-devtool extension
5. AntD has a file uploading component, [here](https://stackoverflow.com/a/56323485/9079168) is how to personalize it to encode content with base64
6. [here](https://stackoverflow.com/a/8499716/9079168) is how to display base64 encoded content

#### Specs

**Account related**

- [x] user should be able to create account
- [x] user should be able to log in with existing account
- [x] un-logged user should be redirected to login page (if user tries to access a private route)
- [x] user should be able to log out and token revoked

**Image related**

- [x] user should see all photos he can see (from home)
- [x] user should be able to view own photos (from profile)
- [x] photo list should ordered by date, latest first
- [x] a private photo should only be visible by the uploader
- [x] user should be able to upload a photo (the real photo is not ready but API call ok)
- [x] user should be able to change description and is_private of own photo
- [x] user should be able to delete own photo (only from detail view, not from list view)
- [x] user should be able to click on a photo to see detail and relevant comments
- [x] user should be able to see username of photo uploader
- [x] on click of username, should be directed to user profile (both from image and from comment)

**Comment related**

- [x] user should be able to delete own comment (from image detail view)
- [x] user should be able to comment any visible image

**Profile related**

- [x] own profile or other people's profile should contain a list of photo of the user
- [ ] own profile should show Username, first_name, last_name, email, created_at
- [ ] own profile should allow modify Username, first_name, last_name, email
- [ ] own profile should allow delete account delete account
- [ ] other people's profile should show: username, first_name, last name initial
