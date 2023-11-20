"use client";

import { createContext, useRef, createRef } from "react";
import React from "react";

interface IScrollToContext {
  post: React.RefObject<React.Key | null | undefined>;
}

export const PostContext = createContext<IScrollToContext>({
  post: createRef(),
});

export const PostContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  var post = useRef(0);

  return (
    <PostContext.Provider value={{ post }}>{children}</PostContext.Provider>
  );
};
