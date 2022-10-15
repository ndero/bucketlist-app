[![Coverage Status](https://coveralls.io/repos/github/ndero/bucketlist-frontend/badge.svg?branch=master)](https://coveralls.io/github/ndero/bucketlist-frontend?branch=master)  [![Build Status](https://travis-ci.org/ndero/bucketlist-frontend.svg?branch=master)](https://travis-ci.org/ndero/bucketlist-frontend)
<h1 align="center">Vue Bucketlist front end</h1>
<details>
<summary>
A vue frontend to consume the bucketlist API.
</summary>
<ul>
<li>Add bucketlists.</li>
<li>Add items to bucketlists.</li>
<li>Inline editing of items.</li>
<li>Delete items.</li>
<li>Mark items as done.</li>
<li>Show/hide items.</li>
<li>Toggle edit and delete buttons.</li>
</ul>
</details><br>

### Snapshot
![Screenshot of registration page](/public/registration.png)

### Setting up locally
##### Clone the repo and install node modules
```
git clone https://github.com/ndero/bucketlist-frontend.git
cd bucketlist-frontend
npm install
```

##### Compile and hot-reload for development
```
npm run dev
```

##### Compile and minify for production
```
npm run build
```

##### Run unit tests with [Vitest](https://vitest.dev/)
```
npm run test:unit
```

##### Run unit tests with coverage

```
npm run test:coverage
```

##### Setting up the API
To setup the api to consume with this frontend follow the instructions on this [README](https://github.com/ndero/bucketlist-api).
