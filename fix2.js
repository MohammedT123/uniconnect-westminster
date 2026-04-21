const fs = require('fs');
let server = fs.readFileSync('server.js', 'utf8');
server = server.replace(
  'app.use("/api/auth", require("./routes/auth"));',
  'app.use("/api/auth", require("./routes/auth"));\napp.use("/api/adzuna-jobs", require("./routes/adzuna"));'
);
fs.writeFileSync('server.js', server);
console.log('Done!');
