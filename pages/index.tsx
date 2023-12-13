import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { GetServerSideProps} from 'next'
import {NewsArticle, NewsResponse} from '@/models/NewsArticles'
import NewsArticleEntry from '@/components/NewsArticleEntry'
import NewsArticleGrid from '@/components/NewsArticleGrid'
import {Alert} from 'react-bootstrap'

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[],
}

export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
//await new Promise(r => setTimeout(r,3000));
  const response = await fetch("https://newsapi.org/v2/top-headlines?country=at&apiKey=" + process.env.NEWS_API_KEY);
  const newsResponse: NewsResponse = await response.json();
  return {
    props:{ newsArticles: newsResponse.articles}
  }
  //let error go to 500 page
} 

export default function BreakingNewsPage({ newsArticles }: BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key="title">Austria News</title>
      </Head>
      <main>
        <h1>Austria News</h1>
        <Alert>
        我希望这可以帮助你
        </Alert>      
        <NewsArticleGrid articles={newsArticles} />
      </main>
    </>
  )
}
