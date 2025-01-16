"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import React from "react";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const handle = () => {
    router.push("/login");
  };

  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Services",
      path: "/services",
    },
    {
      title: "Blogs",
      path: "/blogs",
    },
    {
      title: "Categoriess",
      path: "/categories",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Posts",
      path: "/posts",
    },
    {
      title: "Photos",
      path: "/photos",
    },
    {
      title: "Users",
      path: "/users",
    },
    {
      title: "Invoices",
      path: "/invoices",
    },
  ];
  return (
    <nav className="bg-red-600 flex justify-between px-10 py-4">
      <h2 className="font-bold text-xl ">
        Next <span className="text-black font-bold">Js</span>
      </h2>
      <ul className="flex gap-x-10 text-white font-bold ">
        {links?.map((link) => (
          <div
            key={link.path}
            className="hover:bg-blue-800 hover:px-4 py-2 rounded"
          >
            <li>
              <Link
                className={`${
                  pathName === link.path &&
                  "bg-blue-800 px-4 py-2 rounded-xl hover:bg-blue-800"
                }`}
                key={link.path}
                href={link.path}
              >
                {link.title}
              </Link>
            </li>
          </div>
        ))}
      </ul>
      <button
        className="py-3 px-5 bg-blue-500 rounded text-white font-bold text-lg"
        onClick={handle}
      >
        Login
      </button>
    </nav>
  );
};

export default Navbar;
