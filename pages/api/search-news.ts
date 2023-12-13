// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NewsResponse } from '@/models/NewsArticles';
import { error } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next'
import { json } from 'stream/consumers';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchQuery = req.query.q?.toString();

  if(!searchQuery){
    return res.status(400).json({error: "Please provide a search query"})
  }

  const Response = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${process.env.NEWS_API_KEY}`);
  const newsResponse: NewsResponse = await Response.json();

  res.status(200).json(newsResponse.articles);
}
