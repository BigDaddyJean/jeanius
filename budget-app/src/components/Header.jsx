import React from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.css";

export default function Header() {
  return (
    <header className={style.header}>
      <Link to="/"><h1>Budget App</h1></Link>
      <Link className="btn" to="/new">New Transactions</Link>
    </header>
  );
}
