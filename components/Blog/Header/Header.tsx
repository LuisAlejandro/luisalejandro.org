import Link from "next/link";
import Image from "next/image";
import {
  AiFillGithub,
  AiFillYoutube,
  AiFillLinkedin,
  AiOutlineX,
} from "react-icons/ai";

const Header = () => (
  <div className="max-w-screen-xl w-full my-0 mx-auto mb-8 p-4 pt-8 grid grid-cols-5 grid-rows-1 gap-4">
    <div className="flex flex-row row-start-1 col-start-1 row-end-2 col-end-2">
      <Link href="/" className="flex items-center">
        <Image alt="" src="/images/logomin.svg" height={60} width={60} />
      </Link>
    </div>
    <ul className="flex justify-end row-start-1 col-start-2 row-end-2 col-end-5">
      <li className="my-0 mx-8 leading-15 flex items-center">
        <Link
          href="/portfolio"
          className="text-4xl font-light text-black/75 ease-in-out duration-300 hover:text-black"
        >
          Portfolio
        </Link>
      </li>
      <li className="my-0 mx-8 leading-15 flex items-center">
        <Link
          href="/blog"
          className="text-4xl font-light text-black/75 ease-in-out duration-300 hover:text-black"
        >
          Blog
        </Link>
      </li>
      <li className="my-0 mx-8 leading-15 flex items-center">
        <Link
          href="https://store.luisalejandro.org/"
          className="text-4xl font-light text-black/75 ease-in-out duration-300 hover:text-black"
        >
          Store
        </Link>
      </li>
      <li className="my-0 mx-8 leading-15 flex items-center">
        <Link
          href="/contact"
          className="text-4xl font-light text-black/75 ease-in-out duration-300 hover:text-black"
        >
          Contact
        </Link>
      </li>
    </ul>
    <div className="flex justify-between items-center row-start-1 col-start-5 row-end-2 col-end-6">
      <a
        href="https://github.com/LuisAlejandro"
        target="_blank"
        rel="nofollow noreferrer"
        className="p-4 rounded-full text-black/75 ease-in-out duration-300 hover:text-black hover:bg-[#aaa] hover:scale-110"
      >
        <AiFillGithub size="30px" />
      </a>
      <a
        href="https://www.linkedin.com/in/martinezfaneyth"
        target="_blank"
        rel="nofollow noreferrer"
        className="p-4 rounded-full text-black/75 ease-in-out duration-300 hover:text-black hover:bg-[#aaa] hover:scale-110"
      >
        <AiFillLinkedin size="30px" />
      </a>
      <a
        href="https://www.youtube.com/@LuisDevelops"
        target="_blank"
        rel="nofollow noreferrer"
        className="p-4 rounded-full text-black/75 ease-in-out duration-300 hover:text-black hover:bg-[#aaa] hover:scale-110"
      >
        <AiFillYoutube size="30px" />
      </a>
      <a
        href="https://x.com/LuisAlejandro"
        target="_blank"
        rel="nofollow noreferrer"
        className="p-4 rounded-full text-black/75 ease-in-out duration-300 hover:text-black hover:bg-[#aaa] hover:scale-110"
      >
        <AiOutlineX size="25px" />
      </a>
    </div>
  </div>
);

export default Header;
