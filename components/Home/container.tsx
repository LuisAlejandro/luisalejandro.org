export default function Container({
  children
}: any) {
  return (
    
    <div className="w-11/12 xs:container mx-auto px-0 md:px-32 lg:px-64">
      {children}
    
    </div>
  );
}
