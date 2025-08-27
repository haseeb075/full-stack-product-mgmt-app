import { Product } from "@/lib/types";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-left">Name</th>
            <th className="py-3 px-4 border-b text-left">Price</th>
            <th className="py-3 px-4 border-b text-left">Stock</th>
            <th className="py-3 px-4 border-b text-left">Categories</th>
            <th className="py-3 px-4 border-b text-left">Description</th>
            <th className="py-3 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">{product.name}</td>
              <td className="py-3 px-4 border-b">${product.price}</td>
              <td className="py-3 px-4 border-b">{product.stockQuantity}</td>
              <td className="py-3 px-4 border-b">
                {product.categories.map(cat => cat.name).join(', ')}
              </td>
              <td className="py-3 px-4 border-b">
                {product.description?.substring(0, 50)}
                {product.description && product.description.length > 50 ? '...' : ''}
              </td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}