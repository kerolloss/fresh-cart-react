import React, { useContext } from 'react';
import styles from './Home.module.css';
import Products from '../Products/Products'
import Cart from '../Cart/Cart'
import { CounterContext } from '../../Context/CounterContext';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';

export default function Home() {

  let {changeCounter} = useContext(CounterContext);

  return <>
    
     <FeaturedProducts/>
  </>
}
