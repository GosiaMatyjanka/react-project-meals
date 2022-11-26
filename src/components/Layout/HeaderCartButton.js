import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const [buttonIsHighlated, setButtonIsHighlated] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${
    buttonIsHighlated ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) return;
    setButtonIsHighlated(true);

    const index = setTimeout(() => {
      setButtonIsHighlated(false);
    }, 1000);

    return () => {
      clearTimeout(index);
    };
  }, [items]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
