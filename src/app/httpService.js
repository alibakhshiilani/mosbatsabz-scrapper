const Agent = require("agentkeepalive");
const { default: axios } = require("axios");
const HttpsAgent = require("agentkeepalive").HttpsAgent;

const keepAliveAgent = new Agent({
  maxSockets: 160,
  maxFreeSockets: 160,
  timeout: 60000,
  freeSocketTimeout: 30000,
  keepAliveMsecs: 60000,
});

const httpsKeepAliveAgent = new HttpsAgent({
  maxSockets: 160,
  maxFreeSockets: 160,
  timeout: 60000,
  freeSocketTimeout: 30000,
  keepAliveMsecs: 60000,
});

const httpService = axios.create({
  //   baseURL: config.domain,
  httpAgent: keepAliveAgent,
  httpsAgent: httpsKeepAliveAgent,
});

exports.httpService = httpService;
