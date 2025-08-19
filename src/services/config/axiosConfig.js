import axios from 'axios';

// FUTURE SCOPE - token
// const setToken = (token) => {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };

const request = async config => {
  const callBack = axios(config);
  return callBack
    .then(() => {
      return callBack;
    })
    .catch(async error => {
      return error;

      //FUTURE SCOPE - Handle status code for 422/403/404/422/503

      // FUTURE SCOPE - handle refresh token
      // if (error?.response?.status === 401) {
      //   const result = await refreshToken();
      //   if (result !== null) {
      //     try {
      //       config.headers = {
      //         common: {
      //           Authorization: `Bearer ${result}`,
      //         },
      //       };
      //     } catch (error) {
      //       console.log(error);
      //     }
      //     return axios(config);
      //   } else {
      //     return axios(config);
      //   }
      // } else {
      //   return error;
      // }
    });
};

export { request };
