
## Installation -- You will need to install Node before hand.
1. Clone repo(which ever method you prefer)/or download the whole zip version
2. open command prompt/terminal and change directory to the project folder
3. Install npm modules: `npm install` (for mac you will need root user access.... using something like -root or something)
4. install bower through npm : `npm install -g bower`
5. Install bower dependencies `bower install` 
6. Start up the server: `node server.js`
7. View in browser at http://localhost:8080

Testing account:
	user: admin
	password: password



for those that are going to work on backend/want to mess around back end for learning purpose.
you might want to install nodemon, running server using nodemon will auto restart server whenever it detects changes.
dont need to manaully kill server and restart everytime.
npm install nodemon -g
instead of using node server.js to start server. use nodemon server.js