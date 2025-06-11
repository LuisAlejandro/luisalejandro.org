export function Footer() {
  return (
    <div
      className="footer flex justify-center items-center mx-auto"
      style={{
        fontFamily: "var(--font-roboto), sans-serif",
        fontWeight: "300",
        color: "rgba(0, 0, 0, 0.4)",
        marginBottom: "20px",
      }}
    >
      &copy; {new Date().getFullYear()} Luis Martínez. All rights reserved.
    </div>
  );
}
