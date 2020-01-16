import React from "react";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";

function Header() {
  return (
    <div className="header">
      <Link to="/SettingsPage">
        <FontAwesome className="icon" name="cog" />
      </Link>
      <Link to="/home">
        <h1>My Weather App - React-Redux</h1>
      </Link>
    </div>
  );
}

export default Header;
