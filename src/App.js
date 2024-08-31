import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("https://66cf69ff901aab24842216a6.mockapi.io/items")
      .then((res) => {
        const itemsInCart = res.data.filter((item) => item.isInCart === true);
        setCartItems(itemsInCart);
        setItems(res.data);
      });
  }, []);

  const addToCart = (item) => {
    axios
      .put(`https://66cf69ff901aab24842216a6.mockapi.io/items/${item.id}`, {
        ...item,
        isInCart: true,
      })
      .then((response) => {
        setCartItems((prev) => [...prev, response.data]);
      });
  };

  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find((item) => item.id === id);

    if (itemToRemove) {
      axios
        .put(`https://66cf69ff901aab24842216a6.mockapi.io/items/${id}`, {
          ...itemToRemove,
          isInCart: false,
        })
        .then(() => {
          setCartItems((prev) => prev.filter((item) => item.id !== id));
        });
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={removeFromCart}
        />
      )}

      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route path="/favorites" element={<div>Привет</div>} />
      </Routes>

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input onChange={onChangeSearchInput} placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                isInCart={item.isInCart}
                imageUrl={item.imageUrl}
                onPlus={(obj) => addToCart(obj)}
                onChecked={(obj) => removeFromCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
