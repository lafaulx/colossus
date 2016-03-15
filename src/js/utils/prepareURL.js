export default function prepareURL(endpoint) {
  // We on the server-side
  if (process.env.API_ORIGIN) {
    if (endpoint.indexOf(process.env.API_ORIGIN) === -1) {
      return process.env.API_ORIGIN + endpoint;
    }
  }

  return endpoint;
}
