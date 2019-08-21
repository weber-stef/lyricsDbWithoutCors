# LyricsDb

A minimalistic **MVC** (Model-View-Controller) Web Application with **CRUD** (create, read, update, delete) functionaly created with Node.js / MongoDB & Mongoose.js / Express.js and JSON 

#### "As slight as possible"
Since Express >= 4.16.0, body parser has been re-added under the methods express.json() and express.urlencoded(), this web app use only 2 dependency: [Express](https://expressjs.com) & [Mongoose](https://mongoosejs.com)


## Features
- Database seeding with sample data
- Express Middleware 
- Response object has a json() 
- MVC (Model-View-Controller)
- CRUD (create, read, update, delete)

## Setup & run

- Clone the repo
- You need a running instance of MongoDB  
`mongod`
- Install the dependencies  
`npm i`
- Run & Fun  
`npm run dev`

## Npm Scripts

- `npm run dev` uses nodemon (you need it global installed)
- `npm start` uses node


## Demo Examples

[Overview](https://lyricsdb.leandro-berlin.now.sh/) All the lyrics in DB
[Single Lyric](https://lyricsdb.leandro-berlin.now.sh/lyrics/5d5d1ae7ef607625c75d27d4)
