"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/api"; // adjust path if needed

export default function AddCategoryForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await fetcher("/categories", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      setMessage("Category added successfully!");
      setName("");
    } catch (err: any) {
      setMessage(err.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
      <h2 className="text-lg font-semibold">Add Category</h2>
      <Input
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Category"}
      </Button>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  );
}
