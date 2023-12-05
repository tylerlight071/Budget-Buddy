"use client";
import { useEffect, useState, FormEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import SlideInLeft from "../animations/SlideInLeft";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import NotificationsSidebar from "../components/notifications";
import { useTheme } from "../ThemeContext";

type Bill = {
  id: string;
  name: string;
  amount: number;
};

type AddBillFormProps = {
  onAddBill: (bill: Bill) => void;
  isOpen: boolean;
  onRequestClose: () => void;
};

type EditBillFormProps = {
  bill: Bill;
  onEditBill: (bill: Bill) => void;
  isOpen: boolean;
  onRequestClose: () => void;
};

type ListItemProps = {
  children: ReactNode;
};

const defaultBills = [
  { id: uuidv4(), name: "🏡 Rent", amount: 1000 },
  { id: uuidv4(), name: "🛒 Groceries", amount: 200 },
  { id: uuidv4(), name: "💧 Water", amount: 150 },
  { id: uuidv4(), name: "⚡ Electriciy", amount: 150 },
];

export default function Budget() {
  const [bills, setBills] = useState<Bill[]>(defaultBills);

  const { theme: currentTheme } = useTheme();

  useEffect(() => {
    const savedBills = localStorage.getItem("bills");
    if (savedBills) {
      setBills(JSON.parse(savedBills));
    } else {
      setBills(defaultBills);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bills", JSON.stringify(bills));
  }, [bills]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Bill[]>(defaultBills);

  useEffect(() => {
    const results = bills.filter((bill) =>
      bill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery, bills]);

  const [wage, setWage] = useState<number>(0);

  useEffect(() => {
    const savedWage = localStorage.getItem("wage");
    setWage(savedWage ? JSON.parse(savedWage) : 0);
  }, []);

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);

  useEffect(() => {
    localStorage.setItem("bills", JSON.stringify(bills));
    localStorage.setItem("wage", JSON.stringify(wage));
  }, [bills, wage]);

  const handleAddBill = (bill: Bill) => {
    setBills([...bills, bill]);
    setIsAddModalOpen(false);
  };

  const handleRemoveBill = (id: string) => {
    setBills(bills.filter((bill) => bill.id !== id.toString()));
  };

  const handleEditBill = (updatedBill: Bill) => {
    setBills(
      bills.map((bill) => (bill.id === updatedBill.id ? updatedBill : bill))
    );
    setEditingBill(null);
    setIsEditModalOpen(false);
  };

  const totalAmount = bills.reduce((acc, bill) => acc + bill.amount, 0);
  const remainingWage = wage - totalAmount;

  return (
    <SlideInLeft>
      <div
        className={`min-h-screen w-full flex flex-col justify-between items-stretch text-black p-8 ${currentTheme.background}`}
      >
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between">
            <Link href="/dashboard">
              <h1 className="text-6xl font-extrabold text-[#6D6875] mb-5 cursor-pointer">
                Budget
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
              placeholder="Search for a bill..."
            />
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn ml-4 text-[#F9DEC9]  hover:bg-[#5D5A58] focus:border-[#F9DEC9] bg-[#261F2F] border-none transition ease-in-out duration-300"
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
                backgroundColor: "rgba(0, 0, 0, 0.5)",
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
            <AddBillForm
              onAddBill={handleAddBill}
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
                backgroundColor: "rgba(0, 0, 0, 0.5)",
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
            {editingBill && (
              <EditBillForm
                bill={editingBill}
                onEditBill={handleEditBill}
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
              />
            )}
          </Modal>
          <div className="mb-4 p-4 rounded-md shadow-md bg-[#F9DEC9] border border-[#6D6875]">
            <h2 className="text-2xl font-semibold mb-2 text-[#6D6875] ">
              Monthly Wage:
              <input
                type="number"
                value={wage || ""}
                placeholder="Add your monthly income..."
                onChange={(e) => setWage(Number(e.target.value))}
                className="input input-bordered w-full mt-1 bg-[#261F2F] text-white"
              />
            </h2>
          </div>
          <ul className="mt-4">
            {searchResults.map((bill) => (
              <ListItem key={bill.id}>
                <div className="flex justify-between items-center p-4 bg-[#F9DEC9] rounded-md shadow-md border border-[#6D6875]">
                  <span className="text-lg font-semibold text-[#6D6875]">
                    {bill.name}: £{bill.amount}
                  </span>
                  <div>
                    <button
                      onClick={() => {
                        setEditingBill(bill);
                        setIsEditModalOpen(true);
                      }}
                      className="btn btn-[#6D6875] mt-2 mr-2 text-[#F9DEC9] text-sm hover:bg-[#5D5A58] bg-[#261F2F] focus:border-[#F9DEC9] transition ease-in-out duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveBill(bill.id)}
                      className="btn btn-[#6D6875] mt-2 bg-[#261F2F] text-[#F9DEC9] text-sm hover:bg-[#5D5A58] focus:border-[#F9DEC9] transition ease-in-out duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </ListItem>
            ))}
          </ul>
          <div className="mt-4 p-4 bg-[#F9DEC9] rounded-lg shadow-md border border-[#6D6875]">
            <h2 className="text-2xl font-semibold mb-2 text-[#6D6875]">
              Summary
            </h2>
            <p className="text-xl text-[#6D6875]">Total: £{totalAmount}</p>
            <p className="text-xl text-[#6D6875]">
              Remaining Wage: £{remainingWage}
            </p>
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

function AddBillForm({ onAddBill, isOpen, onRequestClose }: AddBillFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const bill: Bill = {
      id: uuidv4(),
      name,
      amount: Number(amount),
    };

    onAddBill(bill);

    setName("");
    setAmount("");
  };

  return (
    <SlideInLeft>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#6D6875]">Add Bill</h2>
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
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input input-bordered w-full mt-1 bg-white text-black"
            />
          </label>
          <button
            type="submit"
            className="btn btn-[#6D6875] mt-2 text-[#F9DEC9] bg-[#261F2F] hover:bg-[#5D5A58] focus:border-[#F9DEC9] transition ease-in-out duration-300"
          >
            Add Bill
          </button>
          <button
            onClick={onRequestClose}
            className="btn mt-2 ml-2 text-[#F9DEC9] bg-[#261F2F] hover:bg-[#5D5A58] focus:border-[#F9DEC9] transition ease-in-out duration-300"
          >
            Cancel
          </button>
        </form>
      </div>
    </SlideInLeft>
  );
}

function EditBillForm({
  bill,
  onEditBill,
  isOpen,
  onRequestClose,
}: EditBillFormProps) {
  const [name, setName] = useState(bill.name);
  const [amount, setAmount] = useState(bill.amount.toString());

  useEffect(() => {
    if (isOpen) {
      setName(bill.name);
      setAmount(bill.amount.toString());
    }
  }, [isOpen, bill.name, bill.amount]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedBill: Bill = {
      ...bill,
      name,
      amount: Number(amount),
    };

    onEditBill(updatedBill);

    setName("");
    setAmount("");
  };

  return (
    <SlideInLeft>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#6D6875]">
          Edit Bill
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
              className="input input-bordered w-full mt-1 bg-white text-black"
            />
          </label>
          <label className="block mb-2">
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input input-bordered w-full mt-1 text-black bg-white"
            />
          </label>
          <button
            type="submit"
            className="btn btn-[#6D6875] mt-2 bg-[#261F2F] text-[#F9DEC9] hover:bg-[#5D5A58] focus:border-[#F9DEC9] transition ease-in-out duration-300"
          >
            Save Changes
          </button>
          <button
            onClick={onRequestClose}
            className="btn btn-[#6D6875] mt-2 ml-2 bg-[#261F2F] text-[#F9DEC9] hover:bg-[#5D5A58] focus:border-[#F9DEC9] transition ease-in-out duration-300"
          >
            Cancel
          </button>
        </form>
      </div>
    </SlideInLeft>
  );
}
