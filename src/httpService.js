import axios from 'axios';

const API_URL = process.env.apiUrl;
const API_KEY = process.env.apiKey;
const IP_URL = process.env.NEXT_PUBLIC_IP_URL;

const getIp = async () => {
  const res = await axios(IP_URL);
  const { ip } = res.data;

  return ip;
};

const getGeoLocation = async (ip) => {
  const res = await axios(`${API_URL}?apiKey=${API_KEY}&ip=${ip}`);
  const { data } = res;

  return data;
};

export { getIp, getGeoLocation };
