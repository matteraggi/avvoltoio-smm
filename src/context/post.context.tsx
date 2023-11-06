"use client";

import { createContext, useState } from "react";

type PostOrNot = false | true;

export const PostContext = createContext({
  post: false,
  setPost: (post: boolean) => {},
});

export const PostContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [post, setPost] = useState<PostOrNot>(false);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
};
