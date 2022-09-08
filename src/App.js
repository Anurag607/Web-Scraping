import './App.css';
import useScrapper from './useScrapper.mjs'
// import {useState, useEffect, useRef} from 'react';

const url = "https://www.amazon.in/GauriLaxmi-Enterprise-Cotton-Blend-Medium/dp/B0BB3DQJDR/ref=lp_1968248031_1_1?psc=1";

const Sizespan = (props) => {
  return ( <span>{props.label}</span> )
}

const Sizes = () => {
  const size = ['S', 'M', 'L', 'XL', 'XXL'];
  var row = [];

  size.forEach(el => {
    row.push(<Sizespan key={el} label = {el}/>);
  });

  return (
    <div className="Size">
      {row}
    </div>
  )
}

function App() {

  const data = useScrapper(url);

  return (
    <div className="App">

      <div className="card">
        <div className="cardImg" />

        <div className="info">

          <div className="stock">
            <span className="in">In Stock</span>
          </div>
          <div className="name">
            <span>{data.brand}</span>
            <span>{data.title}</span>
          </div>
          <div className="details">
            <Sizes />
            <span className="price">₹{data.price}</span>
          </div>

        </div>

        <div className="add">
          <img src={process.env.PUBLIC_URL + 'shopping-bag.png'} alt="bag" />
          <span>Add To Bag</span>
        </div>

      </div>

    </div>

  );
}

export default App;