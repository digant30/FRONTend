import { useState } from "react";
import styles from "../home.module.css";
import background from "/home/digant/FYP/api/client/src/images/adidas.png";

function App() {
  
  const [Name, setName] = useState("");
  const [SName, setSName] = useState("");
  const [SellerId, setSellerId] = useState("");
  const [Manager, setManager] = useState("");
  const [MgrId, setMgrId] = useState("");
  const [Address, setAddress] = useState("");
  const [Brand, setBrand] = useState("");

  async function AddSeller(event) {
    event.preventDefault();

    fetch("http://localhost:4000/channels/mychannel/chaincodes/smartContract",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          fcn: "createSeller",
          peers: ["peer0.org1.example.com", "peer0.org2.example.com"],
          chaincodeName: "smartContract",
          channelName: "mychannel",
          args: [Name, SName, SellerId, Manager, MgrId, Address, Brand],
        }),
      }
    ).then(function (response) {
      return response.json();
    })
    .then(function (data) {
      alert("Seller added successfully");
      console.log(data);
      window.location.href = "http://localhost:3000/addseller";
      window.location.reload(true);
    })
    .catch((error) => console.error("Error:", error));
  }

  return (
    <div>
      <div className={styles.topnav}>
        <a href="addproduct">Add Product</a>
        <a className={styles.active} href="addseller">Add Seller</a>
        <a href="changeowner">Change Product Owner</a>
        <a href="queryseller">Query Seller</a>
        <a href="queryallsellers">Query All Sellers</a>
        <a href="queryconsumermanu">Query Consumer</a>
        <a href="queryallconsumersmanu">Query All Consumers</a> 
        <a href="/">Logout</a>
      </div>
      <div className={styles.forms} style={{backgroundImage: `url(${background})`, backgroundSize: `1800px 900px`}}>
      <form onSubmit={AddSeller}>
        <input
          value={Name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Seller Name"
        />
        <br />
        <input
          value={SName}
          onChange={(e) => setSName(e.target.value)}
          type="text"
          placeholder="Name of the Store"
        />
        <br />
        <input
          value={SellerId}
          onChange={(e) => setSellerId(e.target.value)}
          type="text"
          placeholder="Seller ID"
        />
        <br />
        <input
          value={Brand}
          onChange={(e) => setBrand(e.target.value)}
          type="text"
          placeholder="Brand"
        />
        <br />
        <input
          value={Manager}
          onChange={(e) => setManager(e.target.value)}
          type="text"
          placeholder="Manager"
        />
        <br />
        <input
          value={MgrId}
          onChange={(e) => setMgrId(e.target.value)}
          type="text"
          placeholder="Manager ID"
        />
        <br />
        <input
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="Address"
        />
        <br />
        <input type="submit" value="Add Seller" />
      </form>
      </div>
    </div>
  );
}

export default App;
