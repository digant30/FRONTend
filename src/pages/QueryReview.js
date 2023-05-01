import { useState } from "react";
import styles from "../home.module.css";
import background from "/home/digant/FYP/api/client/src/images/fake.jpg"

function App() {

  const [ProdName, setProdName] = useState("");

  async function QueryReview(event) {
    event.preventDefault();
    console.time();
    fetch(
      'http://localhost:4000/channels/mychannel/chaincodes/smartContract?args=["' +
        ProdName +
        '"]&peer=peer0.org1.example.com&fcn=queryreview',
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then(function (response) {
        console.timeEnd();
        return response.json();
      })
      .then(function (data) {
        alert("Review query successful");
        console.log(data);
        var total = 0;
        var ct = 0;
        var incrt = 0;

        let container = document.getElementById("container");
        let avg = document.getElementById("avg");


        let table = document.createElement("table");
        table.setAttribute("class", styles.styledtable);

        const titleAttributes = [
          "Product Name",
          "Seller Name",
          "Review"
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
        
        data.forEach((item) => {
          let tr = document.createElement("tr");

          let vals = Object.values(item);
            //console.log(vals);
          vals.forEach((elem) => {
            let td = document.createElement("td");
            if (typeof elem === "object") {
              let vals1 = Object.values(elem);
              console.log(vals1);
              vals1.forEach((child) => {
                let td1 = document.createElement("td");
                td1.innerText = child;
                tr.appendChild(td1);
              });
            } else {
                incrt += 1;
                if(incrt % 2 == 0) {
                    total += elem;
                    ct += 1;
                }
                console.log(elem)
              td.innerText = elem;
              tr.appendChild(td);
            }
          });
          tableBody.appendChild(tr);
        });
        table.appendChild(tableHead);
        table.appendChild(tableBody);
        container.appendChild(table);
        avg.innerHTML = total/ct;
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div>
      <div className={styles.topnav}>
        <a href="authenticate">Authenticate</a>
        <a href="queryassethistory">Query Asset</a>
        <a href="addreview">Add Review</a>
        <a className={styles.active} href="queryreview">Query Review</a>
        <a href="/">Logout</a>
      </div>
      <div className={styles.forms} style={{backgroundImage: `url(${background})`}}>
      <form onSubmit={QueryReview}>
        <input
          value={ProdName}
          onChange={(e) => setProdName(e.target.value)}
          type="text"
          placeholder="Product Name"
        />
        <br />
        <input type="submit" value="Query Reviews" />
        <container id="container"></container>
        <br/>
        {/* <p>Average Review: <span id="avg"></span></p> */}
      </form>
      </div>
    </div>
  );
}

export default App;
