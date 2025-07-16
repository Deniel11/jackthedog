
# Jack the dog 🐾

This is a static webpage for my dog Jack. His dog tag contains a QR code linking here, so if he gets lost, it’s easy for someone to contact us and help bring him home.

## Live Demo

The project is deployed and available at: [https://jackthedog.eu](https://jackthedog.eu) 🐾  
Feel free to check it out!

## Use for local working

> First step: clone the repository.

You can use it, for local purpose. You need a Docker. If you have, then you need to use `docker compose up -d` command for build and run the static webpage.

If you made the `compose up` command and alredy have the docker container, then if you don't need it use `docker compose down` command.

## Config manage

There is a configuration file called `config.js`, where you can customize various settings.

The default language is English, and the `languages` object typically contains multiple entries. If you'd like to add more languages, simply create a corresponding JSON file in the `translations` folder using the new language code as the filename.

The `minimum_image` and `image_count` values define the image range. If you have images, set `minimum_image` to the lowest image index (usually 1), and `image_count` to the highest. If no images are used, both values should be set to 0.

### Config javascript:
```javascript
const config = {
    "default_language": "en",
    "languages": {
        "en": {
            "emoji": "🇬🇧",
            "name": "English"
        }
    },
    "minimum_image": 1,
    "image_count": 8
};
```

## Easy content manage

My setup is easy, looks like an `api` call, but that case I don't need an `api`, so I use just `json` files.

If you want change the details, than there is a `contats` and `translations` folders. There are the `json` files which are contains all of the details to the webpage.

### Emails json:
```json
{
    "emails": [
        "email1@gmail.com",
        "email2@gmail.com"
    ]
}

```

### Mobiles json:
```json
{
    "mobiles": [
        "+999 99 999 9999",
        "+001 99 999 9999"
    ]
}

```

### English language - en json:
```json
{
    "title": "Jack",
    "description": {
        "title": "About Me",
        "message": "Lovely dog."
    },
    "size": {
        "title": "Size",
        "message": "Medium"
    },
    "weight": {
        "title": "Weight",
        "message": "10 kg"
    },
    "color": {
        "title": "Color",
        "message": "Black"
    },
    "nature": {
        "title": "Nature",
        "message": "Friendly"
    },
    "allergy": {
        "title": "Allergy",
        "message": "None"
    },
    "tricks_language": {
        "title": "Command Words Language",
        "message": "English"
    },
    "tricks": {
        "title": "Command Words",
        "message": "Sit"
    },
    "call": "If you found him, please call:"
}

```

## Image setup

> Image format: JPG

If you want to use images, upload them to the images folder.

Use numbers for the image filenames, like: `1.jpg`, `2.jpg`, etc.

For the smaller thumbnail versions, use this format: `thumb-1.jpg`, `thumb-2.jpg`, etc.

## Use for deploying

If you want deploy your static webpage it's easy with `Heroku`. I use that service, but what you want. For the perfect working I need to create an empty `composer.json` file for the `Heroku`. Because detected that files and after that check the `dockerfile` and create the docker image.

## Overall

This static webpage is perfect for that purpose, because it can be deploy and I want change enything, then all I need to make a new commit and push my new code and if ha auto deploy, then that's it.

And ofcourse, not too large, not too many, so it's working with desktop site and mobile site.

## 📜 License
This project is open-source and free to use under the [MIT License](https://opensource.org/license/mit/).

## Contact

@ Daniel Czank

Likedin: [/daniel-czank](https://www.linkedin.com/in/daniel-czank/)

Email: danielczank01@gmail.com

Let's check my other projects in GitHub [Deniel11](https://github.com/Deniel11)