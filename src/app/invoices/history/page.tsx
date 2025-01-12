"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();

  const customer = searchParams.get("customer") || "N/A";
  const itemPrice = Number(searchParams.get("itemPrice")) || 0;
  const getAmount = Number(searchParams.get("getAmount")) || 0;

  return (
    <div className="w-full px-2 py-8">
      <div className="lg:w-2/3 w-full mx-auto shadow-md border-[1px] rounded min-h-[75vh] p-5">
        <header className="w-full flex items-center space-x-4 justify-between">
          <div className="w-4/5">
            <h2 className="text-lg font-semibold mb-3">INVOICE #0</h2>
            <section className="mb-6">
              <p className="opacity-60">Issuer Name: {customer}</p>
              <p className="opacity-60">Date: {new Date().toLocaleString()}</p>
            </section>
            <h2 className="text-lg font-semibold mb-2">TO:</h2>
            <section className="mb-6">
              <p className="opacity-60">Name: {customer}</p>
            </section>
          </div>

          <div className="w-1/5 flex flex-col">
            <p className="font-extrabold text-2xl">{getAmount || itemPrice}</p>
            <p className="text-sm opacity-60">Total Amount</p>
          </div>
        </header>
        <div>
          <p className="opacity-60">Subject:</p>
          <h2 className="text-lg font-semibold">
            {/* Add subject here if needed */}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Page;
