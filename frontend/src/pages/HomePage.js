import { useEffect, useState } from "react";
import SkeletonPost from "../components/skeletons/SkeletonPost";
import Post from "../components/Post";
function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
        setLoading(false);
      });
    });
  }, []);

  return (
    <>
      {loading && [...Array(10).keys()].map((i) => <SkeletonPost key={i} />)}
      {posts.length > 0 &&
        posts.map((post) => {
          return <Post key={post._id} {...post} />;
        })}
    </>
  );
}

export default HomePage;
