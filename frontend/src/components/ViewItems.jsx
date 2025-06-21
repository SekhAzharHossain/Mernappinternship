import { useEffect, useState } from 'react';
import api from '../api';

const ViewItems = ({ setSelectedItem, setModalOpen }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/items');
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/delete/item/${id}`);
      setItems(prev => prev.filter(item => item._id !== id));
      alert("Item deleted successfully");
    } catch (err) {
      console.error('Delete failed:', err);
      alert("Failed to delete item");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item._id} className="border p-4 rounded shadow relative group bg-white">
          <img
            src={item.itemCoverImage}
            alt={item.itemName}
            className="w-full h-48 object-cover rounded mb-2 cursor-pointer"
            onClick={() => {
              setSelectedItem(item);
              setModalOpen(true);
            }}
          />
          <h3 className="text-lg font-semibold">{item.itemName}</h3>

          <button
            onClick={() => handleDelete(item._id)}
            className="absolute bottom-4 right-4 bg-red-500 text-white px-2 py-1 text-xs rounded opacity-80 hover:opacity-100"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ViewItems;
