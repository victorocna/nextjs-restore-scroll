import React from "react";
import { useQuery } from "@tanstack/react-query";

const List = () => {
  const { data, status } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response.json();
    },
  });

  const showPosts = (post) => {
    return (
      <div key={post.id}>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    );
  };

  return (
    <div>
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && <div>{data.map(showPosts)}</div>}
    </div>
  );
};

export default List;
