export function Footer() {
  return (
    <footer className="footer flex justify-center items-center mx-auto text-black/40 mb-5 font-light font-main text-base">
      &copy; {new Date().getFullYear()} Luis Martínez. All rights reserved.
    </footer>
  );
}
