### Project: THPGram

20200603-05 Julie K

---

This project is base on [this starter](https://github.com/julienemo/react_starter) and [this API](https://github.com/julienemo/thp_next_42) (which you will need to see the demo)

---

#### Discoveries

1. rails validation errors are always an object with keys that you can't know in advance, this is really unpleasant for readability
2. to get the headers from an API call, you'll need to intercept before `response.json()`. To get the authorization header, will need to do `response.headers.get('Authorization')`. `response.headers` alone will always be an empty object.
