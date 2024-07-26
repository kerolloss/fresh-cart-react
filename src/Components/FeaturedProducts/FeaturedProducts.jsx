import React, { useEffect, useState } from 'react';
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';


export default function FeaturedProducts() {
  
  async function getFeaturedProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }  

  const {isLoading, isError, data, isFetching} = useQuery('featuredProducts', getFeaturedProducts, {
    // cacheTime:3000,
    // refetchOnMount:true,
    // staleTime:30000,
    // refetchInterval:3000,  
  });
  // console.log(data?.data.data);

  
  // const [products, setProducts] = useState([])
  // const [isLoading, setIsLoading] = useState(false)

  // async function getFeaturedProducts(){
  //   setIsLoading(true);
  //   let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
  //   setProducts(data.data);
  //   setIsLoading(false);
  // }

  // useEffect(() => {
  //   getFeaturedProducts();
  // }, [])

  return <>
    {isLoading? <div className="w-100 py-5 d-flex justify-content-center">
    <i className="fas fa-spinner fa-spin fa-3x"></i>
  </div> : <div className="container py-2">
      <h2>Featured Products</h2>
      <div className="row">
        {data?.data.data.map((product)=> <div key={product.id} className='col-md-2'>
          <Link to={`./productdetails/${product.id}`} >
          <div className="product cursor-pointer py-3 px-2">
            <img className='w-100' src={product.imageCover} alt={product.title} />

            <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
            <h3 className="h6">{product.title.split(" ").slice(0,2).join(' ')}</h3>

            <div className="d-flex justify-content-between mt-3">
              <span>{product.price} EGP</span>

              <span><i className='fas fa-star rating-color'></i> {product.ratingsAverage}</span>
            </div>
              <button className='btn bg-main text-white w-100 btn-sm mt-2'>add to cart</button>
          </div>
          </Link>
        </div>)}
      </div>
    </div>
  }
    
  </>
}
