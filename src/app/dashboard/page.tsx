"use client";
import { useState, useEffect } from "react";
import Item from "../components/Item";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../Firebase";
import { getAuth } from "firebase/auth";

const Modal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: (title: string, desc: string) => void }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {
    if (title && desc) {
      onSubmit(title, desc);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 border border-black shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Item</h2>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-4"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="flex justify-around gap-2">
          <button onClick={onClose} className="bg-white border border-red-300 text-red-500 px-4 py-2 w-[50%]">Cancel</button>
          <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 w-[50%]">Add Item</button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const auth = getAuth();
  const user = auth.currentUser?.displayName;
  const [items, setItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch items from Firestore
  useEffect(() => {
    const fetchItems = async () => {
      if (user) {
        const querySnapshot = await getDocs(collection(db, user)); 
        const itemList: any[] = [];
        querySnapshot.forEach((doc) => {
          itemList.push({ id: doc.id, ...doc.data() });
        });
        setItems(itemList);
      }
    };

    fetchItems();
  }, [user]);

  // Add a new item to Firestore
  const handleAddItem = async (title: string, desc: string) => {
    if (user) {
      const docRef = await addDoc(collection(db, user), { title, desc });
      setItems([...items, { id: docRef.id, title, desc }]);
    }
  };

  // Delete an item from Firestore
  const handleDeleteItem = async (id: string) => {
    if (user) {
      await deleteDoc(doc(db, user, id)); // Use the user and id to delete
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <div className="font-mono">
        <Header />
        <div className="flex items-center justify-center h-14 mt-6">
          <div
            className="bg-gray-200 h-full flex justify-center items-center w-[90%] rounded-2xl cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex flex-row items-center gap-2">
              <span className=" text-slate-400">
                <FontAwesomeIcon icon={faCirclePlus} />
              </span>
              <p className="font-bold text-lg text-slate-400"> New Item</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-center justify-center mt-6 mb-4 px-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-center gap-2 h-full w-full">
              <Item title={item.title} desc={item.desc} />
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="text-green-500 bg-white border border-green-300 px-2 py-1 w-14 ml-4 h-14"
              >
                Done
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddItem}
        />
      )}
    </>
  );
}
