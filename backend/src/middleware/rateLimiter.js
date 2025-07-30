const rateLimit = require("express-rate-limit")



const rateLimiter = rateLimit({
  windowMs: 20 * 1000, // 60 seconds
  max: 10, // 100 requests per 60 seconds
  message: {
    message: "Too many requests, please try again later"
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
})


module.exports = rateLimiter
