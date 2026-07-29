async function apiRequest(path, options = {}) {
    const token = localStorage.getItem('responder_token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
    const data = await response.json();

    if (!response.ok) {
        const message = Array.isArray(data.message) ? data.message.join(', ') : data.message;
        throw new Error(message || 'Something went wrong.');
    }

    return data;
}

const api = {
    login: (email, workId) => apiRequest('/auth/patient/responder-login', { method: 'POST', body: JSON.stringify({ email, workId }) }),
    getByVitaIdRef: (vitaIdRef) => apiRequest(`/responder/golden-card/id/${vitaIdRef}`),
    searchByNameDob: (lastName, dob) => apiRequest(`/responder/golden-card/search?lastName=${encodeURIComponent(lastName)}&dob=${dob}`),
};