const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5130';

class ApiService {
  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async get(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Contact form submission
  async sendContactMessage(formData) {
    return this.post('/contact', formData);
  }

  // Health check
  async checkHealth() {
    return this.get('/health');
  }

  // Portfolio data endpoints
  async getPersonalData() {
    return this.get('/api/personal');
  }

  async getSkills() {
    return this.get('/api/skills');
  }

  async getExperience() {
    return this.get('/api/experience');
  }

  async getProjects() {
    return this.get('/api/projects');
  }

  async getEducation() {
    return this.get('/api/education');
  }
}

export default new ApiService();
