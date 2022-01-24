import { GridSearchIcon } from "@material-ui/data-grid";
import React from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userAction";
import "./SecondHeader.css";

const SecondHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    const burgerMenu = document.getElementById("burger");
    const navbarMenu = document.getElementById("menu");

    // Show and Hide Navbar Menu
    burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("is-active");
      navbarMenu.classList.toggle("is-active");

      if (navbarMenu.classList.contains("is-active")) {
        navbarMenu.style.maxHeight = navbarMenu.scrollHeight + "px";
      } else {
        navbarMenu.removeAttribute("style");
      }
    });
  }, []);

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <div>
      <nav class="navbar">
        <div class="container">
          <section class="wrapper">
            <Link to="/" class="brand">
              Brand
            </Link>
            <button type="button" class="burger" id="burger">
              <span class="burger-line"></span>
              <span class="burger-line"></span>
              <span class="burger-line"></span>
              <span class="burger-line"></span>
            </button>
            <div class="menu" id="menu">
              <ul class="menu-inner">
                <li class="menu-item">
                  <Link to="/" class="menu-link">
                    Home
                  </Link>
                </li>
                <li class="menu-item">
                  <Link to="/products" class="menu-link">
                    Products
                  </Link>
                </li>
                <li class="menu-item">
                  <Link to="/cart" class="menu-link">
                    Cart
                  </Link>
                </li>
                <li class="menu-item">
                  <Link to="/about" class="menu-link">
                    About
                  </Link>
                </li>
                {isAuthenticated ? (
                  <li class="menu-item">
                    <Link to="/orders" class="menu-link">
                      Orders
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                {user?.role === "admin" ? (
                  <li class="menu-item">
                    <Link to="/admin/dashboard" class="menu-link">
                      Admin
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                {isAuthenticated ? (
                  <li class="menu-item">
                    <Link to="/account" class="menu-link">
                      Account
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                {isAuthenticated ? (
                  <li class="menu-item">
                    <button onClick={logoutUser} class="menu-link">
                      logout
                    </button>
                  </li>
                ) : (
                  <li class="menu-item">
                    <Link to="/login" class="menu-link">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </section>
        </div>
      </nav>
    </div>
  );
};

export default SecondHeader;
