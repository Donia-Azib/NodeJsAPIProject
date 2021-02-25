const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);

// install 
// npm install --save body-parser
// npm install --save express
// npm install --save mongoose
// npm install --save mongoose-unique-validator
// npm install --save bcrypt
// npm install --save jsonwebtoken
// npm install --save multer
