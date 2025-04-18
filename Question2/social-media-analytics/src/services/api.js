const API_BASE_URL = 'http://localhost:5000';

class ApiService {
  async getUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch users with status: ${response.status}`);
      }
  
      const { users = [] } = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  async getPostsByUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);

      if (!response.ok) {
        throw new Error(`Failed to fetch posts for user ${userId} with status: ${response.status}`);
      }

      const data = await response.json();
      return data.posts || [];
    } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error);
      return [];
    }
  }

  async getCommentsByPost(postId) {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);

      if (!response.ok) {
        throw new Error(`Failed to fetch comments for post ${postId} with status: ${response.status}`);
      }

      const data = await response.json();
      return data.comments || [];
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
      return [];
    }
  }
}

export default new ApiService();