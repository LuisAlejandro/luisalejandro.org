'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const CommentCount = dynamic(
  () => import('disqus-react').then(mod => mod.CommentCount),
  { ssr: false }
);

interface DeferredCommentCountProps {
  shortname: string;
  config: {
    identifier: string;
    url: string;
    title: string;
  };
}

export default function DeferredCommentCount({
  shortname,
  config
}: DeferredCommentCountProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer loading until after initial paint
    const timer = setTimeout(() => setMounted(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <span className="inline-block align-top">
        —
      </span>
    );
  }

  return <CommentCount shortname={shortname} config={config} />;
}

