var data = { project: "" };
chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
  chrome.storage.sync.get("project", (value) => {
    if (tab.id == undefined) {
      console.log("undefined.");
      return;
    }
    data.project = value["project"] ?? "";
    if (data.project == "" || data.project == undefined) {
      chrome.tabs.create({ url: "options.html" });
    } else {
      console.log(data);
      chrome.tabs.sendMessage(tab.id, data, (response) => {});
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
