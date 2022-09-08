import axios from 'axios';
import cheerio from 'cheerio';

const useScrapper = async (url) => {
    let response = await axios.get(url, {
        headers: {
            "Access-Control-Allow-Origin": "*",
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

        return data;
    })
    .catch (err => {
        console.log(err.message);
        console.log("oops");
    });
}

export default useScrapper;