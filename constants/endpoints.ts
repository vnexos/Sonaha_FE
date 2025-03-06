const API_PREFIX = "";

const propritiesEndpoint = {
  GET_ALL_PROPRITIES: `${API_PREFIX}/proprities`,
};

const authEndpoint = {
  LOGIN: `${API_PREFIX}/auth/login`,
  DETAIL: `${API_PREFIX}/auth/detail`,
  CHECK_TOKEN: `${API_PREFIX}/auth/checkToken?token={token}`,
};
const contactEndpoint = {
  SEND_CONTACT: `${API_PREFIX}/contact`,
  GET_CONTACT: `${API_PREFIX}/contact`,
  DELETE_CONTACT: `${API_PREFIX}/contact{id}`,
};

const provinceEndpoint = {
  GET_ALL_PROVINCE: `${API_PREFIX}/province`,
};

export { authEndpoint, contactEndpoint, propritiesEndpoint, provinceEndpoint };

