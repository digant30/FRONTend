import { useState } from "react";
import styles from "../home.module.css";
import background from "/home/digant/FYP/api/client/src/images/consumer.jpg"

function App() {
  
  const [ProductName, setProductName] = useState("");
  const [ProductId, setProductId] = useState("");
  const [SellerId, setSellerId] = useState("");
  const [SellerName, setSellerName] = useState("");
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Contact, setContact] = useState("");
  const [Mail, setMail] = useState("");
  const [Consumer, setConsumer] = useState("");

  async function AddConsumer(event) {
    event.preventDefault();

    fetch("http://localhost:4000/channels/mychannel/chaincodes/smartContract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        fcn: "createConsumer",
        peers: ["peer0.org1.example.com", "peer0.org2.example.com"],
        chaincodeName: "smartContract",
        channelName: "mychannel",
        args: [
          Consumer,
          ProductId,
          ProductName,
          Name,
          Address,
          Contact,
          Mail,
          SellerId,
          SellerName,
        ],
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert("Consumer added successfully");
        console.log(data);
        window.location.href = "http://localhost:3000/addconsumer";
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div>
      <div className={styles.topnav}>
        <a className={styles.active} href="addconsumer">Add Consumer</a>
        <a href="queryprod">Query Product</a>
        <a href="queryall">Query All Products</a>
        <a href="queryownerprod">Query Product Manufacturer</a>
        <a href="queryconsumer">Query Consumer</a>
        <a href="queryallconsumers">Query All Consumers</a>
        <a href="queryconsumercontact">Query Consumer By Contact</a>
        <a href="/">Logout</a>
      </div>
      <div className={styles.forms} style={{backgroundImage: `url(${background})`, backgroundSize: `500px 500px`, backgroundColor: `white`}}>
      <form onSubmit={AddConsumer}>
        <input
          value={Consumer}
          onChange={(e) => setConsumer(e.target.value)}
          type="text"
          placeholder="Consumer Number"
        />
        <br />
        <input
          value={ProductId}
          onChange={(e) => setProductId(e.target.value)}
          type="text"
          placeholder="Product Id"
        />
        <br />
        <input
          value={ProductName}
          onChange={(e) => setProductName(e.target.value)}
          type="text"
          placeholder="Product Name"
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
          value={SellerName}
          onChange={(e) => setSellerName(e.target.value)}
          type="text"
          placeholder="SellerName"
        />
        <br />
        <input
          value={Name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Consumer Name"
        />
        <br />
        <input
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="Address"
        />
        <br />
        <input
          value={Contact}
          onChange={(e) => setContact(e.target.value)}
          type="text"
          placeholder="Contact"
        />
        <br />
        <input
          value={Mail}
          onChange={(e) => setMail(e.target.value)}
          type="text"
          placeholder="Email Id"
        />
        <br />

        <input type="submit" value="Add Consumer" />
      </form>
      </div>
    </div>
  );
}

export default App;
