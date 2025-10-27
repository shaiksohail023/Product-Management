import React, { useState, useEffect } from 'react';
import { Button, Space, Table, Input, Modal } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const products = () => {

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [productList, setProductList] = useState([]);

    const navigate = useNavigate();

    const showModal = (record) => {
        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setSelectedRecord(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedRecord(null);
    };

    // 20 dummy records
    const dummyData = [
        {
            key: 1,
            name: "Apple iPhone 14",
            price: 79999,
            inStock: true,
            category: "Electronics",
            brandName: "Apple",
            status: "Available",
            quantity: 50,
            color: "Black",
            sku: "SKU-1001",
            rating: 4.5,
        },
        {
            key: 2,
            name: "Samsung Galaxy S23",
            price: 69999,
            inStock: true,
            category: "Electronics",
            brandName: "Samsung",
            status: "Available",
            quantity: 40,
            color: "White",
            sku: "SKU-1002",
            rating: 4.3,
        },
        {
            key: 3,
            name: "Nike Air Max 270",
            price: 12999,
            inStock: true,
            category: "Clothing",
            brandName: "Nike",
            status: "Available",
            quantity: 120,
            color: "Red",
            sku: "SKU-1003",
            rating: 4.1,
        },
        {
            key: 4,
            name: "Adidas Ultraboost",
            price: 13999,
            inStock: false,
            category: "Clothing",
            brandName: "Adidas",
            status: "Out of Stock",
            quantity: 0,
            color: "Blue",
            sku: "SKU-1004",
            rating: 4.2,
        },
        {
            key: 5,
            name: "IKEA Malm Bed",
            price: 24999,
            inStock: true,
            category: "Furniture",
            brandName: "IKEA",
            status: "Available",
            quantity: 15,
            color: "White",
            sku: "SKU-1005",
            rating: 4.0,
        },
        {
            key: 6,
            name: "Sony WH-1000XM5 Headphones",
            price: 24990,
            inStock: true,
            category: "Electronics",
            brandName: "Sony",
            status: "Available",
            quantity: 35,
            color: "Black",
            sku: "SKU-1006",
            rating: 4.7,
        },
        {
            key: 7,
            name: "Dell XPS 13 Laptop",
            price: 104999,
            inStock: false,
            category: "Electronics",
            brandName: "Dell",
            status: "Coming Soon",
            quantity: 0,
            color: "Silver",
            sku: "SKU-1007",
            rating: 4.6,
        },
        {
            key: 8,
            name: "Canon EOS 200D Camera",
            price: 45999,
            inStock: true,
            category: "Electronics",
            brandName: "Canon",
            status: "Available",
            quantity: 25,
            color: "Black",
            sku: "SKU-1008",
            rating: 4.4,
        },
        {
            key: 9,
            name: "Levi's 501 Jeans",
            price: 2999,
            inStock: true,
            category: "Clothing",
            brandName: "Levi's",
            status: "Available",
            quantity: 80,
            color: "Blue",
            sku: "SKU-1009",
            rating: 4.1,
        },
        {
            key: 10,
            name: "HP Envy 15 Laptop",
            price: 89999,
            inStock: true,
            category: "Electronics",
            brandName: "HP",
            status: "Available",
            quantity: 20,
            color: "Silver",
            sku: "SKU-1010",
            rating: 4.3,
        },
        {
            key: 11,
            name: "Puma Running Shoes",
            price: 4999,
            inStock: false,
            category: "Clothing",
            brandName: "Puma",
            status: "Out of Stock",
            quantity: 0,
            color: "Green",
            sku: "SKU-1011",
            rating: 4.0,
        },
        {
            key: 12,
            name: "IKEA Billy Bookcase",
            price: 5999,
            inStock: true,
            category: "Furniture",
            brandName: "IKEA",
            status: "Available",
            quantity: 30,
            color: "Brown",
            sku: "SKU-1012",
            rating: 4.2,
        },
        {
            key: 13,
            name: "Apple MacBook Pro 14",
            price: 199999,
            inStock: true,
            category: "Electronics",
            brandName: "Apple",
            status: "Available",
            quantity: 10,
            color: "Silver",
            sku: "SKU-1013",
            rating: 4.8,
        },
        {
            key: 14,
            name: "Samsung QLED TV 55\"",
            price: 99999,
            inStock: true,
            category: "Electronics",
            brandName: "Samsung",
            status: "Available",
            quantity: 12,
            color: "Black",
            sku: "SKU-1014",
            rating: 4.5,
        },
        {
            key: 15,
            name: "Nike Sports Jacket",
            price: 3999,
            inStock: true,
            category: "Clothing",
            brandName: "Nike",
            status: "Available",
            quantity: 60,
            color: "Black",
            sku: "SKU-1015",
            rating: 4.2,
        },
        {
            key: 16,
            name: "Adidas Hoodie",
            price: 2599,
            inStock: true,
            category: "Clothing",
            brandName: "Adidas",
            status: "Available",
            quantity: 70,
            color: "Gray",
            sku: "SKU-1016",
            rating: 4.0,
        },
        {
            key: 17,
            name: "Sony Bravia 65\" TV",
            price: 129999,
            inStock: false,
            category: "Electronics",
            brandName: "Sony",
            status: "Coming Soon",
            quantity: 0,
            color: "Black",
            sku: "SKU-1017",
            rating: 4.6,
        },
        {
            key: 18,
            name: "IKEA Poäng Chair",
            price: 7999,
            inStock: true,
            category: "Furniture",
            brandName: "IKEA",
            status: "Available",
            quantity: 25,
            color: "Brown",
            sku: "SKU-1018",
            rating: 4.3,
        },
        {
            key: 19,
            name: "Canon Pixma Printer",
            price: 8999,
            inStock: true,
            category: "Electronics",
            brandName: "Canon",
            status: "Available",
            quantity: 20,
            color: "White",
            sku: "SKU-1019",
            rating: 4.1,
        },
        {
            key: 20,
            name: "HP Pavilion Desktop",
            price: 55999,
            inStock: true,
            category: "Electronics",
            brandName: "HP",
            status: "Available",
            quantity: 18,
            color: "Black",
            sku: "SKU-1020",
            rating: 4.2,
        },
    ];

    useEffect(() => {
        const existing = JSON.parse(localStorage.getItem("productsList"));

        if (!existing || existing.length === 0) {
            // ✅ If nothing in localStorage, load dummy data
            localStorage.setItem("productsList", JSON.stringify(dummyData));
            setProductList(dummyData);
            console.log("Loaded dummy data into localStorage");
        } else {
            // ✅ If exists, just use existing
            setProductList(existing);
            console.log("Loaded data from localStorage");
        }
    }, []);

    // Optional: refresh when coming back from Add Product page
    useEffect(() => {
        const handleStorageChange = () => {
            const updated = JSON.parse(localStorage.getItem("productsList")) || [];
            setProductList(updated);
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // handle table changes
    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    // clear filters
    const clearFilters = () => setFilteredInfo({});
    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
        setSearchText("");
    };

    // sort by rating high→low
    const sortHighToLow = () => {
        setSortedInfo({
            order: "descend",
            columnKey: "rating",
        });
    };

    // sort by rating low→high
    const sortLowToHigh = () => {
        setSortedInfo({
            order: "ascend",
            columnKey: "rating",
        });
    };

    const addProduct = () => {
        navigate("/add-product");
    }

    // filter + search logic
    const filteredData = productList.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <span
                    style={{ cursor: "pointer" }}
                    onClick={() => showModal(record)}
                >
                    {text}
                </span>
            ),
            // sorter: (a, b) => a.name.localeCompare(b.name),
            // sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (text, record) => (
                <span
                    style={{ cursor: "pointer" }}
                    onClick={() => showModal(record)}
                >
                    {text}
                </span>
            ),
            // sorter: (a, b) => a.price - b.price,
            // sortOrder: sortedInfo.columnKey === "price" ? sortedInfo.order : null,

        },
        {
            title: "In Stock",
            dataIndex: "inStock",
            key: "inStock",
            render: (text, record, val) => (
                <span
                    style={{ cursor: "pointer" }}
                    onClick={() => showModal(record)}
                >
                    {text ? "Yes" : "No"}
                </span>
            ),
            // filters: [
            //     { text: "Available", value: true },
            //     { text: "Not Available", value: false },
            // ],
            // filteredValue: filteredInfo.inStock || null,
            // onFilter: (value, record) => record.inStock === value,
            // render: (val) => (val ? "Yes" : "No"),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            filters: [
                { text: "Electronics", value: "Electronics" },
                { text: "Clothing", value: "Clothing" },
                { text: "Furniture", value: "Furniture" },
            ],
            render: (text, record) => (
                <span
                    style={{ cursor: "pointer" }}
                    onClick={() => showModal(record)}
                >
                    {text}
                </span>
            ),
            filteredValue: filteredInfo.category || null,
            onFilter: (value, record) => record.category === value,
        },
        {
            title: "Brand",
            dataIndex: "brandName",
            key: "brandName",
            render: (text, record) => (
                <span
                    style={{ cursor: "pointer", }}
                    onClick={() => showModal(record)}
                >
                    {text}
                </span>
            ),
            filters: [
                { text: "Apple", value: "Apple" },
                { text: "Nike", value: "Nike" },
                { text: "IKEA", value: "IKEA" },
                { text: "Samsung", value: "Samsung" },
                { text: "Adidas", value: "Adidas" },
            ],
            filteredValue: filteredInfo.brandName || null,
            onFilter: (value, record) => record.brandName === value,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text, record) => (
                <span
                    style={{ cursor: "pointer" }}
                    onClick={() => showModal(record)}
                >
                    {text}
                </span>
            ),
            filters: [
                { text: "Available", value: "Available" },
                { text: "Out of Stock", value: "Out of Stock" },
                { text: "Coming Soon", value: "Coming Soon" },
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status === value,
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: (text, record) => (
                <span
                    style={{ cursor: "pointer" }}
                    onClick={() => showModal(record)}
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Color",
            dataIndex: "color",
            key: "color",
            render: (text, record) => (
                <span
                    style={{ cursor: "pointer" }}
                    onClick={() => showModal(record)}
                >
                    {text}
                </span>
            ),
        },
        {
            title: "SKU",
            dataIndex: "sku",
            key: "sku",
            render: (text, record) => (
                <span
                    style={{ cursor: "pointer" }}
                    onClick={() => showModal(record)}
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
            render: (text, record) => (
                <span
                    style={{ cursor: "pointer" }}
                    onClick={() => showModal(record)}
                >
                    {text}
                </span>
            ),
            sorter: (a, b) => a.rating - b.rating,
            sortOrder: sortedInfo.columnKey === "rating" ? sortedInfo.order : null,
        },
    ];

    return (
        <>
            <div className="flex justify-between items-center mb-4 mt-4">
                <Input
                    placeholder="Search by name"
                    className='ml-5'
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 250 }}
                />

                <Space>
                    <Button
                        onClick={sortHighToLow}
                        className="bg-amber-500 text-white border-none"
                    >
                        Sort Rating ↓
                    </Button>
                    <Button
                        onClick={sortLowToHigh}
                    >
                        Sort Rating ↑
                    </Button>
                    <Button
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </Button>
                    <Button
                        onClick={clearAll}
                    >
                        Clear All
                    </Button>
                    <Button
                        onClick={addProduct}
                        className="mr-7">
                        Add Product
                    </Button>
                </Space>
            </div>

            <Table
                columns={columns}
                dataSource={filteredData}
                bordered
                onRow={(record) => ({
                    onClick: () => showModal(record), // row click opens modal
                })}
                className="custom-table px-5"
                onChange={handleChange}
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title="Product Details"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="close" type="primary" onClick={handleOk}>
                        Close
                    </Button>,
                ]}
            >
                {selectedRecord && (
                    <div>
                        <p><strong>Name:</strong> {selectedRecord.name}</p>
                        <p><strong>Price:</strong> ₹{selectedRecord.price}</p>
                        <p><strong>Category:</strong> {selectedRecord.category}</p>
                        <p><strong>Brand:</strong> {selectedRecord.brandName}</p>
                        <p><strong>Status:</strong> {selectedRecord.status}</p>
                        <p><strong>Quantity:</strong> {selectedRecord.quantity}</p>
                        <p><strong>Color:</strong> {selectedRecord.color}</p>
                        <p><strong>SKU:</strong> {selectedRecord.sku}</p>
                        <p><strong>Rating:</strong> {selectedRecord.rating}</p>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default products