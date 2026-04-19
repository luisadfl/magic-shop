import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { getAllProductsShop } from "../../redux/actions/product";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { server } from "../../server";
import {
    addToWishlist,
    removeFromWishlist,
  } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import axios from "axios";

const ProductDetails = ({ data }) => {
    const { wishlist } = useSelector((state) => state.wishlist);
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { products } = useSelector((state) => state.products);
    //const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
     useEffect(() => {
       dispatch(getAllProductsShop(data && data?.shop._id));
       if (wishlist && wishlist.find((i) => i._id === data?._id)) {
         setClick(true);
       } else {
         setClick(false);
       }
     }, [data, wishlist]);

     const removeFromWishlistHandler = (data) => {
       setClick(!click);
       dispatch(removeFromWishlist(data));
     };
   
     const addToWishlistHandler = (data) => {
       setClick(!click);
       dispatch(addToWishlist(data));
     };

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

    return (
        <div className="bg-white">
            {data ? (
                <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
                    <div className="w-full py-5">
                        <div className="block w-full 800px:flex">
                            <div className="w-full 800px:w-[50%]">
                                <img
                                    src={`${data && data.images[select]?.url}`}
                                    alt=""
                                    className="w-[80%]"
                                />
                                <div className="w-full flex">
                                    {data &&
                                        data.images.map((i, index) => (
                                            <div
                                                className={`${select === 0 ? "border" : "null"
                                                    } cursor-pointer`}
                                            >
                                                <img
                                                    src={`${i?.url}`}
                                                    alt=""
                                                    className="h-[200px] overflow-hidden mr-3 mt-3"
                                                    onClick={() => setSelect(index)}
                                                />
                                            </div>
                                        ))}
                                    <div
                                        className={`${select === 1 ? "border" : "null"
                                            } cursor-pointer`}
                                    ></div>
                                </div>
                            </div>
                            <div className="w-full 800px:w-[50%] pt-5">
                                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                                <br/>
                                <h2>Autor: {data.author} </h2>
                                <h2>Editora: {data.publisher} </h2>
                                <p>{data.description}</p>
                                <br/>
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

                                <div className="flex items-center mt-12 justify-between pr-3">
                                    <div className="flex pt-3">

                                        <h3 className="text-black font-bold text-lg">
                                            {data.originalPrice ? "R$" + data.originalPrice : null}
                                        </h3>
                                    </div>
                                    <div>
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
                                                color={click ? "red" : "#333"}
                                                title="Add to wishlist"
                                            />
                                        )}
                                    </div>

                                </div>
                                <div className="flex items-center pt-8">

                                    <Link to={`/shop/preview/${data?.shop._id}`}>
                                        <img
                                            src={`${data?.shop?.avatar?.url}`}
                                            alt=""
                                            className="w-[50px] h-[50px] rounded-full mr-2"
                                        />
                                    </Link>
                                    <div className="pr-8">
                                        <Link to={`/shop/preview/${data?.shop._id}`}>
                                            <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                                                {data.shop.name}
                                            </h3>
                                        </Link>
                                    </div>
                                    <div
                                        className={`${styles.button} mt-4 rounded-[6px] h-11 flex items-center justify-center`}
                                        onClick={handleMessageSubmit}
                                        style={{ minWidth: "200px" }}
                                    >
                                        <span className="text-white flex items-center">
                                            Negocie este livro <AiOutlineMessage className="ml-1" size={20} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductDetailsInfo
                        data={data}
                        products={products}
                    />
                    <br />
                    <br />
                </div>
            ) : null}
        </div>
    );
};

const ProductDetailsInfo = ({
    data,
    products,

}) => {
    const [active, setActive] = useState(1);

    return (
        <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
            <div className="w-full flex justify-between border-b pt-10 pb-2">
                <div className="relative">
                    <h5
                        className={
                            "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(1)}
                    >
                        Detalhes
                    </h5>
                    {active === 1 ? (
                        <div className={`${styles.active_indicator}`} />
                    ) : null}
                </div>
                <div className="relative">
                    <h5
                        className={
                            "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(3)}
                    >
                        Informações do anunciante
                    </h5>
                    {active === 3 ? (
                        <div className={`${styles.active_indicator}`} />
                    ) : null}
                </div>
            </div>
            {active === 1 ? (
                <>
                    <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
                        {data.description}
                    </p>
                </>
            ) : null}

            {active === 3 && (
                <div className="w-full block 800px:flex p-5">
                    <div className="w-full 800px:w-[50%]">

                        <div className="flex items-center">
                            <img
                                src={`${data?.shop?.avatar?.url}`}
                                className="w-[50px] h-[50px] rounded-full"
                                alt=""
                            />
                            <div className="pl-3">
                                <h3 className="text-black">{data.shop.name}</h3>
                            </div>
                        </div>

                        <p className="pt-2">{data.shop.description}</p>
                    </div>
                    <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
                        <div className="text-left">
                            <h5 className="font-[600]">
                                Entrou em:{" "}
                                <span className="font-[500]">
                                    {data.shop?.createdAt?.slice(0, 10)}
                                </span>
                            </h5>
                            <h5 className="font-[600] pt-3">
                                Total livros anunciados:{" "}
                                <span className="font-[500]">
                                    {products && products.length}
                                </span>
                            </h5>
                            <Link to={`/shop/preview/${data.shop._id}`}>
                                <div
                                    className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                                >
                                    <h4 className="text-white">Visite anunciante</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;  