import DummyImage from "@/components/DummyImage";
import Editor from "@/components/editor/Editor";
import RevisionCard from "@/components/RevisionCard";
import { PopoverProvider } from "@/context/PopOverContext";
import React from "react";

const page = () => {
  return (
    <>
      <PopoverProvider>
        <Editor />
        <div>
          <DummyImage />
        </div>
      </PopoverProvider>
      <RevisionCard />
    </>
  );
};

export default page;
