import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    types: {
      "text/markdown": [
        {
          url: "/contact.md",
          title: "Markdown twin",
        },
      ],
    },
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
