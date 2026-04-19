import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import styles from "../../styles/styles";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDownC from "./DropDownC";
import DropDownO from "./DropDownO";
import Navbar from "./Navbar";
import { CgProfile } from 'react-icons/cg';
import { useSelector } from "react-redux";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import { categoriesData, operacoesData } from "../../static/data";

const Header = ({ activeHeading }) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { wishlist } = useSelector((state) => state.wishlist);
    const { allProducts } = useSelector((state) => state.products);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [active, setActive] = useState(false);
    const [dropDownCategorias, setDropDownCategorias] = useState(false);
    const [dropDownOperacoes, setDropDownOperacoes] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const [open, setOpen] = useState(false);

    const searchRef = useRef(null);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filteredProducts = allProducts.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setSearchData(filteredProducts);
    };

    const handleSuggestionClick = () => {
        setSearchTerm("");
        setSearchData(null);
    };

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchData(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
            setActive(true);
        } else {
            setActive(false);
        }
    });

    return (
        <>
            <div className={`${styles.section}`}>
                <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
                    <div>
                        <Link to="/">
                            <img src="https://pbs.twimg.com/media/GOn4K9tWwAAy-pQ?format=png&name=360x360" alt="" />
                        </Link>
                    </div>
                    {/* search box */}
                    <div className="w-[50%] relative" ref={searchRef}>
                        <input
                            type="text"
                            placeholder="Procurar livro..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="h-[40px] w-full px-2 border-[#4444AC] border-[2px] rounded-md"
                        />
                        <AiOutlineSearch
                            size={30}
                            className="absolute right-2 top-1.5 cursor-pointer"
                        />
                        {searchData && searchData.length !== 0 ? (
                            <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                                {searchData.map((i, index) => {
                                    return (
                                        <Link to={`/product/${i._id}`} onClick={handleSuggestionClick}>
                                            <div className="w-full flex items-start py-3">
                                                <img
                                                    src={i.images[0]?.url}
                                                    alt=""
                                                    className="w-[40px] h-[40px] mr-[10px]"
                                                />
                                                <h1>{i.name}</h1>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : null}
                    </div>
                    <div className={`${styles.button}`}>
                        <Link to="/shop-create">
                            <h1 className="text-[#fff] flex items-center">
                                Anuncie seu livro <IoIosArrowForward className="ml-1" />
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={`${active ? "shadow-sm fixed top-0 left-0 z-10" : ""} transition hidden 800px:flex items-center justify-between w-full bg-[#6868C2] h-[70px]`}>
                <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
                    {/* categories */}
                    <div onClick={() => setDropDownCategorias(!dropDownCategorias)}>
                        <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                            <BiMenuAltLeft size={30} className="absolute top-3 left-2 text-white" />
                            <button className={`h-[100%] w-[65%] flex justify-between items-center pl-10 font-sans text-[#fff] text-xl font-[500] select-none rounded-t-md`}>
                                Categorias
                            </button>
                            <IoIosArrowDown
                                size={20}
                                className="absolute right-2 top-5 cursor-pointer text-white"
                                onClick={() => setDropDownCategorias(!dropDownCategorias)} style={{ right: "110px" }} />
                            {dropDownCategorias ? (
                                <DropDownC
                                    categoriesData={categoriesData}
                                    setDropDownC={setDropDownCategorias} />
                            ) : null}
                        </div>
                    </div>
                    {/* Operações */}
                    <div onClick={() => setDropDownOperacoes(!dropDownOperacoes)}>
                        <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                            <BiMenuAltLeft size={30} className="absolute top-3 left-2 text-white" />
                            <button className={`h-[100%] w-[65%] flex justify-between items-center pl-10 font-sans text-[#fff] text-xl font-[500] select-none rounded-t-md`}>
                                Operações
                            </button>
                            <IoIosArrowDown
                                size={20}
                                className="absolute right-2 top-5 cursor-pointer text-white"
                                onClick={() => setDropDownOperacoes(!dropDownOperacoes)} style={{ right: "110px" }} />
                            {dropDownOperacoes ? (
                                <DropDownO
                                    operacoesData={operacoesData}
                                    setDropDownO={setDropDownOperacoes} />
                            ) : null}
                        </div>
                    </div>
                    {/* navitems */}
                    <div className={`${styles.noramlFlex}`}>
                        <Navbar active={activeHeading} />
                    </div>
                    <div className="flex">
                        <div className={`${styles.noramlFlex}`}>
                            <div className="relative cursor-pointer mr-[15px]" onClick={() => setOpenWishlist(true)}>
                                <AiOutlineHeart
                                    size={30}
                                    color="rgb(255 255 255 / 83%)" />
                                <span className="absolute right-0 top-0 rounded-full bg-[#3030AD] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                    {wishlist && wishlist.length}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={`${styles.noramlFlex}`}>
                            <div className="relative cursor-pointer mr-[15px]">
                                {isAuthenticated ? (
                                    <Link to="/profile">
                                    <img
                                      src={`${user?.avatar?.url}`}
                                      className="w-[35px] h-[35px] rounded-full"
                                      alt=""
                                    />
                                  </Link>
                                ) : (
                                    <Link to="/login">
                                        <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                                    </Link>
                                )}
                            </div>
                        </div>
                        {/* whishlist popup */}
                        {openWishlist ? (
                            <Wishlist setOpenWishlist={setOpenWishlist} />
                        ) : null}
                    </div>
                </div>
            </div> 
            {/* mobile header */}
            <div
                className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null}
                w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
            >
                <div className="w-full flex items-center justify-between">
                    <div>
                        <BiMenuAltLeft
                            size={40}
                            className="ml-4"
                            onClick={() => setOpen(true)}
                        />
                    </div>
                    <div>
                        <Link to="/">
                            <img
                                src="https://pbs.twimg.com/media/GOn4K9tWwAAy-pQ?format=png&name=360x360"
                                alt=""
                                className="mt-3 cursor-pointer"
                            />
                        </Link>
                    </div>
                    <div>
                        <div className="relative mr-[20px]" onClick={() => setOpenWishlist(true)}>
                            <AiOutlineHeart
                                size={30}
                                color="#3030AD" />
                            <span className="absolute right-0 top-0 rounded-full bg-[#3030AD] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                {wishlist && wishlist.length}
                            </span>
                        </div>
                    </div>
                </div>
                {open ? (
                    <div className="fixed w-full bg-[#fff] z-10 top-0 left-0 h-full overflow-y-auto">
                        <div className="w-full justify-between flex pr-3">
                            <div>
                                <div className="relative mr-[20px]" onClick={() => setOpenWishlist(true)}>
                                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                        0
                                    </span>
                                </div>
                            </div>
                            <RxCross1
                                size={30}
                                className="ml-4 mt-5"
                                onClick={() => setOpen(false)}
                            />
                        </div>
                        <div className="my-8 w-[92%] m-auto h-[40px] relative">
                            <input
                                type="text"
                                placeholder="Procurar livro..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                            />
                            {searchData && searchData.length !== 0 ? (
                                <div className="absolute bg-slate-50 shadow-sm-2 z-[9] p-4">
                                    {searchData.map((i, index) => {
                                        const d = i.name;
                                        const Product_name = d.replace(/\s+/g, "-");
                                        return (
                                            <Link to={`/product/${Product_name}`} key={index} onClick={handleSuggestionClick}>
                                                <div className="w-full flex items-start py-3">
                                                    <img
                                                        src={i.images[0]?.url}
                                                        alt=""
                                                        className="w-[40px] h-[40px] mr-[10px]"
                                                    />
                                                    <h1>{i.name}</h1>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : null}
                        </div>
                        <Navbar active={activeHeading} />
                        <div className="button absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <Link to="/shop-create">
                                <h1 className="text-[#fff] flex items-center">
                                    Anuncie seu livro <IoIosArrowForward className="ml-1" />
                                </h1>
                            </Link>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
};

export default Header;
