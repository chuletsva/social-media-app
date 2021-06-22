import posts from "mock/posts";
import IPost from "model/Post";

function getAll(): Promise<IPost[]> {
  return new Promise<IPost[]>((resolve) =>
    setTimeout(() => {
      resolve(posts);
    }, 500)
  );
}

export default { getAll };
