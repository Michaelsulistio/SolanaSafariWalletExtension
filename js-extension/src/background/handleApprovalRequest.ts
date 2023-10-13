export default async function handleApprovalRequest() {
  browser.tabs
    .create({
      url: "approval.html"
    })
    .then((tab) => {
      console.log("Tab fullfillment: ", tab);
    });
}
