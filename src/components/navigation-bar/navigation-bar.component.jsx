import { Fragment } from 'react';
import './navigation-bar.styles.scss'
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Navigation = () =>{
    return(
      <Fragment>
        <div className='navigation'>
          <Link className='logo-container' to='/'>
            <CrwnLogo className='logo'/>
          </Link>
          <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>
                SHOP
            </Link>
            <Link className='nav-link' to='/sign-in'>
                SING-IN
            </Link>
            <Link className='nav-link' to='/sign-up'>
                SING-UP
            </Link>

          </div>
        </div>
        <Outlet/>
      </Fragment>
    );
  }

  export default Navigation;