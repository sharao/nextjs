"use client";

import { useEffect, useState } from "react";
import classes from "./page.module.css";

interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export default function Post() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: PostType[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.log("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className={classes.posts}>
      <h1>Posts</h1>
      <div></div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className={classes.post}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
