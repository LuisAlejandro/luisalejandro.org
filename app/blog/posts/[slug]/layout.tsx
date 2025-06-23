import "@styles/tailwind.css";
import "yet-another-react-lightbox/styles.css";

export default async function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
