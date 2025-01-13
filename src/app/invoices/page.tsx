"use client";
import React, { useEffect, useState } from "react";
import { item } from "@prisma/client";
import Link from "next/link";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { ReactFormState } from "react-dom/client";

type SearchResult = {
  id: string;
  name: string;
  cost: number; // Add cost to match usage
  item_category?: {
    title: string;
  };
};

type Customer = {
  id: string;
  name: string;
};

export default function Dashboard() {
  const [itemList, setItemList] = useState<item[]>([]);
  const [itemCart, setItemCart] = useState<item[]>([]);
  const [customer, setCustomer] = useState<string>("");
  const [invoiceTitle, setInvoiceTitle] = useState<string>("");
  const [itemCost, setItemCost] = useState<number>(1);
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [itemPrice, setItemPrice] = useState<number>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>("");
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [editRowId, setEditRowId] = useState<string | null>(null);

  const getTotalCartPrice = () =>
    itemCart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

  const fetchSuggestions = async (query: string) => {
    try {
      setLoading(true);
      const response = await axios.get<SearchResult[]>("/api/search", {
        params: { query },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setItemPrice(itemCost * itemQuantity);
  }, [itemQuantity, itemCost]);

  const fetchAllCustomer = async () => {
    await fetch("http://localhost:3000/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  };

  useEffect(() => {
    fetchAllCustomer();
  }, []);

  const fetchAllItems = async () => {
    await fetch("http://localhost:3000/api/product/getproduct")
      .then((res) => res.json())
      .then((data) => setItemList(data));
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  const handleSuggestionClick = ({
    name,
    cost,
  }: {
    name: string;
    cost: number;
  }) => {
    console.log("Selected Item:", name, "Cost:", cost);
    setSearchQuery(name);
    setItemName(name);
    setItemCost(cost); // Example usage
    setSuggestions([]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSuggestions([]);
    } else {
      fetchSuggestions(query);
    }
  };

  console.log("itemcart", itemCart);

  const handleDelete = async (id: string | number) => {
    console.log("delete item", id);

    setItemCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // edit item cart in state

  const handleEditClick = (id: string) => {
    setEditRowId(id);
  };

  const handleSaveClick = () => {
    setEditRowId(null); // Exit edit mode
  };

  const handleInputChange = (e, field: keyof item, id: string) => {
    const value =
      field === "name" ? e.target.value : parseFloat(e.target.value) || 0;

    setItemCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
              price:
                field === "quantity" || field === "cost"
                  ? item.cost * item.quantity
                  : item.price,
            }
          : item
      )
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input fields
    if (!itemName.trim()) {
      alert("Item name cannot be empty.");
      return;
    }

    if (itemCost <= 0) {
      alert("Please enter a valid cost greater than 0.");
      return;
    }

    if (itemQuantity <= 0) {
      alert("Please enter a valid quantity greater than 0.");
      return;
    }

    // Add new item to the cart
    setItemCart((prevCart) => [
      ...prevCart,
      {
        id: Math.random().toString(36).substring(2, 9), // Generate unique ID
        name: itemName,
        cost: itemCost,
        quantity: itemQuantity,
        price: itemCost * itemQuantity, // Calculate total price for this item
      },
    ]);

    // Reset form fields
    setSearchQuery("");
    setItemName(""); // Clear the item name input
    setItemCost(1); // Reset cost to default value
    setItemQuantity(1); // Reset quantity to default value
  };

  console.log("cart", itemCart);

  const getTotalAmount = () =>
    itemCart.reduce((total, item) => total + item.price, 0);
  const getAmount = getTotalAmount();
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full">
      <main className="min-h-[90vh] flex items-start">
        <div className="md:w-5/6 w-full h-full p-6">
          <h2 className="font-bold text-2xl mb-3">Add new invoice</h2>

          <form className="w-full flex flex-col" onSubmit={handleFormSubmit}>
            <label htmlFor="customer">Customer</label>
            <select
              className="border-[1px] p-2 rounded-sm mb-3"
              required
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.name}>
                  {customer.name}
                </option>
              ))}
            </select>

            <label htmlFor="title">Title</label>
            <input
              className="border-[1px] rounded-sm mb-3 py-2 px-3"
              required
              value={invoiceTitle}
              onChange={(e) => setInvoiceTitle(e.target.value)}
            />

            <div className="w-full flex justify-between flex-col">
              <h3 className="my-4 font-bold">Items List</h3>

              <div className="flex space-x-3">
                <div className="flex flex-col w-1/4">
                  <label htmlFor="itemName" className="text-sm">
                    Name
                  </label>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-3 w-full border rounded-lg mb-4"
                    placeholder="Search for items or categories..."
                  />

                  {/* Suggestions */}
                  {loading && <p>Loading...</p>}
                  {!loading && suggestions.length > 0 && (
                    <ul className="bg-white shadow-lg rounded-lg p-4">
                      {suggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="p-2 cursor-pointer hover:bg-indigo-100"
                          onClick={() =>
                            handleSuggestionClick({
                              name: suggestion.name,
                              cost: suggestion.cost,
                            })
                          } // Handle click event
                        >
                          <span className="font-bold">{suggestion.name}</span> (
                          {suggestion?.item_category?.title || ""})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex flex-col w-1/4">
                  <label htmlFor="itemCost" className="text-sm">
                    Cost
                  </label>

                  <select
                    className="border-[1px] p-2 rounded-sm mb-3"
                    required
                    value={itemCost}
                    onChange={(e) => setItemCost(Number(e.target.value))}
                  >
                    {/* Add default zero-cost option */}
                    <option value={itemCost}>{itemCost}</option>
                  </select>
                </div>

                <div className="flex flex-col justify-center w-1/4">
                  <label htmlFor="itemQuantity" className="text-sm">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="itemQuantity"
                    placeholder="Quantity"
                    className="py-2 px-4 mb-6 bg-gray-100"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(Number(e.target.value))}
                  />
                </div>

                <div className="flex flex-col justify-center w-1/4">
                  <p className="text-sm">Price</p>
                  <p className="py-2 px-4 mb-6 bg-gray-100">
                    {Number(itemCost * itemQuantity).toLocaleString("en-US")}
                  </p>
                </div>
              </div>
              <button
                className="bg-blue-500 text-gray-100 w-[100px] p-2 rounded"
                onClick={handleAddItem}
              >
                Add Item
              </button>
            </div>

            <button
              className="bg-blue-800 text-gray-100 w-full p-4 rounded my-6"
              type="submit"
            >
              <Link
                href={{
                  pathname: "/invoices/history",
                  query: {
                    itemName,
                    invoiceTitle,
                    customer,
                    itemCost,
                    getAmount,
                  },
                }}
              >
                SAVE & PREVIEW INVOICE
              </Link>
            </button>
          </form>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    #
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Product Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-right">
                    Cost
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-right">
                    Quantity
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-right">
                    Total Price
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {itemCart.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-100">
                    {editRowId === product.id ? (
                      <>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={index + 1}
                            disabled
                            onChange={(e) => handleInputChange(e, "id", index)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) =>
                              handleInputChange(e, "name", product.id)
                            }
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            value={product.cost || 0}
                            onChange={(e) =>
                              handleInputChange(e, "cost", product.id)
                            }
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            value={product.quantity}
                            onChange={(e) =>
                              handleInputChange(e, "quantity", product.id)
                            }
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="px-4 py-2">
                          {product.cost * product.quantity}
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={handleSaveClick}
                            className="bg-green-500 text-white px-4 py-1 rounded"
                          >
                            Save
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border border-gray-300 px-4 py-2">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {product.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right">
                          {product.quantity}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right">
                          ${(product.price * product.quantity).toFixed(2)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right">
                          <button onClick={() => handleDelete(product.id)}>
                            <MdDelete size={30} />
                          </button>
                          <button onClick={() => handleEditClick(product.id)}>
                            <MdEdit size={30} className="left-3" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-bold">
                  <td
                    className="border border-gray-300 px-4 py-2 text-left"
                    colSpan={4}
                  >
                    Total
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    ${getTotalCartPrice().toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
