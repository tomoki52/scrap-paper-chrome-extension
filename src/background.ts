chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
  chrome.storage.sync.get("project", (value) => {
    if (tab.id == undefined) {
      console.log("undefined.");
      return;
    }
    var proj: string = "";
    proj = value["project"];
    if (proj == "") {
      chrome.tabs.create({ url: "options.html" });
    } else {
      chrome.tabs.sendMessage(tab.id, proj, (response) => {});
    }
  });
});

const updateContextMenus = async () => {
  await chrome.contextMenus.removeAll();
  const type = "normal";
  chrome.contextMenus.create({
    id: "options",
    type,
    title: "options",
    contexts: ["all"],
  });
};

chrome.runtime.onInstalled.addListener(updateContextMenus);
chrome.runtime.onStartup.addListener(updateContextMenus);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "options":
      chrome.tabs.create({ url: "options.html" });
      break;
  }
});
