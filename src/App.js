import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Common/header";
import HomePage from "./components/Home/home";
import DetailView from "./components/DetailView/DetailView";
import FiveDayForecast from "./components/FiveDayForecast/FiveDayForecast";

function App() {
  return (
    <div className="container-xl">
      <Header />
      <div className="contentArea">
        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/DetailView/:city" component={DetailView} />
        <Route path="/FiveDayForecast/:city" component={FiveDayForecast} />
      </div>
    </div>
  );
}

export default App;
