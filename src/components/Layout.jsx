import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        {children}
      </div>
    </>
  );
}

export default Layout;
