import Link from "next/link";

const Navbar = () => {

const logged = false;

  return (
    <div className="topnav">
      <Link href="/">HOME</Link>
      <Link href="/notification">NOTIFICATION</Link>
      <Link href="/dashboard">DASHBOARD</Link>
      <Link href="/dm">DM</Link>
    </div>
  );
};

export default Navbar;
