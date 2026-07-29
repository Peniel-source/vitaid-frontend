async function apiRequest(path, options = {}) {
    const token = localStorage.getItem('facility_token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
    const data = await response.json();

    if (!response.ok) {
        const message = Array.isArray(data.message) ? data.message.join(', ') : data.message;
        const err = new Error(message || 'Something went wrong.');
        err.details = data.errors || null; // 422 validation errors array
        throw err;
    }

    return data;
}

const api = {
    issueCredential: (facilityId) => apiRequest(`/facility-auth/${facilityId}/issue-credential`, { method: 'POST' }),
    login: (clientId, clientSecret) => apiRequest('/facility-auth/token', { method: 'POST', body: JSON.stringify({ clientId, clientSecret }) }),
    ingestFhir: (vitaIdRef, bundle) => apiRequest(`/fhir/${vitaIdRef}/ingest`, { method: 'POST', body: JSON.stringify(bundle) }),
};