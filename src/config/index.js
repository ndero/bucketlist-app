const config = {
  headers: {
    Authorization: `Token ${window.localStorage.getItem('token')}`,
    'content-Type': 'application/json',
  },
  BASE_URL: 'http://localhost:8000',
};

export default config;
