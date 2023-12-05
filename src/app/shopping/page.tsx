"use client";
import { useEffect, useState, FormEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import SlideInLeft from "../animations/SlideInLeft";
import { saveAs } from "file-saver";
import NotificationsSidebar from "../components/notifications";
import Link from "next/link";
import { useTheme } from "../ThemeContext";

type Notification = {
  id: number;
  message: string;
};

type Item = {
  id: number;
  name: string;
  quantity: number;
};

type AddItemFormProps = {
  onAddItem: (item: Item) => void;
  isOpen: boolean;
  onRequestClose: () => void;
};

type EditItemFormProps = {
  item: Item;
  onEditItem: (item: Item) => void;
  isOpen: boolean;
  onRequestClose: () => void;
};

type ListItemProps = {
  children: ReactNode;
};

const defaultItems = [
  { id: 1, name: "🥛 Milk", quantity: 2 },
  { id: 2, name: "🥚 Eggs", quantity: 12 },
  { id: 3, name: "🍞 Bread", quantity: 1 },
  { id: 4, name: "🥑 Avocado", quantity: 4 },
  { id: 5, name: "🧈 Butter", quantity: 2 },
  { id: 6, name: "🐕 Dog Food", quantity: 6 },
];

export default function Shopping_Page() {
  const [items, setItems] = useState<Item[]>(defaultItems);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { theme: currentTheme } = useTheme();

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(defaultItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Item[]>(items);

  useEffect(() => {
    const results = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery, items]);

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const handleAddItem = (item: Item) => {
    setItems([...items, item]);
    setIsAddModalOpen(false);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEditItem = (updatedItem: Item) => {
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
    setIsEditModalOpen(false);
  };

  const handleExport = (format: "json" | "csv") => {
    let data;
    let filename;
    let contentType;

    switch (format) {
      case "json":
        data = JSON.stringify(items, null, 2);
        filename = "shopping-list.json";
        contentType = "application/json;charset=utf-8;";
        break;
      case "csv":
        const csvRows = [];
        csvRows.push("Name,Quantity");
        items.forEach((item) => {
          csvRows.push(`${item.name},${item.quantity}`);
        });
        data = csvRows.join("\n");
        filename = "shopping-list.csv";
        contentType = "text/csv;";
        break;
      default:
        return;
    }

    const blob = new Blob([data], { type: contentType });
    saveAs(blob, filename);

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id: Date.now(), message: "Successfully Exported" },
    ]);
  };

  return (
    <SlideInLeft>
      <div
        className={`min-h-screen w-full flex flex-col justify-between items-stretch text-black p-8 ${currentTheme.background}`}
      >
        <div className="flex-1 flex flex-col ">
          <div className="flex justify-between items-center">
            <Link href="/dashboard">
              <h1 className="text-6xl font-extrabold text-[#6D6875] mb-5">
                Shopping List
              </h1>
            </Link>
            <NotificationsSidebar notifications={[]} />
          </div>

          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full mt-2 font-semibold bg-[#261F2F] text-white"
              placeholder="Search for an item..."
            />
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn ml-4 text-[#F9DEC9] bg-[#261F2F] border-none"
            >
              +
            </button>
          </div>
          <Modal
            isOpen={isAddModalOpen}
            onRequestClose={() => setIsAddModalOpen(false)}
            ariaHideApp={false}
            style={{
              overlay: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              content: {
                position: "relative",
                margin: "0",
                padding: "20px",
                border: "1px solid #ccc",
                background: "#F1F1F1",
                overflow: "auto",
                borderRadius: "4px",
                outline: "none",
                width: "400px",
                maxWidth: "100%",
                color: "black",
              },
            }}
          >
            <AddItemForm
              onAddItem={handleAddItem}
              isOpen={isAddModalOpen}
              onRequestClose={() => setIsAddModalOpen(false)}
            />
          </Modal>
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
            ariaHideApp={false}
            style={{
              overlay: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              content: {
                position: "relative",
                margin: "0",
                padding: "20px",
                border: "1px solid #ccc",
                background: "#f1f1f1",
                overflow: "auto",
                borderRadius: "4px",
                outline: "none",
                width: "400px",
                maxWidth: "100%",
                color: "black",
              },
            }}
          >
            {editingItem && (
              <EditItemForm
                item={editingItem}
                onEditItem={handleEditItem}
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
              />
            )}
          </Modal>
          <ul className="mt-4">
            {searchResults.map((item) => (
              <ListItem key={item.id}>
                <div className="flex justify-between items-center p-4 bg-[#F9DEC9] rounded-md shadow-md border border-[#6D6875]">
                  <span className="text-lg font-semibold text-[#6D6875]">
                    {item.name}: {item.quantity}
                  </span>
                  <div>
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setIsEditModalOpen(true);
                      }}
                      className="btn btn-[#6D6875] mt-2 mr-2 bg-[#261F2F] text-[#F9DEC9] text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="btn btn-[#6D6875] mt-2 bg-[#261F2F] text-[#F9DEC9] text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </ListItem>
            ))}
          </ul>
          <div className="mb-2">
            <button
              className="btn text-[#F9DEC9] bg-[#261F2F]"
              onClick={() => handleExport("json")}
            >
              Export JSON
            </button>
          </div>
          <div>
            <button
              className="btn text-[#F9DEC9] bg-[#261F2F]"
              onClick={() => handleExport("csv")}
            >
              Export CSV
            </button>
            {/* Add more export format buttons as needed */}
          </div>
        </div>
      </div>
    </SlideInLeft>
  );
}

function ListItem({ children }: ListItemProps) {
  return (
    <motion.li
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-2"
    >
      {children}
    </motion.li>
  );
}

function AddItemForm({ onAddItem, isOpen, onRequestClose }: AddItemFormProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const item: Item = {
      id: Date.now(),
      name,
      quantity: Number(quantity),
    };

    onAddItem(item);

    setName("");
    setQuantity("");
  };

  return (
    <SlideInLeft>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#6D6875]">Add Item</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-md shadow-md p-4" 
        >
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full mt-1 bg-white text-black"
            />
          </label>
          <label className="block mb-2">
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input input-bordered w-full mt-1 text-black bg-white"
            />
          </label>
          <button
            type="submit"
            className="btn btn-[#6D6875] mt-2 bg-[#261F2F] text-[#F9DEC9]"
          >
            Add Item
          </button>
          <button
            onClick={onRequestClose}
            className="btn mt-2 ml-2 bg-[#261F2F] text-[#F9DEC9]"
          >
            Cancel
          </button>
        </form>
      </div>
    </SlideInLeft>
  );
}

function EditItemForm({
  item,
  onEditItem,
  isOpen,
  onRequestClose,
}: EditItemFormProps) {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity.toString());

  useEffect(() => {
    if (isOpen) {
      setName(item.name);
      setQuantity(item.quantity.toString());
    }
  }, [isOpen, item.name, item.quantity]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedItem: Item = {
      ...item,
      name,
      quantity: Number(quantity),
    };

    onEditItem(updatedItem);

    setName("");
    setQuantity("");
  };

  return (
    <SlideInLeft>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#6D6875]">
          Edit Item
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-md shadow-md p-4"
        >
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full mt-1 text-black bg-white"
            />
          </label>
          <label className="block mb-2">
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input input-bordered w-full mt-1 text-black bg-white"
            />
          </label>
          <button
            type="submit"
            className="btn btn-[#6D6875] mt-2 text-[#F9DEC9] bg-[#261F2F]"
          >
            Save Changes
          </button>
          <button
            onClick={onRequestClose}
            className="btn btn-[#6D6875] mt-2 ml-2 text-[#F9DEC9] bg-[#261F2F]"
          >
            Cancel
          </button>
        </form>
      </div>
    </SlideInLeft>
  );
}
