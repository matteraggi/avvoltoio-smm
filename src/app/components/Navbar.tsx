import Link from "next/link";

const Navbar = () => {

const logged = false;

  return (
    <div className="topnav">
      <Link href="/">HOME</Link>
      <Link href="/dm">DM</Link>
      <Link href="/notification">NOTIFICATION</Link>
      {logged ? (
        <Link href="/profile">PROFILE</Link>
      ) : (
        <Link href="/login">LOG IN</Link>
      )}
    </div>
  );
};

export default Navbar;
