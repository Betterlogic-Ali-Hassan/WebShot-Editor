import DummyImage from "@/components/DummyImage";
import Editor from "@/components/editor/Editor";
import React from "react";

const page = () => {
  return (
    <div>
      <Editor />
      <div>
        <DummyImage />
      </div>
    </div>
  );
};

export default page;
