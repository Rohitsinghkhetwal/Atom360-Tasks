import { useState } from "react";
import EditModal from "./Modal";


const authorsData = [
  {
    id: 1,
    name: "John Michael",
    email: "john@creative-tim.com",
    function: "Manager",
    status: "ONLINE",
    employed: "23/04/18",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    function: "Programmer",
    status: "OFFLINE",
    employed: "11/01/19",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 5,
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    function: "Manager",
    status: "OFFLINE",
    employed: "04/10/21",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];



const Tables = () => {
  const [authors, setAuthors] = useState(authorsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<any>(null);

  const openModal = (author: any = null) => {
    setEditingAuthor(author);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingAuthor(null);
    setIsModalOpen(false);
  };

  const handleSave = (author: any) => {
    if (author.id) {
      setAuthors(authors.map((a:any) => (a.id === author.id ? author : a)));
    } else {
      setAuthors([...authors, { ...author, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setAuthors(authors.filter((author:any) => author.id !== id));
  };

  return (
    <div className=" w-full">
      <div className="bg-white flex justify-between my-3 rounded-md">
        <input type="text" placeholder="Type here..." className="border p-2 rounded w-80" />
        <button onClick={() => openModal()} className="bg-orange-500 text-white px-4 py-2 rounded">
          Add New
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Authors Table</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-gray-600">AUTHOR</th>
              <th className="px-6 py-3 text-gray-600">FUNCTION</th>
              <th className="px-6 py-3 text-gray-600">STATUS</th>
              <th className="px-6 py-3 text-gray-600">EMPLOYED</th>
              <th className="px-6 py-3 text-right text-gray-600">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author:any) => (
              <tr key={author.id} className="border-b">
                <td className="px-6 py-4 flex items-center">
                  <img className="w-10 h-10 rounded-full" src={author.avatar} alt={author.name} />
                  <div className="ml-4">
                    <p className="text-gray-900 font-semibold">{author.name}</p>
                    <p className="text-gray-500 text-sm">{author.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">{author.function}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      author.status === "ONLINE" ? "bg-green-500" : "bg-gray-500"
                    }`}
                  >
                    {author.status}
                  </span>
                </td>
                <td className="px-6 py-4">{author.employed}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => openModal(author)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded text-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(author.id)} className="px-3 py-1 border border-red-500 text-red-500 rounded text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <EditModal author={editingAuthor} onSave={handleSave} onClose={closeModal} />}
    </div>
  );
};

export default Tables;

