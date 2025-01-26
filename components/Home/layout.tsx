import Meta from "./meta";

export default function Layout({
  children
}: any) {
  return (
    
    <>
      <Meta />
      
      <main>{children}</main>
    </>
  );
}
