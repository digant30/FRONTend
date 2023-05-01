import { useState } from "react";
import styles from "../home.module.css";
import background from "/home/digant/FYP/api/client/src/images/adidas.png";

function App() {
  const [sellerId, setSellerId] = useState("");

  async function QuerySeller(event) {
    event.preventDefault();

    fetch(
      'http://localhost:4000/channels/mychannel/chaincodes/smartContract?args=["' +
        sellerId +
        '"]&peer=peer0.org1.example.com&fcn=querySeller',
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert("Seller query successful");
        console.log(data);

        let container = document.getElementById("container");

        let table = document.createElement("table");
        table.setAttribute("class", styles.styledtable);

        const titleAttributes = [
          "Address",
          "Brand",
          "Manager Name",
          "Manager Id",
          "Store Name",
          "Seller Id"
        ];
        let tableHead = document.createElement("thead");
        let trTitle = document.createElement("tr");

        titleAttributes.forEach((titleCard) => {
          let th = document.createElement("th");
          th.innerText = titleCard;
          trTitle.appendChild(th);
        });
        tableHead.appendChild(trTitle);
      
        let tableBody = document.createElement("tbody");

        let tr = document.createElement("tr");
        let vals = Object.values(data);
        vals.forEach((elem) => {
          let td = document.createElement("td");
          td.innerText = elem;
          tr.appendChild(td);
        });
        tableBody.appendChild(tr);
        table.appendChild(tableHead);
        table.appendChild(tableBody);
        container.appendChild(table);
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div>
      <div className={styles.topnav}>
        <a href="addproduct">Add Product</a>
        <a href="addseller">Add Seller</a>
        <a href="changeowner">Change Product Owner</a>
        <a className={styles.active} href="queryseller">Query Seller</a>
        <a href="queryallsellers">Query All Sellers</a>
        <a href="queryconsumermanu">Query Consumer</a>
        <a href="queryallconsumersmanu">Query All Consumers</a> 
        <a href="/">Logout</a>
      </div>
      <div className={styles.forms} style={{backgroundImage: `url(${background})`}}>
      <form onSubmit={QuerySeller}>
        <input
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
          type="text"
          placeholder="Seller Number"
        />
        <br />

        <input type="submit" value="Query Seller" />
        <container id="container"></container>
      </form>
      </div>
    </div>
  );
}

export default App;
