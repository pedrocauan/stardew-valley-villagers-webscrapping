const cheerio = require("cheerio");
const axios = require("axios");

const fetchData = async(url) =>{
    const result = await axios.get(url);
    return result.data;
}

const main = async () => {
    //entra no site
    const content = await fetchData("https://stardewvalleywiki.com/Villagers");
    //carrega o resultado
    const $ = cheerio.load(content);
    //array com os villagers do stardew valley
    let villagers = [];


    //itera sobre cada um dos personagens
    $("li.gallerybox").each((i, e) => {
        //pega o nome
        const title = $(e).find(`div.gallerytext > p > a`).text();
        //pega a foto do avatar
        const avatar = `https://stardewvalleywiki.com` +  $(e).find(".thumb > div > a > img").attr("src");
        // link da bio
        const link  = `https://stardewvalleywiki.com` +  $(e).find(".gallerytext > p > a").attr("href");   
        
        //junta os dados dentro da estrutura objeto
        const data = { title, avatar, link };

        //adiciona os dados ao array de villagers
        villagers.push(data);
    });

    //ordena em ordem alfabética os nomes
    villagers.sort(function(a, b){
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
    }); 

    console.log(villagers);
}

main();