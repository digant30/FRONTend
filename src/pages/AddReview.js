import { useState } from "react";
import styles from "../home.module.css";
import background from "/home/digant/FYP/api/client/src/images/fake.jpg";

function App() {
    const [Review1, setReview1] = useState("");
  const [Name, setName] = useState("");
  const [SelName, setSelName] = useState("");
  const [Review, setReview] = useState("");
  
  async function AddReview(event) {
    event.preventDefault();

    fetch("http://localhost:4000/channels/mychannel/chaincodes/smartContract",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          fcn: "addreview",
          peers: ["peer0.org1.example.com", "peer0.org2.example.com"],
          chaincodeName: "smartContract",
          channelName: "mychannel",
          args: [Review1, Name, SelName, Review],
        }),
      }
    ).then(function (response) {
      return response.json();
    })
    .then(function (data) {
      alert("Review added successfully");
      console.log(data);
      window.location.href = "http://localhost:3000/addreview";
      window.location.reload(true);
    })
    .catch((error) => console.error("Error:", error));
  }

  return (
    <div>
      <div className={styles.topnav}>
        <a href="authenticate">Authenticate</a>
        <a href="queryassethistory">Query Asset</a>
        <a className={styles.active} href="addreview">Add Review</a>
        <a href="queryreview">Query Review</a>
        <a href="/">Logout</a>
      </div>
      <div className={styles.forms} style={{backgroundImage: `url(${background})`}}>
      <form onSubmit={AddReview}>
        <input
          value={Review1}
          onChange={(e) => setReview1(e.target.value)}
          type="text"
          placeholder="Review Name"
        />
        <br />
        <input
          value={Name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Product Name"
        />
        <br />
        <input
          value={SelName}
          onChange={(e) => setSelName(e.target.value)}
          type="text"
          placeholder="Seller Name"
        />
        <br />
        <input
          value={Review}
          onChange={(e) => setReview(e.target.value)}
          type="text"
          placeholder="Review (1-5)"
        />
        <br />
        <input type="submit" value="Add Review" />
      </form>
      </div>
    </div>
  );
}

export default App;
