const axios = require('axios');

const api = axios.create({
	baseURL: 'http://localhost:8080',
});

test('GET /health', async () => {
    const response = await api.get('/health');
    expect(response.status).toEqual(200);
})
