import { formatISO9075 } from "date-fns";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import SkeletonPostPage from "../components/skeletons/SkeletonPostPage";
import ModalBox from "../components/board/ModalBox";

function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
        setLoading(false);
      });
    });
  }, []);

  if (loading || !postInfo) return <SkeletonPostPage />;

  async function deletePost() {
    toast.loading("Deleting post...");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/post/${id}`,
      {
        method: "DELETE",
      }
    );
    toast.dismiss();
    if (response.status == 200) {
      setRedirect(true);
      toast.success("Post Deleted");
    } else {
      toast.warn("Something went wrong");
    }
  }

  if (redirect) return <Navigate to={"/"} />;

  return (
    <div className="post-page">
      <div className="image">
        <img src={`${postInfo.cover.url}`} alt="cover" />
      </div>
      <h1>{postInfo.title}</h1>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
      {userInfo.id === postInfo.author._id && (
        <div className="edit">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            Edit ✍🏻
          </Link>
          <a className="delete-btn" onClick={deletePost}>
            Delete 🗑️
          </a>
        </div>
      )}
      <div>
        <ModalBox _id={postInfo._id} />
      </div>

      <time>Posted on: {formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">Author: {postInfo.author.username}</div>
    </div>
  );
}

export default PostPage;
