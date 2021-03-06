const resolvers = {
  Query: {
    posts() {
      return posts;
    },
    today() {
      return new Date();
    },
    me() {
      return {
        id: "bgf",
        firstName: "Apple",
        lastName: "Banana"
      };
    }
  },
  Mutation: {
    upvotePost(_, { postId }) {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    }
  },
  Author: {
    // posts(author) {
    //   return filter(posts, { authorId: author.id });
    // }
  },
  Post: {
    author(post) {
      return find(authors, { id: post.authorId });
    }
  }
};

export default resolvers;
