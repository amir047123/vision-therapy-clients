import React, { useState } from "react";
import { Icon } from "@iconify/react";
import PostHooks from "../../Hooks/PostHooks";
import { server_url } from "../../Config/API";
import { singleImageUpload } from "../../Hooks/ImageUpload";
import { toast } from "react-toastify";

function SuperAdminProductAdd() {
  const [imageUrl, setImageUrl] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    weight: 0,
    dimensions: "",
    isFeatured: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (!imageUrl) {
      toast.error("please select product image");
    }
    e.preventDefault();
    await PostHooks(
      `${server_url}/products`,
      { ...productData, imageUrl },
      "Product added !"
    );
  };

  const handleChangeUploadImage = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    singleImageUpload(formData, setImageUrl);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-fit mx">
        <h1 className=" text-xl font-bold">Product Upload </h1>
        <div className="h-1 bg-secondary w-[40%] mt-1"></div>
      </div>
      <div className=" lg:grid lg:grid-cols-2 gap-2 mt-5">
        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="productName" className="block text-lg">
            Product Name
          </label>
          <div className="relative">
            <Icon
              icon="ri:product-hunt-line"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-xl"
            ></Icon>
            <input
              id="productName"
              name="name"
              required
              type="text"
              className="pl-10 border px-1 py-2 rounded-md w-full"
              value={productData.name}
              onChange={handleChange}
              placeholder="Product Name"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="productName" className="block text-lg">
            Price
          </label>
          <div className="relative">
            <Icon
              icon="ri:price-tag-line"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-xl"
            ></Icon>
            <input
              name="price"
              type="number"
              required
              className="pl-10 border px-1 py-2 rounded-md w-full"
              value={productData.price}
              onChange={handleChange}
              placeholder="Product Price"
            />
          </div>
        </div>{" "}
        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="productName" className="block text-lg">
            Stock
          </label>
          <div className="relative">
            <Icon
              icon="ant-design:stock-outlined"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-xl"
            ></Icon>
            <input
              name="stock"
              required
              type="number"
              className="pl-10 border px-1 py-2 rounded-md w-full"
              value={productData.stock}
              onChange={handleChange}
              placeholder="Product Stock"
            />
          </div>
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
        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="productName" className="block text-lg">
            Categories
          </label>
          <div className="relative">
            <Icon
              icon="carbon:expand-categories"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-xl"
            ></Icon>
            <input
              name="categories"
              type="text"
              className="pl-10 border px-1 py-2 rounded-md w-full"
              value={productData.categories}
              onChange={handleChange}
              placeholder="Product Categories"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="productName" className="block text-lg">
            Weight
          </label>
          <div className="relative">
            <Icon
              icon="fa6-solid:weight-scale"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-xl"
            ></Icon>
            <input
              name="weight"
              type="number"
              className="pl-10 border px-1 py-2 rounded-md w-full"
              value={productData.weight}
              onChange={handleChange}
              placeholder="Product Weight"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="productName" className="block text-lg">
            Dimensions
          </label>
          <div className="relative">
            <Icon
              icon="tabler:dimensions"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-xl"
            ></Icon>
            <input
              name="dimensions"
              type="text"
              className="pl-10 border px-1 py-2 rounded-md w-full"
              value={productData.dimensions}
              onChange={handleChange}
              placeholder="Product dimensions"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 space-y-2">
        <label htmlFor="productDescription" className="block text-lg">
          Description
        </label>
        <div className="">
          <textarea
            name="description"
            type="text"
            className=" w-full border p-2"
            value={productData.description}
            onChange={handleChange}
            placeholder="Product Description"
          />
        </div>
      </div>

      <button
        className="mt-3 cursor-pointer bg-secondary text-white px-5 py-2 rounded-md flex justify-center items-center gap-2 transform transition-transform duration-200 hover:scale-105"
        type="submit"
      >
        <Icon icon="zondicons:add-outline"></Icon> <span> Add Product</span>
      </button>
    </form>
  );
}

export default SuperAdminProductAdd;
