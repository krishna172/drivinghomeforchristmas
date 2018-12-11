# Phaser setup with docker-compose
## Setup
* Install `docker-compose` for your local machine.
* Call `docker-compose up`, this should build the image

## Build the whole image
- `docker-compose build`
- without using docker cache `docker-compose build --no-cache`

## Run an additional install 
`docker-compose exec frontend npm install` and maybe restart the container
## Source code based on
Typescript setup was taken from:
[https://github.com/digitsensitive/phaser3-typescript](https://github.com/digitsensitive/phaser3-typescript)

Docker setup was build with help of:

[https://medium.com/@zwegrzyniak/docker-compose-and-webpack-dev-server-hot-reloads-b73b65d13d79](https://medium.com/@zwegrzyniak/docker-compose-and-webpack-dev-server-hot-reloads-b73b65d13d79)

# python stuff
Create a virtual env (windows https://pypi.org/project/virtualenvwrapper-win/, linux `sudo apt install ipython virtualenvwrapper
`)
- `mkvirtualenv phaser`
- `pip install nodeenv`

Then you have a local npm setup without installing it globally. maybe nicer for debugging.
