import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import shoppingCartSvg from "/shoppingCart.svg";
import "./Navbar.css";
import { useShoppingCart } from "../context/ShoppingCartContext";

export const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <NavbarBs className="bg-dark shadow-sm mb-4" sticky="top">
      <Container className="remove-margins">
        <Nav className="me-auto">
          <Nav.Link className="text-light mr-0" to={"/"} as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link className="text-light" to={"/store"} as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link className="text-light" to={"/about"} as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 && (
          <Button
            onClick={openCart}
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            className="rounded-circle"
          >
            <img src={shoppingCartSvg} alt="Shopping cart" />
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center "
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
      </Container>
    </NavbarBs>
  );
};
