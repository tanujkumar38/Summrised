// Set your RSS feed URL here
const feedUrl = "http://feeds.feedburner.com/ign/games-all";

// Get the feed data
fetch(feedUrl)
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data,"text/xml");

    // Get the feed title
    const feedTitle = xmlDoc.querySelector("title").textContent;
    document.querySelector(".feed-title").textContent = feedTitle;

    // Get the feed items
    const items = xmlDoc.querySelectorAll("item");
    const feedItems = document.querySelector(".feed-items");

    // Loop through each feed item and add it to the page
    items.forEach(item => {
      const title = item.querySelector("title").textContent;
      const description = item.querySelector("description").textContent;
      const link = item.querySelector("link").textContent;

      const itemDiv = document.createElement("div");
      itemDiv.className = "feed-item";

      const titleDiv = document.createElement("div");
      titleDiv.className = "feed-item-title";
      titleDiv.textContent = title;

      const descriptionDiv = document.createElement("div");
      descriptionDiv.className = "feed-item-description";
      descriptionDiv.innerHTML = description;

      const linkA = document.createElement("a");
      linkA.className = "feed-item-link";
      linkA.href = link;
      linkA.textContent = "Read more";

      itemDiv.appendChild(titleDiv);
      itemDiv.appendChild(descriptionDiv);
      itemDiv.appendChild(linkA);
      feedItems.appendChild(itemDiv);
    });
  })
  .catch(error => console.error(error));