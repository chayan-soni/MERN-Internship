const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const buildHeaders = (token, isJson = true) => {
  const headers = {};

  if (isJson) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

export const apiClient = {
  get: async (path, token) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: buildHeaders(token, false)
    });

    return parseResponse(response);
  },
  post: async (path, body, token) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: buildHeaders(token),
      body: JSON.stringify(body)
    });

    return parseResponse(response);
  },
  patch: async (path, body, token) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PATCH',
      headers: buildHeaders(token),
      body: JSON.stringify(body || {})
    });

    return parseResponse(response);
  }
};
