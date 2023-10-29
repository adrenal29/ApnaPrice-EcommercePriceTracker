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
    url: 'https://amazon-product-price-data.p.rapidapi.com/product',
    params: {
      asins: productId,
      locale: 'IN'
    },
    headers: {
      'X-RapidAPI-Key': '166a2ea0damsha558f4687cfabedp1f2e96jsnf9e38b55de6f',
      'X-RapidAPI-Host': 'amazon-product-price-data.p.rapidapi.com'
    }
  };
  

  try {
    // Fetch the product page
    // const response = await axios.request(options);
    const response={data:[{
      product_name:"test",
      current_price:100,
      image_url:"",
      currency_symbol:"Rs",
    }]}

    console.log("DaTA")
    console.log(response.data)

    // Extract the product title
    const title = response.data[0].product_name;
    const currentPrice = response.data[0].current_price;

    const originalPrice = response.data[0].current_price;

    // const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

    // const images = 
    //   $('#imgBlkFront').attr('data-a-dynamic-image') || 
    //   $('#landingImage').attr('data-a-dynamic-image') ||
    //   '{}'

    const imageUrls =response.data[0].image_url;

    const currency = response.data[0].currency_symbol;
    // const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");

    // const description = extractDescription($)

    // Construct data object with scraped information
    const data = {
      url,
      currency: currency || '$',
      image: imageUrls,
      title,
      currentPrice: currentPrice,
      originalPrice: originalPrice,
      priceHistory: [],
      discountRate:0,
      category: 'category',
      reviewsCount:100,
      stars: 4.5,
      isOutOfStock: false,
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