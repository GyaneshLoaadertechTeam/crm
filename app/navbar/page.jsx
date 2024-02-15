// import Link from 'next/link';
 // Make sure to create a CSS module file for this
//  import styles from '../../src/styles/Navbarr'
// import '../styles/Nav';
import './page.css';
import bg from '../assets/images/logo.png'



// import LogoImage from '@/src/Image/Loader.png';
const NavPage = () => {
  // const images = ['assets/images/logo.png'];
  const style1={
    backgroundImage: `url(${bg.src})`,
    width: '100%',
    height: '100%',
  }

  return (
    <header>
    <div className="navbar">
    <div className="nav-logo border">
      <div className="logo_img">
        <img style={bg} alt="Logo Image" />
      </div>
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