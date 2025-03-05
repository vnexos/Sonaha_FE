const API_PREFIX = 'http://localhost:8080'

const propritiesEndpoint = {
    GET_ALL_PROPRITIES: `${API_PREFIX}/proprities`,
    GET_ID_PROPRITIES: `${API_PREFIX}/proprities/{ID}`,
    CRAETE_PROPERTY: `${API_PREFIX}/proprities/createProprityDto`,
    Del_ID_PROPRITIES: `${API_PREFIX}/proprities/deleteProperties/{ID}`,
    UPDATE_ID_PROPRITIES: `${API_PREFIX}/proprities/update-property/{ID}`
};

const bannerEndpoint = {
    GET_ALL_BANNER: `${API_PREFIX}/Banner/getAllBanner`,
    CREATE_BANNER: `${API_PREFIX}/Banner/newBanner`,
    DELETE_BANNER: `${API_PREFIX}/Banner/deleteBanner/{id}`
}
const provinceEndpoint = {
    GET_ALL_PROVINCE: `${API_PREFIX}/province`,
    GET_DISTRICTS: `${API_PREFIX}/province/{provinceID}/districts`,
    GET_WARDS: `${API_PREFIX}/province/district/{districtID}/wards`,
}
const albumEndpoint = {
    CRAETE_PROPERTY_IMG: `${API_PREFIX}/album/createImgList/{id}`,
    CRAETE_PROPERTY_VIDEO: `${API_PREFIX}/album/createVideo/{id}`,
    DELETE_ALBUM: `${API_PREFIX}/album/{id}`
}
export {
    propritiesEndpoint, bannerEndpoint, provinceEndpoint, albumEndpoint
};

