import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  return (
    <ReactQuill
      style={{ border: "2px solid rgb(190, 164, 231)" }}
      value={value}
      modules={modules}
      onChange={onChange}
    />
  );
}

export default Editor;
