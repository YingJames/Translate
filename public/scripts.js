function buttonClicked() {
  const clickButton = document.getElementById("btn");
  clickButton.addEventListener("click", () => {
    const query = document.getElementById("search").value;
    console.log("query:", query);
    const data = { query };
    const options = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };
    // send chinese search to ibm-translate api in index.js
    const response = fetch("/api", options);
  });
}

buttonClicked();
