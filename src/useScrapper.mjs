import axios from 'axios';
import cheerio from 'cheerio';
// import express from 'express';
import fs from 'fs';

// const app = express();

const useScrapper = async (url) => {
    let response = await axios.get(url, {
        headers: {
            "Access-Control-Allow-Origin": true,
            "crossOrigin": true
        }
    })
    .then ( resp => {
        let $ = cheerio.load(resp.data);
        
        const data = {
            price: $(".a-price-whole").text().trim().split('.')[0],
            color: $(".a-row .selection").text().trim(),
            brand: $("#bylineInfo").text().trim().split(': ')[1],
            title: $("#productTitle").text().trim(),
            imgURL: $("#imgTagWrapperId").find('img').attr('src')
        }

        console.log(`Price: ${data.price}`);
        console.log(`Color: ${data.color}`);
        console.log(`Brand Name: ${data.brand}`);
        console.log(`Title: ${data.title}`);
        console.log(`Image URL: ${data.imgURL}`);

        fs.writeFile('./scrapper.json', JSON.stringify(data), (error) => {
          if (error) throw error;
        });
    })
    .catch (err => {
        console.log(err.message);
        console.log("oops");
    });
}

// eslint-disable-next-line react-hooks/rules-of-hooks
// useScrapper("https://www.amazon.in/GauriLaxmi-Enterprise-Cotton-Blend-Medium/dp/B0BB3DQJDR/ref=lp_1968248031_1_1?psc=1");

export default useScrapper;