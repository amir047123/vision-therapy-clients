import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteHook from "../../Hooks/DeleteHook";
import Loading from "../../Shared/Loading";

function SuperAdminProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          " http://localhost:5000/api/v1/products"
        );
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchProducts();
  }, [refetch]);

  useEffect(() => {
    // Filter products based on the search term
    const filtered = products.filter((product) =>
      // You can customize this condition to include other fields like categories, price, etc.
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleSearch = () => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="justify-between flex text-xl mb-2 ">
        <h1>Products</h1>
        <h1> Total: {products.length}</h1>
      </div>

      <div className="flex relative rounded-md w-full mt-3 mb-3">
        <input
          type="text"
          placeholder="Enter product name, price, or categories"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-md border border-r-white rounded-r-none border-gray-300 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="inline-flex items-center gap-2 bg-secondary text-white text-lg font-semibold py-3 px-6 rounded-r-md hover:bg-secondary/90"
        >
          <span>Search</span>
          <span className="hidden md:block">
            <Icon icon="material-symbols:search" />
          </span>
        </button>
      </div>

      <table
        className="w-full text-left rounded w-overflow-x-auto "
        cellSpacing="0"
      >
        <tbody>
          <tr>
            <th
              scope="col"
              className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Name
            </th>
            <th
              scope="col"
              className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Price
            </th>
            <th
              scope="col"
              className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
            >
              stock
            </th>
            <th
              scope="col"
              className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
            >
              categories
            </th>
            <th
              scope="col"
              className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
            >
              weight
            </th>
            <th
              scope="col"
              className="h-16 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Action
            </th>
          </tr>
          {/* Map through the filtered products instead of all products */}
          {filteredProducts.map((product) => (
            <tr key={product._id} className="shadow">
              <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                {product.name}
              </td>
              <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                {product.price}
              </td>
              <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                {product.stock}
              </td>
              <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                {product.categories}
              </td>
              <td className="h-16 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500">
                {product.weight}
              </td>
              <td className="h-16 px-6  transition duration-300 border-slate-200  text-secondary text-lg flex gap-2 items-center cursor-pointer">
                <div
                  onClick={() => {
                    DeleteHook({
                      refetch,
                      setRefetch,
                      url: ` http://localhost:5000/api/v1/products/${product?._id}`,
                    });
                  }}
                  className="border border-secondary py-2 px-3 rounded-md hover:bg-secondary/10 duration-300"
                >
                  <Icon icon="material-symbols:delete-outline" />
                </div>

                <Link to={`/superAdminDashboard/edit-product/${product._id}`}>
                  <div className="border border-secondary py-2 px-3 rounded-md hover:bg-secondary/10 duration-300">
                    <Icon icon="uil:edit"></Icon>
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SuperAdminProductTable;
