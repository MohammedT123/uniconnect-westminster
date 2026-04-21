const fs = require('fs');
let server = fs.readFileSync('server.js', 'utf8');
server = server.replace(
  'const app = express();',
  `const app = express();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// SECURITY HEADERS
app.use(helmet({ contentSecurityPolicy: false }));

// RATE LIMITING
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests, please try again later." }
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many login attempts, please try again in 15 minutes." }
});
app.use("/api/", limiter);
app.use("/api/auth/", authLimiter);`
);
fs.writeFileSync('server.js', server);
console.log('Done!');
