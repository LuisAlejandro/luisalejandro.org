export default function Container({ children }) {
  return (
    <div className="container mx-auto px-64 md:px-32 sm:px-8 xs:px-4">
      {children}
    </div>
  );
}
