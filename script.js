'use stirct';

//*==========================================================
//* Selectng Elements
//*==========================================================

const api_key = 'e32f8d59a3594762850480b10f8ef40a';
const url = 'https://newsapi.org/v2/everything?q=';
const gear_btn = document.getElementsByClassName('fa-gear')[0];
const settings = document.getElementsByClassName('settings-modal-win')[0];
const close_btn = document.getElementsByClassName('fa-xmark')[0];
const overlay = document.getElementsByClassName('overlay')[0];
const body = document.getElementsByTagName('body')[0];
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
const root = document.querySelector(':root').style;
const logo = document.querySelector('.company-logo');
const select = document.getElementsByClassName('fa-circle-check');
const default_theme_btn = document.getElementById('default-theme');
const dark_theme_btn = document.getElementById('dark-mode');
const light_theme_btn = document.getElementById('light-mode');

//*==========================================================
//* API calls
//*==========================================================

window.addEventListener('load', () => fetchNews('India'));

async function fetchNews(query) {
  const response = await fetch(`${url}${query}&apikey=${api_key}`);
  const data = await response.json();
  bind_data(data.articles);
}

function bind_data(articles) {
  const cards_container = document.getElementById('cards-container');
  const news_card_template = document.getElementById('news-card-template');

  cards_container.innerHTML = '';

  articles.forEach(article => {
    if (!article.urlToImage) return;
    const card_clone = news_card_template.content.cloneNode(true);
    fill_data_in_card(card_clone, article);
    cards_container.appendChild(card_clone);
  });
}

function fill_data_in_card(cardclone, article) {
  const news_img = cardclone.querySelector('#news-img');
  const news_title = cardclone.querySelector('#news-title');
  const news_source = cardclone.querySelector('#news-source');
  const news_desc = cardclone.querySelector('#news-desc');

  news_img.src = article.urlToImage;
  news_title.innerHTML = article.title;
  news_desc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
  });

  news_source.innerHTML = `${article.source.name} • ${date}`;

  cardclone.firstElementChild.addEventListener('click', () =>
    window.open(article.url, 'blank')
  );
}

//*==========================================================
//* Implementing setting modal window
//*==========================================================

const close_modal = () => {
  settings.classList.add('hidden');
  overlay.classList.add('hidden');
  body.removeAttribute('style', 'overflow:hidden;');
};

gear_btn.addEventListener('click', () => {
  settings.classList.remove('hidden');
  overlay.classList.remove('hidden');
  body.setAttribute('style', 'overflow:hidden;');
});

close_btn.addEventListener('click', close_modal);
overlay.addEventListener('click', close_modal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !settings.classList.contains('hidden')) {
    close_modal();
  }
});


//*==========================================================
//* Implementing Theme
//*==========================================================



const check = theme => {
  for (let i = 0; i < select.length; i++) {
    select[i].style.display = 'none';
  }
  select[theme].style.display = 'inline';
};


const dark_theme = () => {
  body.classList.remove('light-theme');
  logo.setAttribute('src', 'asset/darklogo.png');
};

const light_theme = () => {
  body.classList.add('light-theme');
  logo.setAttribute('src', 'asset/lightlogo.png');
};

const set_default_theme = () => {
  if (prefersDarkMode.matches) {
    dark_theme();
  } else {
    light_theme();
  }
  check(0);
};

default_theme_btn.addEventListener('click', () => {
  set_default_theme();
});

light_theme_btn.addEventListener('click', () => {
  light_theme();
  check(1);
});

dark_theme_btn.addEventListener('click', () => {
  dark_theme();
  check(2);
});

set_default_theme();

//*==========================================================
//* Submit button
//*==========================================================

// const msg = document.querySelector('.msg');
// const sumbitbtn = document.getElementById('submitbtn');

// msg.addEventListener('focus', submsg);

// function submsg() {
//   sumbitbtn.style.display = 'block';
//   sumbitbtn.style.animation = 'slide 0.5s ease-in-out';
// }
