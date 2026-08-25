export function SkipToContentLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-[10000] focus:top-2 focus:left-2 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-md"
    >
      Skip to main content
    </a>
  );
}
