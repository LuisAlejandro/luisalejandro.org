import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agregador de X",
  robots: {
    index: false,
    follow: false,
  },
};

export default function XaggregatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
