import React from "react";

export default function Header() {
  return (
    <div className="px-2 py-1 text-center">
      <h1 className="text-6xl font-black">Brandable</h1>
      <h2 className="my-5 text-2xl font-light">
        Check the{" "}
        <span className="italic font-bold text-green">brandability score</span>{" "}
        for your product name! 🚀
      </h2>
    </div>
  );
}
