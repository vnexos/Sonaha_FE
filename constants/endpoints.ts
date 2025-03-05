const API_PREFIX = "";

const propritiesEndpoint = {
  GET_ALL_PROPRITIES: `${API_PREFIX}/proprities`,
};

const authEndpoint = {
  LOGIN: `${API_PREFIX}/auth/login`,
  DETAIL: `${API_PREFIX}/auth/detail`,
  CHECK_TOKEN: `${API_PREFIX}/auth/checkToken?token={token}`,
};

const provinceEndpoint = {
  GET_ALL_PROVINCE: `${API_PREFIX}/province`,
};

export { authEndpoint, propritiesEndpoint, provinceEndpoint };
