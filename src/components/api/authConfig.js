const token = localStorage.getItem('accessToken');
const config = {
    headers: {
        'Authorization' : `Bearer ${token}`
    },
};

export default config;
