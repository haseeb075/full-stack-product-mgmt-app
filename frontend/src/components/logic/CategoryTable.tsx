// src/components/logic/CategoryTable.tsx
"use client";

import { Category } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
  deletingId?: string | null;
}

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
  isLoading = false,
  deletingId = null,
}: CategoryTableProps) {
  if (categories.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-500 text-center">No categories found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {category.name}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500 max-w-md">
                  {category.description || (
                    <span className="text-gray-400 italic">No description</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <Button
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  size="sm"
                  onClick={() => onEdit(category)}
                  disabled={isLoading}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  size="sm"
                  onClick={() => onDelete(category.id)}
                  disabled={isLoading || deletingId === category.id}
                >
                  {deletingId === category.id ? "Deleting..." : "Delete"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
