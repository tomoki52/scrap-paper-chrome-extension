chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
  if (tab.id == undefined) {
    console.log("undefined.");
    return;
  }
  chrome.tabs.sendMessage(tab.id, "register", (response) => {
    console.log(response);
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
