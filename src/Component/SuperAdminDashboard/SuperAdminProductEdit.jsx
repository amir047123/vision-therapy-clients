import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { singleImageUpload } from "../../Hooks/ImageUpload";
import { Icon } from "@iconify/react";

const SuperAdminProductEdit = () => {
  const { id } = useParams(); // Get the product ID from the URL parameter
  const [product, setProduct] = useState({});
  const [editing, setEditing] = useState(false); // Edit mode flag
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleEditClick = () => {
    // Switch to edit mode
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Send a PUT request to update the product data
      await axios.put(`http://localhost:5000/api/v1/products/${id}`, product);
      toast.success("Product Updated successfully");

      // Switch back to view mode after updating
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    // Update the product state as the user edits the input fields
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleChangeUploadImage = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    singleImageUpload(formData, (url) =>
      setProduct({ ...product, imageUrl: url })
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className=" text-xl font-semibold">
        {" "}
        <h1>Edit Product</h1>
      </div>
      {editing ? (
        <form className=" border border-2 p-5 rounded-md shadow-lg">
          <div>
            <label>Name:</label>
            <input
              className="border border-2 w-full p-1"
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-1 space-y-2">
            <label htmlFor="productImage" className="block text-lg">
              Product Image
            </label>
            <div className="relative">
              <Icon
                icon="material-symbols:image-outline"
                className="absolute top-1/2 left-2 transform -translate-y-1/2 text-xl"
              ></Icon>
              <input
                type="file"
                required
                id="productImage"
                name="imageUrl"
                className="pl-10 border px-1 py-2 rounded-md w-full"
                onChange={handleChangeUploadImage} // A different handler since this is file input
                accept="image/*" // Allows only image files
                placeholder="Upload Image"
              />
            </div>
          </div>
          <div className=" ">
            <label>Price:</label>
            <input
              className=" border border-2 w-full p-1 "
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </div>
          <div className=" ">
            <label>Stock:</label>
            <input
              className=" border border-2 w-full p-1 "
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
            />
          </div>

          <div className=" ">
            <label>Categories:</label>
            <input
              className=" border border-2 w-full p-1 "
              type="text"
              name="categories"
              value={product.categories}
              onChange={handleInputChange}
            />
          </div>

          <div className=" ">
            <label>Weight:</label>
            <input
              className=" border border-2 w-full p-1 "
              type="number"
              name="weight"
              value={product.weight}
              onChange={handleInputChange}
            />
          </div>
          <div className=" ">
            <label>Dimensions:</label>
            <input
              className=" border border-2 w-full p-1 "
              type="text"
              name="dimensions"
              value={product.dimensions}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className=" w-full border-2 border p-1"
            ></textarea>
          </div>
          {/* Add more fields for editing other product properties */}
          <button
            className=" bg-primary px-4 rounded-md text-white py-1 mt-4"
            type="button"
            onClick={handleSaveClick}
          >
            Save
          </button>
        </form>
      ) : (
        <div className=" border border-2 p-5 rounded-md">
          <div className=" flex justify-between ">
            <div>
              <p>Name: {product.name}</p>
              <p>Price: {product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>Categories: {product.categories}</p>
              <p>Weight: {product.weight}</p>
              <p>Dimensions: {product.dimensions}</p>
            </div>
            <div className="  w-full md:w-40">
              <img
                className=" w-full hidden md:block"
                src={product.imageUrl}
                alt=""
              />
            </div>
          </div>
          <button
            className=" mt-4 bg-primary px-4 rounded-md text-white py-1 "
            type="button"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default SuperAdminProductEdit;
