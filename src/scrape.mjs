/* eslint-disable no-unused-vars */
import axios from 'axios';
import cheerio from 'cheerio';

const scrape = async (url) => {

    let data = {};

    let response = await axios.get(url, {
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    })
    .then ( resp => {
        let $ = cheerio.load(resp.data);
        
        data = {
            price: $(".a-price-whole").text().trim().split('.')[0],
            color: $(".a-row .selection").text().trim(),
            brand: $("#bylineInfo").text().trim().split(': ')[1],
            title: $("#productTitle").text().trim(),
            imgURL: $("#imgTagWrapperId").find('img').attr('src')
        }

        // console.log(`Price: ${data.price}`);
        // console.log(`Color: ${data.color}`);
        // console.log(`Brand Name: ${data.brand}`);
        // console.log(`Title: ${data.title}`);
        // console.log(`Image URL: ${data.imgURL}`);
        // console.log(data);
    })
    .catch (err => {
        console.log(err.message);
        console.log("oops");
    });
    return data;
}

export default scrape;