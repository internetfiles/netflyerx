import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { FiEye, FiList, FiSearch } from "react-icons/fi";
import { MdQuestionMark } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { createToast } from "vercel-toast";
import { auth } from "../services/Firebase"; // Ensure this is correctly exported from Firebase.js

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleWatchlist = () => {
    if (user) {
      navigate("/watchlist");
    } else {
      createToast(
        "You are not signed in. Please sign in to access your watchlist.",
        {
          action: {
            text: "Login",
            callback(toast) {
              navigate("/login");
              toast.destroy();
            },
          },
          timeout: 3000,
          cancel: "Cancel",
          type: "dark",
        }
      );
    }
  };

  return (
    <Navbar
      className="bg-black/80"
      onMenuOpenChange={setIsMenuOpen}
      isBlurred
      isBordered
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
        />
        <NavbarBrand>
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 object-contain"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        className="hidden text-white sm:flex gap-4"
        justify="center"
      >
        <NavbarItem className="text-white">
          <Button onClick={() => navigate("/search")} variant="flat">
            <FiSearch /> Search
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="flat" onClick={() => navigate("/discover")}>
            <FiEye /> Discover
          </Button>
        </NavbarItem>
        <NavbarItem className="font-bold">
          <Button variant="flat" onClick={handleWatchlist}>
            <FiList /> Watchlist
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="flat" onClick={() => navigate("/about")}>
            <MdQuestionMark /> About
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {loading ? (
          <NavbarItem>
            <Button color="primary" variant="flat" isLoading>
              Loading
            </Button>
          </NavbarItem>
        ) : user ? (
          <NavbarItem className="flex gap-1 items-center">
            <Button color="primary" variant="flat" onClick={handleSignOut}>
              Sign Out
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button
              variant="flat"
              onClick={() => navigate("/login")}
              color="primary"
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu className="text-white">
        <NavbarMenuItem>
          <Button onClick={() => navigate("/search")} variant="flat">
            <FiSearch /> Search
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button variant="flat" onClick={() => navigate("/discover")}>
            <FiEye /> Discover
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button variant="flat" onClick={handleWatchlist}>
            <FiList /> Watchlist
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button variant="flat" onClick={() => navigate("/about")}>
            <MdQuestionMark /> About
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          {loading ? (
            <Button color="primary" variant="flat" isLoading>
              Loading
            </Button>
          ) : user ? (
            <div className="flex gap-1 items-center">
              <Button color="primary" variant="flat" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              variant="flat"
              onClick={() => navigate("/login")}
              color="primary"
            >
              Login
            </Button>
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
