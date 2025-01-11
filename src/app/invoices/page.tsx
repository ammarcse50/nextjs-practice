"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Item } from "@prisma/client";

export default function Dashboard() {
  const [itemList, setItemList] = useState<Item[]>([]);
  const [itemCart, setItemCart] = useState<Item[]>([]);
  const [customer, setCustomer] = useState<string>("");
  const [invoiceTitle, setInvoiceTitle] = useState<string>("");
  const [itemCost, setItemCost] = useState<number>(1);
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [itemName, setItemName] = useState<string>("");
  const [customers, setCustomers] = useState([]);
  const router = useRouter();

  console.log(itemCart);
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

  // console.log(itemList);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim() && itemCost > 0 && itemQuantity >= 1) {
      setItemCart([
        ...itemCart,
        {
          id: Math.random().toString(36).substring(2, 9),
          name: itemName,
          cost: itemCost,
          quantity: itemQuantity,
          price: itemCost * itemQuantity,
        },
      ]);
    }

    setItemName("");
    setItemCost(0);
    setItemQuantity(0);
  };

  const getTotalAmount = () => {
    let total = 0;
    itemList.forEach((item) => {
      total += item.price;
    });
    return total;
  };

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
              {customers.map((customer: any) => (
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

                  <select
                    className="border-[1px] p-2 rounded-sm mb-3"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  >
                    {itemList.map((item: any) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-1/4">
                  <label htmlFor="itemCost" className="text-sm">
                    Cost
                  </label>

                  <select
                    className="border-[1px] p-2 rounded-sm mb-3"
                    required
                    value={itemCost}
                    onChange={(e) => setItemCost(e.target.value)}
                  >
                    {itemList.map((item: any) => (
                      <option key={item.id} value={item.cost}>
                        {item.cost}
                      </option>
                    ))}
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
              SAVE & PREVIEW INVOICE
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
