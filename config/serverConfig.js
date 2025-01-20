const dotenv = require('dotenv');

dotenv.config();

exports.PORT = process.env.PORT || 5000;
exports.DB_URL = process.env.DB_URL;
