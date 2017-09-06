import axios from 'axios';

export const getMetaInfo = () => axios.get('/api/v1.0/user/me/metainfo');
export const patchMetaInfo = () => axios.get('/api/v1.0/user/me/metainfo');