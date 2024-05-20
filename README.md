# Minecraft heads cdn
a basic cdn to fetch minecraft players heads.

## Project setup
After cloned the project use the following command
```sh
npm install
```

### Run project
```sh
npm run start
```

## Routes

### `[GET] /:username`
Get a skull of minecraft user. \
When you're trying to get a user skull, it will add it into a folder (named "skulls"), the first time you'll get a skull it will fetch it and then add it into the folder, other time it will fetch in the folder to get the skull.

Example with the username `vidon` \
<img src="https://github.com/Matteo0810/minecraft-heads-cdn/assets/40558258/14c65b4e-2954-43d7-a68b-27f88ff8bff1" alt="vidon's head" width="100" height="100" />

### `[POST] /`
Upload a skull by passing the username in the body \
**Note:** require an Authentication Bearer **(check .env to find it)**
