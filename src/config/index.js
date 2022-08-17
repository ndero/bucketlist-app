const config = {
  headers: {
    Authorization: `Token ${window.localStorage.getItem("token")}`,
    "content-Type": "application/json",
  },
  BASE_URL: import.meta.env.VITE_BASE_URL,
};

export default config;
