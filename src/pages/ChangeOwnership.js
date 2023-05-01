import { useState } from "react";
import styles from "../home.module.css";
import background from "/home/digant/FYP/api/client/src/images/factory.png"

function App() {
  
  const [ProductId, setProductId] = useState("");
  const [Owner, setOwner] = useState("");

  async function ChangeOwnership(event) {
    event.preventDefault();

    fetch("http://localhost:4000/channels/mychannel/chaincodes/smartContract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        fcn: "changeProductOwner",
        peers: ["peer0.org1.example.com", "peer0.org2.example.com"],
        chaincodeName: "smartContract",
        channelName: "mychannel",
        args: [ProductId, Owner],
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert("Product ownership changed successfully");
        console.log(data);
        window.location.href = "http://localhost:3000/changeowner";
        window.location.reload(true);
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div>
      <div className={styles.topnav}>
        <a href="addproduct">Add Product</a>
        <a href="addseller">Add Seller</a>
        <a className={styles.active} href="changeowner">Change Product Owner</a>
        <a href="queryseller">Query Seller</a>
        <a href="queryallsellers">Query All Sellers</a>
        <a href="queryconsumermanu">Query Consumer</a>
        <a href="queryallconsumersmanu">Query All Consumers</a> 
        <a href="/">Logout</a>
      </div>
      <div className={styles.forms} style={{backgroundImage: `url(${background})`, backgroundSize: `500px 500px`}}>
      <form onSubmit={ChangeOwnership}>
        <input
          value={ProductId}
          onChange={(e) => setProductId(e.target.value)}
          type="text"
          placeholder="Item Number"
        />
        <br />
        <input
          value={Owner}
          onChange={(e) => setOwner(e.target.value)}
          type="text"
          placeholder="Seller Name"
        />
        <br />
        <input type="submit" value="Change Owner" />
      </form>
      </div>
    </div>
  );
}

export default App;
