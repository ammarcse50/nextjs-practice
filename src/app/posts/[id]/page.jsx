import React from "react";

const getDetailsPost = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  const data = await res.json();
  return data;
};

const postPage = async ({ params }) => {
  const { title, body } = await getDetailsPost(params.id);
  return (
    <div>
      <h2>postPage</h2>

      <h2>title : {title}</h2>
      <h2>Description: {body}</h2>
    </div>
  );
};

export default postPage;
