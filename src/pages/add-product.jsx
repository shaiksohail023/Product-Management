import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Switch, Dropdown, Space, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AddProduct = () => {

    const [selectedCategory, setSelectedCategory] = useState("Select Category");
    const [selectedStatus, setSelectedStatus] = useState("Select Status");
    const [skuList, setSkuList] = useState([]);

    useEffect(() => {
        const products = JSON.parse(localStorage.getItem("productsList")) || [];
        const skus = products.map((p) => p.SKU);
        setSkuList(skus);
    }, []);

    const categoryItems = [
        {
            key: "1",
            label: "Electronics",
        },
        {
            key: "2",
            label: "Clothing",
        },
        {
            key: "3",
            label: "Books",
        },
    ];

    const statusItems = [
        {
            key: "1",
            label: "Available",
        },
        {
            key: "2",
            label: "Out of Stock",
        },
        {
            key: "3",
            label: "Coming Soon",
        },
    ];

    // const onChange = checked => {
    //     console.log(`switch to ${checked}`);
    // };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Product name is required")
            .matches(/^[a-zA-Z0-9 ]+$/, "Only letters and numbers are allowed")
            .transform((value) => DOMPurify.sanitize(value)),

        price: Yup.number()
            .typeError("Price must be a number")
            .required("Price is required")
            .positive("Price must be a positive number"),

        quantity: Yup.number()
            .typeError("Quantity must be a number")
            .required("Quantity is required")
            .integer("Quantity must be an integer")
            .positive("Quantity must be a positive number"),

        sku: Yup.string()
            .required("SKU is required")
            .notOneOf(skuList, "SKU must be unique")
            .transform((value) => DOMPurify.sanitize(value)),

        // brandName: Yup.string()
        //     .required("Brand name is required")
        //     .transform((value) => DOMPurify.sanitize(value)),

        // color: Yup.string()
        //     .required("Color is required")
        //     .transform((value) => DOMPurify.sanitize(value)),

        // category: Yup.string().required("Category is required"),
        // status: Yup.string().required("Product status is required"),
        // inStock: Yup.boolean().required(),
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            price: "",
            quantity: "",
            sku: "",
            brandName: "",
            color: "",
            category: "",
            status: "",
            inStock: false,
            rating: ""
        },
    });

    const onSubmit = (data) => {
        console.log("Form Data:", data);

        const newProduct = {
            key: Date.now(),
            ...data,
        };
        handleAddProduct(newProduct);

    };

    const navigate = useNavigate();

    const goToProducts = () => {
        navigate("/products");
    };

    const handleAddProduct = (newProduct) => {
        const existing = JSON.parse(localStorage.getItem("productsList")) || [];

        // ✅ Ensure unique SKU
        const skuExists = existing.some(p => p.sku === newProduct.sku);
        if (skuExists) {
            toast.info("SKU already exists! Please enter a unique SKU.");
            return;
        }

        const updated = [...existing, newProduct];
        localStorage.setItem("productsList", JSON.stringify(updated));

        // ✅ Redirect to /products
        navigate("/products");
        toast.success("Product added successfully!");
        reset();
        setSelectedCategory("Select Category");
        setSelectedStatus("Select Status");
    };


    return (
        <>
            <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
                {/* <!-- Card --> */}

                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full md:w-7/12 p-6">

                    <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Add Product</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product name</label>
                                <input type="text" {...register("name")} id="first_name" placeholder="Enter Product name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price</label>
                                <input type="number" {...register("price")} id="price" placeholder="Enter Price"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                            </div>
                        </div>

                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">In-Stock</label>

                                <Controller
                                    name="inStock"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch
                                            // {...register("status")}
                                            checked={field.value}
                                            onChange={(val) => field.onChange(val)}
                                            checkedChildren="Yes"
                                            unCheckedChildren="No"
                                        />
                                    )}
                                />
                            </div>

                            <div>
                                <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>

                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <Dropdown
                                            menu={{
                                                items: categoryItems.map((item) => ({
                                                    key: item.key,
                                                    label: (
                                                        <span
                                                            onClick={() => {
                                                                setSelectedCategory(item.label);
                                                                field.onChange(item.label); // ✅ update form value
                                                            }}
                                                        >
                                                            {item.label}
                                                        </span>
                                                    ),
                                                })),
                                            }}
                                        >
                                            <a className="flex justify-between items-center w-full bg-gray-50 border border-gray-300 p-2.5 rounded-lg">
                                                <span>{selectedCategory}</span>
                                                <DownOutlined />
                                            </a>
                                        </Dropdown>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="brandName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand name</label>
                                <input type="text" {...register("brandName")} id="brandName" placeholder="Enter Brand Name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>

                            <div>
                                <label for="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Status</label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Dropdown
                                            menu={{
                                                items: statusItems.map((item) => ({
                                                    key: item.key,
                                                    label: (
                                                        <span
                                                            onClick={() => {
                                                                setSelectedStatus(item.label);
                                                                field.onChange(item.label); // ✅ update form value
                                                            }}
                                                        >
                                                            {item.label}
                                                        </span>
                                                    ),
                                                })),
                                            }}
                                        >
                                            <a className="flex justify-between items-center w-full bg-gray-50 border border-gray-300 p-2.5 rounded-lg">
                                                <span>{selectedStatus}</span>
                                                <DownOutlined />
                                            </a>
                                        </Dropdown>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                <input type="number"  {...register("quantity")} id="first_name" placeholder="Enter Quantity"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
                            </div>

                            <div>
                                <label for="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                                <input type="text"  {...register("color")} id="last_name" placeholder="Enter Color"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                        </div>

                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="sku" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SKU</label>
                                <input type="text" {...register("sku")} id="sku" placeholder="Enter SKU"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                {errors.sku && <p className="text-red-500 text-sm">{errors.sku.message}</p>}
                            </div>
                            <div>
                                <label for="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                                <input type="decimal"  {...register("rating")} id="rating" placeholder="Enter Rating"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                        </div>
                        <button type="button" onClick={goToProducts}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">Product List</button>
                        <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 float-right">Add</button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default AddProduct