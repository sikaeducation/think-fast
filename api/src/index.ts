const app = require('./app');

const port = process.env.PORT;
app.set('port', port);

app.listen(port);
