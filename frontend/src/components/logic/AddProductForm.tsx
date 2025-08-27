"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetcher } from "@/lib/api"; // adjust path if needed

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetcher<any[]>("/categories")
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    

    try {
      await fetcher("/create-product", {
        method: "POST",
        body: JSON.stringify({ name, price: Number(price), categoryId }),
      });
      setMessage("Product added successfully!");
      setName("");
      setPrice("");
      setCategoryId("");
    } catch (err: any) {
      setMessage(err.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
      <h2 className="text-lg font-semibold">Add Product</h2>
      <Input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <Select onValueChange={(val) => setCategoryId(val)} value={categoryId}>
        <SelectTrigger>
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </Button>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  );
}
