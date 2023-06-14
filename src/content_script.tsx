chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  const url: string = location.href;
  if (url.includes("acm")) {
    registerAcmScrapBox(data.project);
  } else if (url.includes("ieee")) {
    registerIeeeScrapBox(data.project);
  }
  sendResponse("from content script");
});

function registerAcmScrapBox(proj: string) {
  const url: string = location.href;

  const title_collection = document.getElementsByClassName(
    "citation__title"
  ) as HTMLCollectionOf<HTMLElement>;

  const title = title_collection[0].innerText;

  const author_collection = document.getElementsByClassName(
    "author-name"
  ) as HTMLCollectionOf<HTMLElement>;

  const authors = Array.from(author_collection).map((e) => {
    return addLink(e.title);
  });

  const epub_section_title_collection = document.getElementsByClassName(
    "epub-section__title"
  ) as HTMLCollectionOf<HTMLElement>;

  const conference_with_year =
    epub_section_title_collection[0].innerText.split(":")[0];

  const abstract_collection = document.getElementsByClassName(
    "abstractSection abstractInFull"
  ) as HTMLCollectionOf<HTMLElement>;

  const abstract = abstract_collection[0].children[0].textContent;

  const conference: string = conference_with_year.split(" '")[0];

  const lines: string =
    url +
    "\n" +
    addLink(conference) +
    " " +
    addLink(conference_with_year) +
    "\n" +
    authors.join(", ") +
    "\n\n" +
    ">" +
    abstract +
    "\n\n" +
    "#survey";

  var body = encodeURIComponent(lines);
  window.open(
    "https://scrapbox.io/" +
      proj +
      "/" +
      encodeURIComponent(title.trim()) +
      "?body=" +
      body
  );
}
function registerIeeeScrapBox(proj: string) {
  const title_collection = document.getElementsByClassName(
    "document-title"
  ) as HTMLCollectionOf<HTMLElement>;
  const title = title_collection[0].children[0].textContent;
  console.log(title);
}
const addLink = (text: string) => {
  return "[" + text + "]";
};
