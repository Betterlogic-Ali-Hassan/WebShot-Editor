import Editor from "@/components/editor/Editor";
import ImageUploader from "@/components/imageUploader/ImageUploader";
import RevisionCard from "@/components/RevisionCard";
import { PopoverProvider } from "@/context/PopOverContext";
import React from "react";

const page = () => {
  return (
    <div id='main'>
      <PopoverProvider>
        <Editor />
        <ImageUploader />
      </PopoverProvider>
      <RevisionCard />
    </div>
  );
};

export default page;
