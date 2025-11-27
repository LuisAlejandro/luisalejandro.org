"use client";

import FriendlyDate from "@components/Blog/FriendlyDate";
import Link from "next/link";

interface SearchResultItemProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

export default function SearchResultItem({
  title,
  excerpt,
  date,
  slug,
}: SearchResultItemProps) {
  return (
    <Link
      href={`/blog/posts/${slug}`}
      className="block w-full bg-[#f9f9f9] rounded-lg p-4 transition-all duration-200 hover:bg-[#fbfbfb]border border-gray-200 group"
    >
      <h3 className="text-[rgb(90,90,90)] text-xl leading-4 font-light mb-2 group-hover:text-black transition-colors">
        {title}
      </h3>
      <div
        className="text-[rgb(90,90,90)] text-base font-light my-0 line-clamp-2"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <div className="text-[rgb(90,90,90)] text-base font-light my-0">
        Published <FriendlyDate dateString={date} />.
      </div>
    </Link>
  );
}
