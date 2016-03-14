const NODEJS_ADDR = process.env.NODEJS_ADDR || 'localhost';
const NODEJS_PORT = process.env.NODEJS_PORT || 3000;

module.exports = {
  DEV_SERVER_PORT: 4596,

  BUILD_PATH: `${__dirname}/build`,

  NODEJS_ADDR,
  NODEJS_PORT,

  API_ORIGIN: `http://${NODEJS_ADDR}:${NODEJS_PORT}`
};
