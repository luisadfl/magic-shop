import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop, deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)); 
    window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150 },
    { field: "name", headerName: "Título do livro", minWidth: 180 },
    { field: "price", headerName: "Preço", minWidth: 100 },
    { field: "operation", headerName: "Operação", minWidth: 80 },
    { field: "tradeFor", headerName: "Troca por", minWidth: 130 },
  ];

  const rows = products ? products.map((item) => ({
    id: item._id,
    name: item.name,
    price: "R$ " + item.originalPrice,
    operation: item.operation,
    tradeFor: item?.tradeFor,
  })) : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.field}
                    className="py-2 px-4 border-b border-gray-200 text-left text-sm leading-4 text-gray-600 tracking-wider"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.headerName}
                  </th>
                ))}
                <th className="py-2 px-4 border-b border-gray-200"></th>
                <th className="py-2 px-4 border-b border-gray-200"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-200">{row.id}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.price}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.operation}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{row.tradeFor}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <Link to={`/product/${row.id}`}>
                      <button className="text-blue-600 hover:text-blue-900">
                        <AiOutlineEye size={20} />
                      </button>
                    </Link> 
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(row.id)}
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AllProducts;
