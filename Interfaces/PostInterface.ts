import postReactionInterface from "./PostReactionInterface";

export default interface postInterface {
    type: string;
    postId: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    images: string[];
    reactions: postReactionInterface[];
  }
  