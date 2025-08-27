// src/components/logic/CategoryForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Category } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (data: { name: string; description: string }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function CategoryForm({
  category,
  onSubmit,
  onCancel,
  isLoading = false,
}: CategoryFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    await onSubmit({ name: name.trim(), description: description.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Category Name *</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter category description"
          rows={3}
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || !name.trim()}
        >
          {isLoading ? "Saving..." : category ? "Update Category" : "Create Category"}
        </Button>
      </div>
    </form>
  );
}