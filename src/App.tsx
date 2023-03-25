import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './router/Router';
import { setBasketItems } from './store/features/basket/basketSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const items = localStorage.getItem("basket");
    if(items){
      dispatch(setBasketItems(JSON.parse(items)))
    }
  })
  return (
    <Router/>
  );
}

export default App;
