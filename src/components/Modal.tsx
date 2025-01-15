import { useState } from "react";

const EditModal = ({ author, onSave, onClose }: { author: any; onSave: (author: any) => void; onClose: () => void }) => {
  const [formData, setFormData] = useState(author || { name: "", email: "", function: "", status: "ONLINE", employed: "", avatar: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev:any) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.function.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{author ? "Edit Author" : "Add Author"}</h2>
        
        <label className="block mb-2">Name</label>
        <input name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded mb-2" />

        <label className="block mb-2">Email</label>
        <input name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded mb-2" />

        <label className="block mb-2">Function</label>
        <input name="function" value={formData.function} onChange={handleChange} className="w-full border p-2 rounded mb-2" />

        <label className="block mb-2">Status</label>
        <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded mb-2">
          <option value="ONLINE">ONLINE</option>
          <option value="OFFLINE">OFFLINE</option>
        </select>

        <label className="block mb-2">Employed Date</label>
        <input name="employed" type="date" value={formData.employed} onChange={handleChange} className="w-full border p-2 rounded mb-4" />

        <label className="block mb-2">Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded mb-2" />

        {formData.avatar && (
          <img src={formData.avatar} alt="Avatar Preview" className="w-20 h-20 rounded-full mx-auto my-2" />
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSubmit} className="bg-orange-500 text-white px-4 py-2 rounded">
            {author ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
