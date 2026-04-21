const fs = require('fs');
let server = fs.readFileSync('server.js', 'utf8');
server = server.replace(
  'app.get("/profile"',
  'app.get("/tips", (req, res) => res.sendFile(path.join(v, "tips.html")));\napp.get("/map", (req, res) => res.sendFile(path.join(v, "map.html")));\napp.get("/noticeboard", (req, res) => res.sendFile(path.join(v, "noticeboard.html")));\napp.use("/api/noticeboard", require("./routes/noticeboard"));\napp.get("/profile"'
);
fs.writeFileSync('server.js', server);
console.log('Done!');
