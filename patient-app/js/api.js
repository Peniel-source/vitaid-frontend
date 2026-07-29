async function apiRequest(path, options = {}) {
    const token = localStorage.getItem('vitaid_token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
    const data = await response.json();

    if (!response.ok) {
        const message = Array.isArray(data.message) ? data.message.join(', ') : data.message;
        throw new Error(message || 'Something went wrong. Please try again.');
    }

    return data;
}

const api = {
    register: (payload) => apiRequest('/patients/register', { method: 'POST', body: JSON.stringify(payload) }),
    pinLogin: (vitaIdRef, pin) => apiRequest('/auth/patient/pin-login', { method: 'POST', body: JSON.stringify({ vitaIdRef, pin }) }),
    getProfile: (vitaIdRef) => apiRequest(`/patients/${vitaIdRef}`),
    getMe: () => apiRequest(`/patients/${localStorage.getItem('vitaid_ref')}`),
    addAllergy: (payload) => apiRequest('/health-profile/allergies', { method: 'POST', body: JSON.stringify(payload) }),
    confirmNoAllergies: () => apiRequest('/health-profile/allergies/confirm-none', { method: 'POST' }),
    addMedication: (payload) => apiRequest('/health-profile/medications', { method: 'POST', body: JSON.stringify({ ...payload, acknowledgeInteractions: !!window._acknowledgeNext }) }),    confirmNoMedications: () => apiRequest('/health-profile/medications/confirm-none', { method: 'POST' }),
    addCondition: (payload) => apiRequest('/health-profile/conditions', { method: 'POST', body: JSON.stringify(payload) }),
    confirmNoConditions: () => apiRequest('/health-profile/conditions/confirm-none', { method: 'POST' }),
    setBloodType: (bloodType) => apiRequest('/health-profile/blood-type', { method: 'POST', body: JSON.stringify({ bloodType }) }),
    addEmergencyContact: (payload) => apiRequest('/health-profile/emergency-contacts', { method: 'POST', body: JSON.stringify(payload) }),
    logout: () => apiRequest('/auth/patient/logout', { method: 'POST' }),
    getAuditLog: () => apiRequest('/patients/me/audit-log'),
    listConsents: (patientId) => apiRequest(`/patients/${patientId}/consent`),
    grantConsent: (patientId, facilityId) => apiRequest(`/patients/${patientId}/consent`, { method: 'POST', body: JSON.stringify({ facilityId }) }),
    revokeConsent: (patientId, facilityId) => apiRequest(`/patients/${patientId}/consent/${facilityId}`, { method: 'DELETE' }),
};