import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import Dashboard from "./DashboardPage"
import { Login } from "./LoginPage";
import { Register } from "./RegisterPage";
import { render } from "@testing-library/react";

function App() {
  const [currentForm, setCurrentForm] = useState('dashboard');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
// created the function render, which checks the "currentForm" and displays the corresponding page
// added the Dashboard page as the else and changed the default page to be the dashboard.
  function render() {
    if (currentForm === "login") {
      return (
        <Login onFormSwitch={toggleForm} />
      )
    } else if (currentForm === "register") {
      return (
        <Register onFormSwitch={toggleForm} />
      )
    } else {
      return (
        <Dashboard onFormSwitch={toggleForm} />
      )
    }
  }

  return (
    <div className="App">
      {
        render()
      }
    </div>
  );
}

export default App;
