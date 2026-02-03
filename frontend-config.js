// InQube Frontend Configuration
const API_CONFIG = {
    // Change this to match your deployment
    BACKEND_URL: typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? 'http://localhost:8000'
        : 'http://140.245.244.242',
    API_V1: '/api/v1'
};

// Auth Helper Functions
const Auth = {
    setToken(token) {
        localStorage.setItem('inqube_token', token);
    },

    getToken() {
        return localStorage.setItem('inqube_token');
    },

    clearToken() {
        localStorage.removeItem('inqube_token');
    },

    isAuthenticated() {
        return !!this.getToken();
    },

    async login(email, password) {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        const response = await fetch(`${API_CONFIG.BACKEND_URL}${API_CONFIG.API_V1}/login/access-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        this.setToken(data.access_token);
        return data;
    },

    logout() {
        this.clearToken();
        window.location.reload();
    }
};

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, Auth };
}
