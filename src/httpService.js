import axios from 'axios';

const API_URL = process.env.apiUrl;
const API_KEY = process.env.apiKey;
const IP_URL = process.env.NEXT_PUBLIC_IP_URL;

const getClientIp = async () => {
  try {
    const res = await axios(IP_URL);
    return res.data;
  } catch (err) {
    return err?.response?.data;
  }
};

const getGeoLocation = async (ip) => {
  try {
    const res = await axios(`${API_URL}?apiKey=${API_KEY}&ip=${ip}`);
    return res.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export { getClientIp, getGeoLocation };
