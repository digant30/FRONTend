import { useState } from "react";
import styles from "../home.module.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();

    fetch("http://localhost:4000/consumer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        localStorage.setItem("token", data.token);
        window.location.href = "http://localhost:3000/consumerlogin";
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div className={styles.form}>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default App;
