import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useOnClickOutside from "use-onclickoutside";
import Link from "next/link";
import { useRouter } from "next/router";
import { RootState } from "store";
import { removeToken } from "utils/helpers";
import { useAuthContext } from "context/AuthContext";

type HeaderType = {
  isErrorPage?: Boolean;
};

const Header = ({ isErrorPage }: HeaderType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, cartItems } = useAuthContext();
  const arrayPaths = ["/"];

  const [onTop, setOnTop] = useState(
    !arrayPaths.includes(router.pathname) || isErrorPage ? false : true
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  const logoutUser = (data: any) => {
    removeToken();
    router.reload();
  };

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <Link href="/">
          <a>
            <h1 className="site-logo">AgriCommerce</h1>
          </a>
        </Link>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <Link href="/products">
            <a>Products</a>
          </Link>
          <button className="site-nav__btn">
            <p>Account</p>
          </button>
        </nav>

        <div className="site-header__actions">
          <button
            ref={searchRef}
            className={`search-form-wrapper ${
              searchOpen ? "search-form--active" : ""
            }`}
          >
            <form className={`search-form`}>
              <i
                className="icon-cancel"
                onClick={() => setSearchOpen(!searchOpen)}
              ></i>
              <input
                type="text"
                name="search"
                placeholder="Enter the product you are looking for"
              />
            </form>
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            ></i>
          </button>
          <Link href="/cart">
            <button className="btn-cart">
              <i className="icon-cart"></i>
              {cartItems && cartItems.length > 0 && (
                <span className="btn-cart__count">{cartItems.length}</span>
              )}
            </button>
          </Link>
          {user ? (
            <a
              href="/profile"
              className="welcome"
            >{`Welcome, ${user.username}`}</a>
          ) : (
            <Link href="/login">
              <button className="site-header__btn-avatar">
                <i className="icon-avatar"></i>
              </button>
            </Link>
          )}
          {user && (
            <span onClick={logoutUser} className="logout">
              <a>Log Out</a>
            </span>
          )}
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span></span>
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
