import "@styles/tailwind.css";
import "yet-another-react-lightbox/styles.css";

// export const metadata = {
//   title: "Luis Alejandro - Software Engineer",
//   description:
//     "Personal website of Luis Alejandro Martínez Faneyth, a software engineer from Venezuela",
// };

export default async function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
