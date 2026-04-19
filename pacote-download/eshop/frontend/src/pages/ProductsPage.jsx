import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
//import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import { getAllProducts } from "../redux/actions/product";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const operationData = searchParams.get("operation");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [categoryFilteredData, setCategoryFilteredData] = useState([]);
  const [operationFilteredData, setOperationFilteredData] = useState([]);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Filter by category
  useEffect(() => {
    if (categoryData === null) {
      setCategoryFilteredData(allProducts);
    } else {
      const categoryFiltered =
        allProducts && allProducts.filter((data) => data.category === categoryData);
      setCategoryFilteredData(categoryFiltered);
    }
  }, [categoryData, allProducts]);

  // Filter by operation
  useEffect(() => {
    if (operationData === null) {
      setOperationFilteredData(allProducts);
    } else {
      const operationFiltered =
        allProducts && allProducts.filter((data) => data.operation === operationData);
      setOperationFilteredData(operationFiltered);
    }
  }, [operationData, allProducts]);

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            {/* <Loader /> */}
            <span>Loading...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {categoryData || operationData ? (
              // Display filtered data based on category or operation filter
              <>
                {categoryData &&
                  categoryFilteredData &&
                  categoryFilteredData.map((i, index) => (
                    <ProductCard data={i} key={index} />
                  ))}
                {operationData &&
                  operationFilteredData &&
                  operationFilteredData.map((i, index) => (
                    <ProductCard data={i} key={index} />
                  ))}
                {categoryData &&
                  categoryFilteredData &&
                  categoryFilteredData.length === 0 && (
                    <h1 className="text-center w-full pb-[100px] text-[20px]">
                      Nenhum produto encontrado para a categoria selecionada!
                    </h1>
                  )}
                {operationData &&
                  operationFilteredData &&
                  operationFilteredData.length === 0 && (
                    <h1 className="text-center w-full pb-[100px] text-[20px]">
                      Nenhum produto encontrado para a operação selecionada!
                    </h1>
                  )}
              </>
            ) : (
              // Display all products if no filters are applied
              <>
                {allProducts &&
                  allProducts.map((i, index) => (
                    <ProductCard data={i} key={index} />
                  ))}
                {allProducts && allProducts.length === 0 && (
                  <h1 className="text-center w-full pb-[100px] text-[20px]">
                    Nenhum produto encontrado!
                  </h1>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage; 