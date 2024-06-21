"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DevEyeNew from "../../../public/DevEyeNew.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: "about",
    },
    {
      id: 2,
      link: "research",
    },
    {
      id: 3,
      link: "baldr",
    },
  ];

  return (
    <>
    <div className="absolute inset-x-0 mt-8 m-auto flex md:justify-center md:items-center md:mr-0">
        <Image src={DevEyeNew} alt="Logo" width={100} height={100}/>
    </div>
      <div className="flex justify-end bg-cyan-200">
        {/* <ul className="hidden md:flex md:flex-col h-screen justify-center gap-y-8 =">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="font-josefinSans font-medium nav-links px-4 md:mt-4 cursor-pointer capitalize text-4xl text-gray-500 hover:scale-105 hover:text-cyan-900 duration-200n link-underline"
            >
              <Link href={link}>{link}</Link>
            </li>
          ))}
        </ul> */}

        {/* <button className="">
          <a href="/" className="bg-black text-white p-5 rounded-3xl">DevEye AI</a>
        </button> */}

        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer p-12 z-10 text-white flex flex-row gap-x-8"
        >
          {nav ? (
            <FaTimes
              size={30}
              className="animate-spin hover:rotate-90 w-16 h-16 p-2 border-2 rounded-full border-black bg-black"
            />
          ) : (
            <div className="">
              <FaBarsProgress
                size={30}
                className="w-16 h-16 p-2 border-2 rounded-full border-black bg-black hover:animate-spin transition duration-500 ease-in-out"
              />
            </div>
          )}
        </div>

        {nav && (
          <div
            className={
              nav
                ? "flex flex-col justify-center items-center fixed inset-0 bg-indigo-200 text-gray-500 transition-opacity duration-500 ease-in-out"
                : "flex flex-col justify-center items-center fixed inset-0 bg-indigo-200 text-gray-500 opacity-0"
            }
          >
            <ul>
              {links.map(({ id, link }, index) => (
                <li
                  key={id}
                  className={`px-4 cursor-pointer uppercase font-josefinSans py-6 text-4xl transition-opacity duration-500 ease-in-out transform ${
                    nav
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  } delay-${index * 150}`}
                >
                  <Link onClick={() => setNav(!nav)} href={link}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
