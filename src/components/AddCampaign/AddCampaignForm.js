"use client";
import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AuthContext from "@/providers/AuthContext";

export default function AddCampaignForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target_amount: "",
    collected_amount: "",
    status: "",
  });
  const { token } = useContext(AuthContext);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category_id", 1);
    data.append("target_amount", formData.target_amount);
    data.append("collected_amount", formData.collected_amount);
    data.append("status", formData.status);

    try {
      const response = await axios.post(
        "https://block-funders.haidarjbeily.com/public/api/campaigns",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Campaign added successfully:", response.data);
      router.push("/profile/my-campaigns");
    } catch (error) {
      console.error("Error adding campaign:", error);
      alert("Error adding campaign. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Campaign</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="target_amount" className="block text-gray-700">
          Target Amount
        </label>
        <input
          type="number"
          id="target_amount"
          name="target_amount"
          value={formData.target_amount}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="collected_amount" className="block text-gray-700">
          Collected Amount
        </label>
        <input
          type="number"
          id="collected_amount"
          name="collected_amount"
          value={formData.collected_amount}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700">
          Status
        </label>
        <input
          type="text"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Add Campaign
      </button>
    </form>
  );
}
