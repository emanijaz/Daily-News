import React from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
// import InfiniteScroll from "react-infinite-scroll-component";

import { useEffect } from "react";
import { useState } from "react";

export default function News(props) {
  const [articles, setArticles] = useState({
    myarticles: null,
  });
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(true);

  const getArticles = async () => {
    setLoading(true);
    props.progress(40);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
      props.category
    }&apiKey=eccca83367cd402ba58f201778f34b60&page=${page + 1}&pageSize=${
      props.pageSize
    }`;
    let data = await fetch(url);

    let parsedData = await data.json();
    props.progress(70);
    setStatus(parsedData.status);
    if (parsedData.status) {
      setArticles({
        myarticles: parsedData.articles,
      });
    } else {
      setArticles({
        myarticles: null,
      });
    }
    setLoading(false);
    props.progress(100);

  };
  useEffect(() => {
    if (status) {
      getArticles();
    }
  }, [status, page, props.category, props.pageSize]);

  const previousBTnClick = () => {
    setPage(page-1)
  }

  const nextBTnClick = () => {
    setPage(page+1)
  }

  // const fetchData = async () => {

  //   // setLoading(true)
  //   setPage(page + 1);
  //   let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
  //     props.category
  //   }&apiKey=eccca83367cd402ba58f201778f34b60&page=${page+1}&pageSize=${
  //     props.pageSize
  //   }`;
  //   let data1 = await fetch(url);
  //   let parsedData1 = await data1.json();
  //   setStatus(parsedData1.status);
  //   if (parsedData1.status) {
  //     console.log('prev articles');

  //     console.log(articles.myarticles);

  //     setArticles({
  //       myarticles: articles.myarticles.concat(parsedData1.articles),
  //     });
  //     console.log('new articles');

  //     console.log(parsedData1.articles);
  //   } else {
  //     setArticles({
  //       myarticles: null,
  //     });
  //   }
  //   // setLoading(false)
  // };

  return (
    <div>
      {loading && <Spinner />}
      <div className="container">
        {articles.myarticles && (
          // <InfiniteScroll
          //   dataLength={articles.myarticles.length} //This is important field to render the next data
          //   next={fetchData}
          //   hasMore={status}
          //   loader={<Spinner></Spinner>}
          //   endMessage={
          //     <p style={{ textAlign: "center" }}>
          //       <b>Yay! You have seen it all</b>
          //     </p>
          //   }
          // >
            <div className="row">
              {!loading &&
                // articles.myarticles &&
                articles.myarticles.map((element, index) => {
                  return (
                    <div className="col-md-4 my-3" key={index}>
                      <NewsItem
                        title={element.title}
                        description={element.description}
                        url={element.url}
                        urlToImage={element.urlToImage}
                        author={element.author}
                        time={element.pusblishedAt}
                        source={element.source.name}
                        mode={props.mode}
                      />
                    </div>
                  );
                })}
              
            </div>
          // </InfiniteScroll>
        )}
        {!loading && 
            <div className='container d-flex justify-content-between my-5'>
              <button disabled={page <= 0} type="button" className="btn btn-outline-dark" onClick={previousBTnClick}> &larr; Previous</button>
              {status!== 'error' && articles.myarticles.length > 0 ?   
                <button type="button" className="btn btn-outline-dark" onClick={nextBTnClick}>Next &rarr;</button> : ""}
            </div> 
        }
        {articles.myarticles && articles.myarticles.length <= 0 ? <h3>No news to show.....</h3> : ""}
      </div>
    </div>
  );
}
