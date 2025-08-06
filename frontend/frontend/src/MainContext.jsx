import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure this is imported once in your app
import { useSelector } from 'react-redux';

export const Context = createContext();

export default function MainContext({ children }) {
  const [allCategory, setAllCategory] = useState([]);
  const [allColor, setAllColor] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const token = useSelector((state) => state.admin.token);
  const [singleProduct, setSingleProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const user = useSelector((state) => state.user.data);


  // LocalStorage-backed cart state
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const stored = localStorage.getItem("wishlistItems");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist cart and wishlist to localStorage on change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);
  const handleOpenWishlist = () => setIsWishlistOpen(true);
  const handleCloseWishlist = () => setIsWishlistOpen(false);



const addToWishlist = (product) => {
  if (wishlistItems.find(item => item.id === product.id)) {
    toast.error("Item already in wishlist!", {
      style: { background: "#FFE4E1", color: "#B00020" }
    });
    return;
  }

  setWishlistItems(prev => [...prev, {
        ...product,
        img: product.main_img || product.img || product.image || "" // <-- this line ensures both API and local work
      }]);

  if (user) {
    axios.post(`${API_URL}/user/addtowishlist`, {
      user_id: user._id,
      product_id: product.id
    })
      .then(success => {
        console.log(success.data);
      })
      .catch(err => console.log(err));
  }

  toast.success("Item added to wishlist!", {
    style: { background: "#FFF8E1", color: "#4B0055" }
  });

  handleOpenWishlist();
};





  const addToCart = (product) => {
    // console.log(product)
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems(prev => [...prev, {
        ...product,
        img: product.main_img || product.img || product.image || "",  // <-- this line ensures both API and local work
        discount: product.discount || product.discount_percentage || 0,
        quantity: 1
      }]);
    }

    if (user) {
      axios.post(API_URL + '/user/addtocart', {
        user_id: user._id,
        product_id: product.id
      }).then(
        (success) => {
          console.log(success)
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
    }

    toast.success("Item added to Cart!", {
      style: {
        background: "#FFF8E1",
        color: "#4B0055"
      }
    });
    handleOpenCart();
  };


 const updateCartQuantity = (id, delta) => {
  setCartItems(items =>
    items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    )
  );

  if (user) {
    axios.patch(`${API_URL}/user/updatecartquantity`, {
      user_id: user._id,
      product_id: id,
      delta
    })
      .then(success => {
        // console.log(success.data);
        setCartFromDB(success.data.latestCart);
      })
      .catch(err => console.log(err));
  }
};


 const removeFromCart = (id) => {
  setCartItems(items => items.filter(item => item.id !== id));

  if (user) {
    axios.delete(`${API_URL}/user/removefromcart/${user._id}/${id}`)
      .then(success => {
        // console.log(success.data);
        setCartFromDB(success.data.latestCart);
      })
      .catch(err => console.log(err));
  }

  toast.success("Item removed from Cart!", {
    style: { background: "#FFF8E1", color: "#4B0055" }
  });
};


 const removeFromWishlist = (id) => {
  setWishlistItems(items => items.filter(item => item.id !== id));

  if (user) {
    axios.delete(`${API_URL}/user/removefromwishlist/${user._id}/${id}`)
      .then(success => {
        console.log(success.data);
      })
      .catch(err => console.log(err));
  }

  toast.success("Item removed from wishlist!", {
    style: { background: "#FFF8E1", color: "#4B0055" }
  });
};

const moveWishlistToDb = (wishlist, userId) => {
  if (userId) {
    axios.post(`${API_URL}/user/movewishlisttodb/${userId}`, wishlist)
      .then((success) => {
        console.log("Wishlist moved to DB:", success.data);
        setWishlistItems(success.data.latestWishlist.map(item => ({
          id: item.product_id._id,
          title: item.product_id.productName,
          img: item.product_id.main_img,
          price: item.product_id.final_price
        })));
        localStorage.removeItem("wishlistItems");
      })
      .catch(err => console.log(err));
  }
};



  const setCartFromDB = (latestCart) => {
    const formattedCart = latestCart.map(item => ({
      id: item.product_id._id,
      title: item.product_id.productName,
      img: item.product_id.main_img,
      price: item.product_id.final_price,
      discount: item.product_id.discount_percentage || item.product_id.discount || 0,  
      quantity: item.qty
    }));

    setCartItems(formattedCart);
    localStorage.removeItem("cartItems");
  };






  const API_URL = 'http://localhost:5001';
  const Category_URL = '/category';
  const Color_URL = '/color';
  const Product_URL = '/product';

  const toastMsg = (msg, status) => {
    toast(msg, {
      type: status === true ? 'success' : 'error',
      theme: 'dark', // ✅ Set dark theme here
    });
  };




  const fetchProduct = async (product_id = null, limit = 0, categoryslug = null, productColor = null, minPrice = null, maxPrice = null) => {
    let productLink = API_URL + Product_URL;

    if (product_id) {
      productLink += `/${product_id}`;
    }

    const query = new URLSearchParams();
    if (limit) query.append("limit", limit);
    if (categoryslug) query.append("categoryslug", categoryslug);
    if (productColor) query.append("productColor", productColor);
    if (minPrice !== null) query.append("minPrice", minPrice);
    if (maxPrice !== null) query.append("maxPrice", maxPrice);

    try {
      const response = await axios.get(productLink + (product_id ? '' : '?' + query));

      if (product_id) {
        const data = response.data.product;
        return data;
      } else {
        const data = response.data.products;
        setAllProduct(data);
        return data;
      }

    } catch (err) {
      console.error("Fetch Error:", err);
      return null;
    }
  };



  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchColor = (color_id = null) => {
    let colorLink = API_URL + Color_URL;
    if (color_id) {
      colorLink += `/${color_id}`;
    }
    axios
      .get(colorLink)
      .then((success) => {
        setAllColor(success.data.color);
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCategory = (category_id = null) => {
    let categoryLink = API_URL + Category_URL;
    if (category_id) {
      categoryLink += `/${category_id}`;
    }
    axios
      .get(categoryLink, { headers: { Authorization: token } })
      .then((success) => {
        setAllCategory(success.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Context.Provider
        value={{
          toastMsg,
          fetchCategory,
          allCategory,
          API_URL,
          Category_URL,
          Color_URL,
          fetchColor,
          allColor,
          Product_URL,
          fetchProduct,
          allProduct,
          setSingleProduct,
          singleProduct,
          handleOpenCart,
          handleCloseCart,
          handleCloseWishlist,
          handleOpenWishlist,
          cartItems,
          wishlistItems,
          isCartOpen,
          isWishlistOpen,
          removeFromCart,
          removeFromWishlist,
          updateCartQuantity,
          addToCart,
          addToWishlist,
          setCartFromDB,
          setCartItems,
          moveWishlistToDb
        }}
      >
        {children}
        <ToastContainer
          autoClose={1000}
          position="top-right"
          theme="dark" // ✅ Dark mode toast
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </Context.Provider>
    </>
  );
}

