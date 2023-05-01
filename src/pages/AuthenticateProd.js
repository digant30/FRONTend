import { useState } from "react";
import styles from "../home.module.css";
import background from "/home/digant/FYP/api/client/src/images/fake.jpg"

function App() {

  const [ProductIdAuth, setAuthProductId] = useState("");

  async function AuthenticateProduct(event) {
    event.preventDefault();

    fetch('http://localhost:4000/channels/mychannel/chaincodes/smartContract?args=["' +ProductIdAuth +'"]&peer=peer0.org1.example.com&fcn=authenticate',
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
        alert("Product details Fetched");
        console.log(data);

        let container = document.getElementById("container");

        let table = document.createElement("table");
        table.setAttribute("class", styles.styledtable);

        const titleAttributes = [
          "Address",
          "Contact Number",
          "Mail Id",
          "Consumer Name",
          "Product Id",
          "Product Name",
          "Seller Id",
          "Seller Name"
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

        data.forEach(function (obj) {
          let tr = document.createElement("tr");
          let vals = Object.values(obj);
          vals.forEach((elem) => {
            let td = document.createElement("td");
            td.innerText = elem;
            tr.appendChild(td);
          });
          tableBody.appendChild(tr);
        });
        table.appendChild(tableHead);
        table.appendChild(tableBody);
        container.appendChild(table);
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div>
      <div className={styles.topnav}>
        <a className={styles.active} href="authenticate">Authenticate</a>
        <a href="queryassethistory">Query Asset</a>
        <a href="addreview">Add Review</a>
        <a href="queryreview">Query Review</a>
        <a href="/">Logout</a>
      </div>
      <div className={styles.forms} style={{backgroundImage: `url(${background})`}}>
      <form onSubmit={AuthenticateProduct}>
        <input
          value={ProductIdAuth}
          onChange={(e) => setAuthProductId(e.target.value)}
          type="text"
          placeholder="Enter Product ID"
        />
        <br />
        <input type="submit" value="Authenticate" />

        <container id="container"></container>
      </form>
      </div>
    </div>
  );
}

export default App;