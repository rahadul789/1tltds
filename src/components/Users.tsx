"use client";
import { use } from "react";

export default function Users({
  users,
}: {
  users: Promise<{ id: number; name: string }[]>;
}) {
  const allusers = use(users);

  return (
    <ul>
      {allusers.map((post) => (
        <li key={post.id}>{post.name}</li>
      ))}
    </ul>
  );
}
