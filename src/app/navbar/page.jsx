import './page.css';
import Image from 'next/image';
const NavPage = () => {
  return (
    <header>
    <div className="navbar">
      
    <div className="nav-logo border">
    <Image
        src="/uploads/images/logo.png" // Path relative to the `public` folder
        alt="Description of the image"
        width={50} // Desired width (optional if layout='fill')
        height={50} // Desired height (optional if layout='fill')
        // layout="intrinsic" // Optional: 'fixed', 'intrinsic', 'responsive', or 'fill'
      />  
      
    </div>
    

    {/* <div className="nav-links">
      <Link href={'/'}>
        home
      </Link>
      <Link href={'/about'}>
       About
      </Link>
      <Link href={'/contact'}>
      Contact
      </Link>
    </div> */}
  </div>
</header>

        
  );
};
export default NavPage;