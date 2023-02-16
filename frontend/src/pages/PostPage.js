import { formatISO9075 } from "date-fns";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import SkeletonPostPage from "../components/skeletons/SkeletonPostPage";
import Board from "../components/board/Board";
 import ModalBox from "../components/board/ModalBox";


function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
        setLoading(false);
      });
    });
  }, []);

  if (loading || !postInfo) return <SkeletonPostPage />;

  async function deletePost() {
    const response = await fetch(`http://localhost:4000/post/${id}`, {
      method: "DELETE",
    });
    if (response.status == 200) {
      toast.success("Post Deleted");
      console.log("deleted sucessfully");
    } else {
      toast.warn("Something went wrong");
    }
  }

  return (
    <div className="post-page">
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="cover" />
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

 <ModalBox _id={postInfo._id}/>

        </div>
     

      <time>Posted on: {formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">Author: {postInfo.author.username}</div>
    </div>
  );
}

export default PostPage;
