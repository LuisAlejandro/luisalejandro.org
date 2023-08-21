export default function Container({ children }) {
  return (
    <div className="container mx-auto px-4 md:px-32 lg:px-64">
      {children}
    </div>
  );
}
