"use server"

import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice } from '../utils';

export async function scrapeAmazonProduct(url: string) {
  if(!url) return;
  let productId:any="";
  if (url) {
    const match = url.match(/\/dp\/([A-Z0-9]+)\//);
    productId = match ? match[1] : null; // Set productId to null if no match is found
  
    console.log(productId);
  } else {
    console.log("URL is null or undefined");
  }
  const options = {
    method: 'GET',
    url: 'https://amazon23.p.rapidapi.com/product-details',
    params: {
      asin: 'B01M72LILF',
      country: 'IN'
    },
    headers: {
      'X-RapidAPI-Key': '166a2ea0damsha558f4687cfabedp1f2e96jsnf9e38b55de6f',
      'X-RapidAPI-Host': 'amazon23.p.rapidapi.com'
    }
  };

  try {
    // Fetch the product page
    const response = await axios.request(options);
    // const response={
    //   data:{
    //   result:[{
    //   title:"test",
    //   main_image:"None",
    //   item_available:true,
    //   price:{
    //   current_price:100,
    //   before_price:100,
    //   saving_percent:10,
    //   symbol:"Rs"
    //   },
    //   categories:[{category:"General"}],
    //   image_url:"",
    //   currency_symbol:"Rs",
    // }]}}

    console.log("DaTA")
    console.log(response.data)

    // Extract the product title
    const title = response.data.result[0].title;
    const currentPrice = response.data.result[0].price.current_price;

    const originalPrice = response.data.result[0].price.before_price;

    // const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

    // const images = 
    //   $('#imgBlkFront').attr('data-a-dynamic-image') || 
    //   $('#landingImage').attr('data-a-dynamic-image') ||
    //   '{}'

    const imageUrls =response.data.result[0].main_image;
    const discountRate=response.data.result[0].price.saving_percent
    const currency = response.data.result[0].price.symbol;
    const category=response.data.result[0].categories[0].category
    const stock=response.data.result[0].item_available
    // const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");

    // const description = extractDescription($)

    // Construct data object with scraped information
    const data = {
      url,
      currency: currency || 'Rs',
      image: imageUrls,
      title,
      currentPrice: currentPrice,
      originalPrice: originalPrice,
      priceHistory: [],
      discountRate:discountRate,
      category: category||'category',
      reviewsCount:100,
      stars: 4.5,
      isOutOfStock: stock || false,
      description:"",
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    }

    return data;
  } catch (error: any) {
    console.log(error);
  }
}