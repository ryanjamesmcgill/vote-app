# Vote'r : An Node / Express / MongoDB / React based voting app

<strong>live demo:</strong> <a href="https://voter-rjm.herokuapp.com/">https://voter-rjm.herokuapp.com/</a>

## Usage

```bash
$ git clone https://github.com/ryanjamesmcgill/vote-app.git you-project
$ cd your-project
$ npm install
$
$ npm run dev --- This will start the webpack bundling process, it will rebuild as you edit the React app
$ npm run build --- This will start a production build of the React app.
$ npm run start --- This will start the server, defaulting to port 3000
```

Run `npm run start`, and point a browser to `localhost:3000` and you're up and running!


## Enviornment

Create a .env file in base directory, and fill in the following values to enable your database, and oauth logins.

```bash
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
FACEBOOK_CALLBACK_URL=
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_CALLBACK_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
MONGOLAB_URI=
```
