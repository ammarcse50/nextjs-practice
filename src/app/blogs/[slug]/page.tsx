import React from "react";

const details = ({ params }) => {
  const { title, description, slug } = blogs.find(
    (blog) => blog.slug === params.slug
  );
  return (
    <div className="border border-blue-500 ">
      <h2 className="font-bold text-2xl">SLUG : {slug}</h2>
      <h2 className="font-bold text-xl">{title}</h2>
      <h2>
        <strong>Description : </strong>
        <p> {description}</p>
      </h2>
    </div>
  );
};
const blogs = [
  {
    slug: "how-to-start-with-react",
    title: "How to Start with React",
    description:
      "A beginner's guide to getting started with React.js, covering the basics of components, state, and props.",
  },
  {
    slug: "mastering-nodejs",
    title: "Mastering Node.js",
    description:
      "Learn advanced concepts of Node.js, including asynchronous programming, event loops, and building scalable applications.",
  },
  {
    slug: "css-flexbox-vs-grid",
    title: "CSS Flexbox vs Grid",
    description:
      "Understand the differences between Flexbox and Grid layout systems and when to use each for your web designs.",
  },
  {
    slug: "introduction-to-prisma",
    title: "Introduction to Prisma",
    description:
      "Explore how Prisma simplifies database management and integrates seamlessly with modern web applications.",
  },
  {
    slug: "optimizing-web-performance",
    title: "Optimizing Web Performance",
    description:
      "Tips and tricks to enhance the speed and efficiency of your web applications, from caching to lazy loading.",
  },
  {
    slug: "secure-authentication-methods",
    title: "Secure Authentication Methods",
    description:
      "An overview of best practices for implementing secure authentication in web applications without compromising user experience.",
  },
  {
    slug: "tailwind-css-setup",
    title: "Tailwind CSS Setup",
    description:
      "A step-by-step guide to setting up Tailwind CSS in your project, along with tips for efficient styling.",
  },
  {
    slug: "building-restful-apis",
    title: "Building RESTful APIs",
    description:
      "Learn how to design and implement RESTful APIs with Node.js and Express, following industry best practices.",
  },
  {
    slug: "top-javascript-frameworks-2025",
    title: "Top JavaScript Frameworks in 2025",
    description:
      "A comprehensive look at the most popular JavaScript frameworks of 2025 and their unique features.",
  },
  {
    slug: "introduction-to-nextjs",
    title: "Introduction to Next.js",
    description:
      "Discover the power of Next.js for building server-side rendered and static websites with React.",
  },
];
export default details;
