import React from 'react';
import styles from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  let params = useParams();
  console.log(params);
  //https://ecommerce.routemisr.com/
  return <>
    <h1>ProductDetails</h1>
  </>
}
