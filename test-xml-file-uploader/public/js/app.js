async function main() {
  const buttonOne = document.querySelector("[data-button-1]");
  const buttonTwo = document.querySelector("[data-button-2]");
  const { data: xmlSimple } = await axios.get("/xml/simple.xml");

  const encoder = new TextEncoder();
  const xmlArrayBuffer = encoder.encode(xmlSimple);

  console.log(
    "🚀 ~ file: app.js ~ line 5 ~ main ~ xmlSimple",
    typeof xmlSimple,
    xmlSimple
  );

  async function handleButtonOne() {
    const { data, status } = await axios.post(
      "/api/xml-string?filename=" + encodeURIComponent("Just simple xml"),
      xmlArrayBuffer,
      {
        headers: {
          "Content-Type": "application/xml",
        },
      }
    );
  }

  async function handleButtonTwo() {
    const form = new FormData();
    const xmlFile = new File([xmlArrayBuffer], "simple.xml", {
      lastModified: Date.now(),
      name: "simple.xml",
      type: "application/xml",
    });
    form.append("xmlFile", xmlFile, "simple.xml");
    const { data, status } = await axios({
      method: "post",
      url: "/api/xml-file",
      data: form,
    });
  }

  buttonOne.addEventListener("click", handleButtonOne);
  buttonTwo.addEventListener("click", handleButtonTwo);
}

main().catch(console.error);
