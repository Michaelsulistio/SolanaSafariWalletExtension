import React from "react";

export default function App() {
  const cardStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // for full viewport height centering
    backgroundColor: "#f4f4f4" // background color for the entire viewport
  };

  const contentStyle = {
    backgroundColor: "white", // background color of the card
    padding: "20px 40px",
    borderRadius: "10px", // to make it rounded
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" // some shadow for the floating effect
  };

  const getCurrentTabs = () => {
    console.log("Get Current Tabs");
  };

  const tabsClick1 = () => {
    console.log("Tabs Click 1");
    browser.tabs
      .create({
        url: "popup.html"
      })
      .then((tab) => {
        console.log("tab promise fulfilled");
      });
  };

  const tabsClick2 = () => {
    console.log("Tabs Click 2");
    browser.tabs.create();
  };

  const tabsClick3 = () => {
    console.log("Tabs Click 3");
    browser.tabs.create();
  };

  const tabsClick4 = () => {
    console.log("Tabs Click 4");
  };

  return (
    <div style={cardStyle}>
      <div style={contentStyle}>
        <h1>React App Popup</h1>
        <button onClick={getCurrentTabs}>Get Current Tabs</button>

        <button onClick={tabsClick1}>Tabs 1</button>
        <button onClick={tabsClick2}>Tabs 2</button>
        <button onClick={tabsClick3}>Tabs 3</button>
        {/* <Card title="Card 1" content="Body 1" /> */}
      </div>
    </div>
  );
}
