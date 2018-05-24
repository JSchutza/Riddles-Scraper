let fetch = require('node-fetch');
let JSSoup = require('jssoup').default;

function getRandomRiddle() {
    let pages = 22;
    let page = Math.floor(Math.random() * pages) + 1;

    return fetch("http://www.heavens-above.com", {timeout: 0})
        .then(res => res.text())
        .then(body => {
          let soup = new JSSoup(body);
  
          let posts = soup.findAll("article");
          let post = posts[Math.floor(Math.random() * posts.length)]
          
          soup = new JSSoup(post);
  
          let riddle = soup.find("h2", "entry-title").text;
          let answer = soup.find("div", "su-spoiler-content").text;

          return { riddle, answer }
        })
}

exports.getRandomRiddle = getRandomRiddle;