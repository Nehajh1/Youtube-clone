import React, { useEffect, useState } from 'react'
import './Feed.css'
import mountain1 from '../../assets/mountain1.jpg'
import car2 from '../../assets/car2.jpg'
import mountain3 from '../../assets/mountain3.jpg'
import beach1 from '../../assets/beach1.jpg'
import car1 from '../../assets/car1.jpg'
import mountain2 from '../../assets/mountain2.jpg'
import sandal from '../../assets/sandal.jpg'
import group1 from '../../assets/group1.jpg'
import { Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'

const Feed = ({category}) => {

   const [data,setData] =useState([]);

   const fetchData = async () => {
      const videoList_url =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
      await fetch(videoList_url).then(response=>response.json()).then(data=>setData(data.items))
   }

   useEffect(()=>{
      fetchData();
   },[category])


  return (
    <div className='feed'>
      {data.map((item,index)=>{
         return(
      <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
            <img src={item.snippet.thumbnails.medium.url} alt=''/>
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
      </Link> 
         )
      })}     
    </div>
   
  )
}

export default Feed
