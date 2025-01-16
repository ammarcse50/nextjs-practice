"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function OrderForm() {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    itemName: "",
    cost: "",
    quantity: 1,
    price: 0,
  });
  const [itemList, setItemList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [summary, setSummary] = useState({
    subTotal: 0,
    discountPercentage: 0,
    paymentMade: 0,
    due: 0,
    total: 0,
  });

  console.log(summary);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSummary((prev) => {
      const newSummary = {
        ...prev,
        [name]: value,
      };

      // Recalculate total and due based on discount percentage
      if (name === "discountPercentage") {
        const discountAmount =
          (newSummary.discountPercentage / 100) * prev.subTotal;
        newSummary.total = prev.subTotal - discountAmount;
        newSummary.due = newSummary.total - prev.paymentMade;
      }

      if (name === "paymentMade") {
        newSummary.due = newSummary.total - value;
      }

      return newSummary;
    });
  };

  useEffect(() => {
    axios.get("/api/customers").then((response) => setCustomers(response.data));
    axios
      .get("/api/product/getproduct")
      .then((response) => setItems(response.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      if (name === "itemName") {
        const selectedItem = items.find((item) => item.name === value);
        if (selectedItem) {
          updatedData.cost = selectedItem.cost;
          updatedData.price = selectedItem.cost * prev.quantity;
        }
      }

      if (name === "cost" || name === "quantity") {
        updatedData.price = updatedData.cost * updatedData.quantity;
      }

      return updatedData;
    });
  };

  const handleAddItem = () => {
    if (formData.itemName && formData.cost && formData.quantity) {
      if (editingIndex !== null) {
        const updatedItemList = [...itemList];
        updatedItemList[editingIndex] = formData;
        setItemList(updatedItemList);
        setEditingIndex(null);
      } else {
        setItemList((prev) => [...prev, formData]);
      }

      setFormData({
        customerName: formData.customerName,
        itemName: "",
        cost: "",
        quantity: 1,
        price: 0,
      });
    } else {
      alert("Please fill out all item fields before adding.");
    }
  };

  const handleEditItem = (index) => {
    setFormData(itemList[index]);
    setEditingIndex(index);
  };

  const handleDeleteItem = (index) => {
    const updatedItemList = itemList.filter((_, i) => i !== index);
    setItemList(updatedItemList);
  };

  useEffect(() => {
    const subTotal = itemList.reduce((sum, item) => sum + item.price, 0);
    setSummary((prev) => {
      const discountAmount = (prev.discountPercentage / 100) * subTotal;
      const totalAmount = subTotal - discountAmount;
      const dueAmount = totalAmount - prev.paymentMade;

      return {
        ...prev,
        subTotal,
        total: totalAmount,
        due: dueAmount,
      };
    });
  }, [itemList]);

  const handleSaveAndPreview = () => {
    const customer = customers.find(
      (cust) => cust.name === formData.customerName
    );

    if (!customer) {
      alert("Customer not found.");
      return;
    }

    itemList.map(item=>(
      console.log(" product_name", item.itemName)
    ))

    const invoiceData = {
      invoiceDate: new Date().toISOString(),
      subtotal: summary.subTotal,
      discount: (summary.discountPercentage / 100) * summary.subTotal,
      total: summary.total,
      paymentMade: summary.paymentMade,
      dueAmount: summary.due,
      status: "Pending",
      customerId: customer.id,
      invoice_item: itemList.map((item) => ({
        product_name: item.itemName,
        product_quantity: item.quantity,
        product_price: item.price,
      })),
    };

    axios
      .post("/api/invoices", invoiceData)
      .then((response) => {
        console.log("Invoice saved:", response.data);
        alert("Invoice saved! Check the console for details.");
      })
      .catch((error) => {
        console.error("Error saving invoice:", error);
        alert("Error saving invoice.");
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Order Form</h1>
      <form className="space-y-4">
        {/* Customer Name */}
        <div>
          <label className="block font-medium">Customer Name</label>
          <input
            type="text"
            name="customerName"
            list="customer-list"
            value={formData.customerName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <datalist id="customer-list">
            {customers.map((customer) => (
              <option key={customer.id} value={customer.name} />
            ))}
          </datalist>
        </div>

        {/* Item Name */}
        <div>
          <label className="block font-medium">Item Name</label>
          <input
            type="text"
            name="itemName"
            list="item-list"
            value={formData.itemName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <datalist id="item-list">
            {items.map((item) => (
              <option key={item.id} value={item.name} />
            ))}
          </datalist>
        </div>

        {/* Cost */}
        <div>
          <label className="block font-medium">Cost</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            readOnly
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>

        {/* Add Item */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleAddItem}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingIndex !== null ? "Update Item" : "Add Item"}
          </button>
          <button
            type="button"
            onClick={handleSaveAndPreview}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save & Preview
          </button>
        </div>
      </form>

      {/* Items Table */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">Items</h2>
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Item Name</th>
              <th className="border px-4 py-2">Cost</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.itemName}</td>
                <td className="border px-4 py-2">{item.cost}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEditItem(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteItem(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary Table */}
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Subtotal</th>
              <th className="border px-4 py-2">Discount (%)</th>
              <th className="border px-4 py-2">Payment Made</th>
              <th className="border px-4 py-2">Due</th>
              <th className="border px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{summary.subTotal}</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  className="border-gray-400 border-2 px-10"
                  value={summary.discountPercentage}
                  name="discountPercentage"
                  onChange={handleChangeInput}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  name="paymentMade"
                  value={summary.paymentMade}
                  onChange={handleChangeInput}
                  className="border-gray-400 border-2 px-10"
                />
              </td>
              <td className="border px-4 py-2">{summary.due}</td>
              <td className="border px-4 py-2">{summary.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
