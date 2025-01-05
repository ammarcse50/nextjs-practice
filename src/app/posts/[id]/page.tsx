import React from "react";

const getDetailsPost = async (id: number | string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  const data = await res.json();
  return data;
};

type Props = {
  params: { id: string | number };
};
// Function to dynamically generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getDetailsPost(params.id);
  return {
    title: post.title || "Post Not Found",
    description: post.body || "No description available.",
  };
}

const postPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id;
  const { title, body } = await getDetailsPost(await id);
  return (
    <div>
      <h2>postPage</h2>

      <h2>title : {title}</h2>
      <h2>Description: {body}</h2>
    </div>
  );
};

export default postPage;
