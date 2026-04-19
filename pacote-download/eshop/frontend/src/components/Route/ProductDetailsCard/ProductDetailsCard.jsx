import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../../server";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import axios from "axios";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [click, setClick] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  

  
  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Por favor logue na sua conta para criar uma conversa");
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-black bg-opacity-30 z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50 cursor-pointer"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%] flex flex-col items-start">
                <img
                  src={`${data.images && data.images[0]?.url}`}
                  alt=""
                  className="max-w-full h-auto max-h-[400px] object-contain"
                />
                <div className="flex mt-4 items-center">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex items-center">
                    <img
                      src={`${data.shop.avatar?.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                    </div>
                  </Link>
                </div>
                <div
                  className={`${styles.button} mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                  style={{ minWidth: "200px" }}
                >
                  <span className="text-white flex items-center">
                    Negocie este livro <AiOutlineMessage className="ml-1" size={20} />
                  </span>
                </div>
              </div>

              <div className="w-full 800px:w-[50%] flex flex-col justify-between pt-5 pl-[5px] pr-[5px]">
                <div>
                  <h1 className={`${styles.productTitle} text-[20px]`}>
                    {data.name}
                  </h1>
                  <br />
                  <h2>Autor: {data.author} </h2>
                  <h2>Editora: {data.publisher} </h2>
                  <p className="mt-4">{data.description}</p>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mt-5">
                    <h4 className="text-black text-xl font-bold">
                      {data.originalPrice ? "R$" + data.originalPrice : null}
                    </h4>
                    <div className="flex items-center">
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => removeFromWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => addToWishlistHandler(data)}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-2">
                    <span className="font-medium text-[#4444AC]">
                      Operação: {data.operation}
                    </span>
                    {data.operation === "Troca" && (
                      <span className="block text-[#6161C8]">
                        Troca por: {data.tradeFor}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
