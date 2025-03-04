const API_PREFIX = "";

const propritiesEndpoint = {
  GET_ALL_PROPRITIES: `${API_PREFIX}/proprities`,
};

const authEndpoint = {
  LOGIN: `${API_PREFIX}/auth/login`,
  DETAIL: `${API_PREFIX}/auth/detail`,
  CHECK_TOKEN: `${API_PREFIX}/auth/checkToken?token={token}`,
};

export { authEndpoint, propritiesEndpoint };
