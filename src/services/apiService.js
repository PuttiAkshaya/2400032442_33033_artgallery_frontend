import API_BASE_URL from "../apiConfig";

const apiService = {
  // Generic Fetch with Exception Handling
  async request(endpoint, options = {}) {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `Error ${response.status}: ${response.statusText}`);
      }
      
      // Return JSON only if there is content
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }
      return true;
    } catch (error) {
      console.error(`API Call failed [${endpoint}]:`, error.message);
      throw error;
    }
  },

  // Auth
  async login(credentials) {
    return this.request("/users/signin", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  async register(userData) {
    return this.request("/users/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  async verifyAndRegister(registrationData) {
    return this.request("/users/verify-and-register", {
      method: "POST",
      body: JSON.stringify(registrationData),
    });
  },

  // Artworks (CRUD)
  async getArtworks() {
    return this.request("/artworks");
  },

  async addArtwork(art) {
    return this.request("/artworks", {
      method: "POST",
      body: JSON.stringify(art),
    });
  },

  async updateArtwork(id, art) {
    return this.request(`/artworks/${id}`, {
      method: "PUT",
      body: JSON.stringify(art),
    });
  },

  async deleteArtwork(id) {
    return this.request(`/artworks/${id}`, {
      method: "DELETE",
    });
  },

  // Orders
  async createOrder(orderData) {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  },

  // OTP & Verification
  async requestOtp(email) {
    return this.request("/users/request-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  async sendSignupOtp(email) {
    return this.request("/users/send-signup-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  async loginWithOtp(email, otp) {
    return this.request("/users/login-with-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  }
};

export default apiService;
