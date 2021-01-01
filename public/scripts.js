function buttonClicked() {
  const clickButton = document.getElementById("btn");
  clickButton.addEventListener("click", async () => {
    const query = document.getElementById("search").value;
    console.log("query:", query);
    const data = { query };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

function createResponse(result) {
  const translationResult = document.getElementById("translationResult");
  translationResult.textContent = `${result.search} => ${result.translation}`;
  const gif = document.getElementById("giphy");
  gif.src = result.gifURL;
}

buttonClicked();
