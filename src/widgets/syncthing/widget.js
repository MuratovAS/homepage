import credentialedProxyHandler from "utils/proxy/handlers/credentialed";

const widget = {
  api: "{url}/rest/{endpoint}",
  proxyHandler: credentialedProxyHandler,

  mappings: {
    report: {
      endpoint: "svc/report",
    },
    completion: {
      endpoint: "db/completion",
    },
    // connections: {
      // endpoint: "system/connections",
    // },
  },
};

export default widget;
