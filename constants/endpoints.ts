const API_PREFIX = ''

// vứt cái get all properties điiii 
// đường link
const propritiesEndpoint = {
    GET_ALL_PROPRITIES: `${API_PREFIX}/proprities`,
};
const bannerEndpoint = {
    GET_ALL_BANNERS:`${API_PREFIX}/Banner/getAllBanner`,
}
const provinceEndpoint = {
    GET_APP_PROVINCES:`${API_PREFIX}/province`
}
// code ảo vãi lồn
const districEndpoint = {
    GET_ALL_DISTRIC:`${API_PREFIX}/province/{provinceId}/districts`
}

 const propertiesEndpoint = {
    FILTER_PROPERTIES: `${API_PREFIX}/filtersearch/filterTinhThanhTypeKhoangGia`,
  };
const detailPropertiesEndpoint = {
    DETAIL_PROPERTIES :`/proprities/{id}`,
}
export {
    bannerEndpoint, districEndpoint,
    propertiesEndpoint, propritiesEndpoint, provinceEndpoint,
    detailPropertiesEndpoint
};

