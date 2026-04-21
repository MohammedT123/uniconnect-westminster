const fs = require('fs');
let server = fs.readFileSync('server.js', 'utf8');
server = server.replace(
  'app.use("/api/auth", require("./routes/auth"));',
  'app.use("/api/auth", require("./routes/auth"));\napp.use("/api/admin", require("./routes/admin"));'
);
server = server.replace(
  'app.get("/profile"',
  'app.get("/admin", (req, res) => res.sendFile(path.join(v, "admin.html")));\napp.get("/profile"'
);
fs.writeFileSync('server.js', server);
console.log('Done!');
