import Link from "next/link";

const Navbar = () => {
  return (
    <div className="topnav">
      <Link href="/">Home</Link>
      <Link href="/login">Profile</Link>
      <Link href="/dm">DM</Link>
      <Link href="/notification">Notification</Link>
</div>
  )
}

export default Navbar