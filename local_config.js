const NODEJS_ADDR = process.env.NODEJS_ADDR || 'localhost';
const NODEJS_PORT = process.env.NODEJS_PORT || 3000;

module.exports = {
  BUILD_PATH: `${__dirname}/build`,

  NODEJS_ADDR,
  NODEJS_PORT,

  API_ORIGIN: `http://${NODEJS_ADDR}:${NODEJS_PORT}`,
};
