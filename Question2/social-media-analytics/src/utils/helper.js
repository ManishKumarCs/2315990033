export const calculateTopUsers = async (apiService) => {
    try {
      const users = await apiService.getUsers();
      const userPostCounts = {};
      
      // Calculate post count for each user
      for (const user of users) {
        const posts = await apiService.getPostsByUser(user.id);
        userPostCounts[user.id] = {
          ...user,
          postCount: posts.length,
          posts: posts,
        };
      }
      
      // Sort users by post count
      const sortedUsers = Object.values(userPostCounts)
        .sort((a, b) => b.postCount - a.postCount)
        .slice(0, 5);  // Get top 5
        
      return sortedUsers;
    } catch (error) {
      console.error('Error calculating top users:', error);
      return [];
    }
  };
  
  export const calculateTrendingPosts = async (apiService) => {
    try {
      const users = await apiService.getUsers();
      let allPosts = [];
      
      // Get all posts from all users
      for (const user of users) {
        const userPosts = await apiService.getPostsByUser(user.id);
        allPosts = [...allPosts, ...userPosts.map(post => ({...post, userName: user.name}))];
      }
      
      // Get comment count for each post
      const postsWithComments = await Promise.all(allPosts.map(async (post) => {
        const comments = await apiService.getCommentsByPost(post.id);
        return {
          ...post,
          commentCount: comments.length,
          comments: comments,
        };
      }));
      
      // Sort by comment count
      const trendingPosts = postsWithComments
        .sort((a, b) => b.commentCount - a.commentCount);
        
      return trendingPosts;
    } catch (error) {
      console.error('Error calculating trending posts:', error);
      return [];
    }
  };