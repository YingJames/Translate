
function buttonClicked() {
  const clickButton = document.getElementById("btn");
  clickButton.addEventListener("click", async () => {
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
    const response = await fetch("/search", options);
    const json = await response.json();
    console.log(json);
    createResponse(json);
  });
}
buttonClicked();

function createResponse(json) {
  let translation = json.translation;
  // Gets rid of the period in translation
  let translation = translation.slice(0, translation.length-1);
  
}
