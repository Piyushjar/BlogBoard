import Skeleton from "./Skeleton";

const SkeletonPostPage = () => {
  return (
    <div className="post-page">
      <Skeleton classes="image width-100" />
      <Skeleton classes="title width-100" />
      <div className="content">
        <Skeleton classes="text width-50" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-50" />
      </div>
    </div>
  );
};
export default SkeletonPostPage;
