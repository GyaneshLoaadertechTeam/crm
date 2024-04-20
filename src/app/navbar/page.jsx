import './page.css';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const NavPage = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });  // Redirects to homepage after logout
  };

  return (
    <header>
      <div className="navbar">
        <div className="nav-logo border">
          <Image
            src="/uploads/images/logo.png"
            alt="Description of the image"
            width={50}
            height={50}
          />
        </div>

        <div className="nav-links">
          {/* <Link href={'/'}>Home</Link>
          <Link href={'/about'}>About</Link>
          <Link href={'/contact'}>Contact</Link> */}
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default NavPage;
