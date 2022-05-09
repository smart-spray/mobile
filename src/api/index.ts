import axios from "axios";

const baseURL = "https://smart-spray-api.eastus.cloudapp.azure.com";

const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use((request) => {
//   console.log({ request });
//   return request;
// });

// api.interceptors.response.use(
//   (response) => {
//     if (response.data.access_token) {
//       api.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
//     }
//     return response;
//   },
//   (err) => console.log({ err })
// );

export { api };
