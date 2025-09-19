const container = document.getElementById("news-container");

// Correct API URL
const apiUrl = "https://newsdata.io/api/1/latest?apikey=pub_3bd1c5b6df6e42e0ac823ec38640de26&q=news";

async function fetchNews() {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();
    showNews(data.results || []);
  } catch (err) {
    container.innerHTML = `<p style="color:red">Failed to load news: ${err}</p>`;
  }
}

function showNews(articles) {
  container.innerHTML = "";
  articles.forEach(item => {
    const imgSrc = item.image_url
      ? item.image_url
      : "https://via.placeholder.com/400x200?text=No+Image";

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${imgSrc}" alt="news image">
      <h3>${item.title}</h3>
      <p>${item.description || ""}</p>
      <a href="${item.link}" target="_blank" rel="noopener noreferrer">Read more</a>
    `;
    container.appendChild(card);
  });
}

fetchNews();
