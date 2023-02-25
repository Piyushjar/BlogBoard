import { formatISO9075, formatDistance } from "date-fns";
import { Link } from "react-router-dom";

function Post({ title, summary, cover, content, author, _id, createdAt }) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img
            src={cover}
            alt="we couldn't get the cover, here's an ice-cream 🍨"
          />
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
