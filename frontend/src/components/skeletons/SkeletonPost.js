import Skeleton from "./Skeleton";

const SkeletonPost = () => {
  return (
    <div className="post">
      <Skeleton classes="image width-50" />
      <div className="texts">
        <Skeleton classes="title width-100" />
        <Skeleton classes="text width-50" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
      </div>
    </div>
  );
};
export default SkeletonPost;
