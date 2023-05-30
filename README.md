# Web-Music-Player-Server
Authors: Ruiyang Xu, Vincent Kong, Jiaxu Li, Chenyu Yang

Dependencies: mysql, ali-oss, fs, multer

Description: This project is a backend startup project for a web music player, in the controllers folder, 
adminController.js will support the administer to upload music, edit music information and delete bot users and search all music which is already stored in the database.
userController.js will support the user to register and login to our Web Music Player application.

How to build this Project: This project is a backend project which are using Nodejs as our runtime environment, JavaScript as development language. 
In the meantime, we are express framework, body-parser is the HTTP request body parsing middleware, and we are using cors to complete the cross-domain request of the front and back end. 
And we are using the MySql as our project database.

How to start: 
npm install: install all Dependencies
node/nodemon app.js: start backend project at port 3000
