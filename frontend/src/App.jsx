import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import ImageCarousel from './components/ImageCarousel';

import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';

const App = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 px-4 pt-6">
        {/* ✅ Fixed top nav */}
        <nav className="fixed top-0 left-0 right-0 bg-white shadow p-4 flex justify-center gap-6 z-50">
          <Link to="/add" className="text-blue-600 font-semibold">Add Item</Link>
          <Link to="/view" className="text-blue-600 font-semibold">View Items</Link>
        </nav>

        <div className="pt-20">
          <Routes>
            <Route path="/add" element={<AddItem setItems={setItems} />} />
            <Route
              path="/view"
              element={
                <ViewItems
                  setSelectedItem={setSelectedItem}
                  setModalOpen={setModalOpen}
                />
              }
            />
          </Routes>
        </div>

        {/* ✅ Item Details Dialog */}
        {selectedItem && (
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
  <DialogContent
    onInteractOutside={() => setModalOpen(false)} // optional, handled by default
    className="sm:max-w-[500px] bg-white"
  >
    <DialogHeader>
      <DialogTitle>{selectedItem.itemName}</DialogTitle>
      <DialogDescription>{selectedItem.itemType}</DialogDescription>
    </DialogHeader>

    <p className="my-2">{selectedItem.itemDescription}</p>

    <ImageCarousel
      images={[
        selectedItem.itemCoverImage,
        ...(selectedItem.itemAdditionalImages || []),
      ]}
    />

    <button
      onClick={() => alert("Enquiry sent!")}
      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    >
      Enquire
    </button>

    <DialogClose asChild>
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        
      </button>
    </DialogClose>
  </DialogContent>
</Dialog>

        )}
      </div>
    </Router>
  );
};

export default App;
