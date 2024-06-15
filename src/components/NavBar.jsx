import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={"flex justify-between p-4 pb-0 "} id="navbar">
      <Link className="text-2xl pl-4" to="/">
        Abhishek Codes
      </Link>
      <div className="flex gap-4 text-xl pr-4">
        <Link to="/login">Login</Link>
        <Link to="/blog">Blog</Link>
      </div>
    </div>
  );
};

export default NavBar;
