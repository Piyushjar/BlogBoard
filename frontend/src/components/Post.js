import { formatISO9075, formatDistance } from "date-fns";
import { Link } from "react-router-dom";

const clocks = ["🕐", "🕗", "🕒", "🕚", "🕣", "🕓"];

function randomIndex() {
  let n = clocks.length;
  let rIdx = Math.floor(Math.random() * (n + 1));
  return rIdx;
}

function Post({ title, summary, cover, content, author, _id, createdAt }) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:4000/${cover}`} alt="🍨" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a href="" className="author">
            @{author.username}
          </a>
          <time>
            {clocks[randomIndex()]}
            {formatDistance(new Date(createdAt), new Date(), {
              addSuffix: true,
            })}
          </time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

export default Post;
