const fs = require('fs');
let server = fs.readFileSync('server.js', 'utf8');
server = server.replace(
  'app.get("/saved"',
  'app.get("/profile", (req, res) => res.sendFile(path.join(v, "profile.html")));\napp.get("/saved"'
);
fs.writeFileSync('server.js', server);
console.log('Done!');
