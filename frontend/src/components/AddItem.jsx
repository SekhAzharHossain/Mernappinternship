import { useState } from 'react';
import api from '../api'; // Your axios instance

const AddItem = ({ setItems }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemType: 'Shirt',
    itemDescription: '',
    itemCoverImage: '',
    itemAdditionalImages: [],
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e, key) => {
    const files = e.target.files;
    const promises = Array.from(files).map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // base64 string
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(images => {
      if (key === 'itemCoverImage') {
        setFormData({ ...formData, itemCoverImage: images[0] });
      } else {
        setFormData({ ...formData, itemAdditionalImages: images });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Required validation
    if (
      !formData.itemName ||
      !formData.itemType ||
      !formData.itemDescription ||
      !formData.itemCoverImage
    ) {
      setMessage("All fields including cover image are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/item', formData);
      setMessage('✅ Item successfully added!');
      setItems(prev => [...prev, res.data]);

      // ✅ Reset form
      setFormData({
        itemName: '',
        itemType: 'Shirt',
        itemDescription: '',
        itemCoverImage: '',
        itemAdditionalImages: [],
      });
    } catch (error) {
      console.error('Error adding item:', error);
      setMessage('❌ Failed to add item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-4">
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow bg-white">
        <input
          type="text"
          placeholder="Item Name"
          value={formData.itemName}
          onChange={e => setFormData({ ...formData, itemName: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={formData.itemType}
          onChange={e => setFormData({ ...formData, itemType: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option>Shirt</option>
          <option>Pant</option>
          <option>Shoes</option>
          <option>Sports Gear</option>
          <option>Other</option>
        </select>

        <textarea
          placeholder="Item Description"
          value={formData.itemDescription}
          onChange={e => setFormData({ ...formData, itemDescription: e.target.value })}
          className="w-full p-2 border rounded"
          rows={3}
          required
        />

        <div>
          <label className="block font-medium mb-1">Cover Image (required)</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImageUpload(e, 'itemCoverImage')}
            className="w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Additional Images (optional)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={e => handleImageUpload(e, 'itemAdditionalImages')}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Item'}
        </button>

        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default AddItem;
