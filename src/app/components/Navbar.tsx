import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const logged = false;

  return (
    <div className="topnav">
      <Link href="/">
        <Image
          src="/squealer-logo.png"
          alt="squealer_logo"
          width="50"
          height="50"
        />
      </Link>
      <Link href="/notification">NOTIFICATION</Link>
      <Link href="/dashboard">DASHBOARD</Link>
      <Link href="/dm">DM</Link>
    </div>
  );
};

export default Navbar;
