import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AddGLModal = ({ setIsOpenModalAdd, getGL }) => {
  const [formData, setFormData] = useState({
    nama_gl: "",
    id_gl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const saveGL = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/gl", formData);
      setIsOpenModalAdd(false);
      getGL();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="gl-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 px-2 flex items-center sm:items-start sm:pt-3 justify-center bg-black z-40 bg-opacity-60"
    >
      <form onSubmit={saveGL}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg bg-white rounded-lg shadow-lg"
        >
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Tambah GL
            </h3>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7L1 13M7 7l6-6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 space-y-4">
            {[
              { label: "ID GL", name: "id_gl", type :"number" },
              { label: "Nama GL", name: "nama_gl" , type :"text"},
            ].map((field, index) => (
              <div key={index} className="mb-4 grid items-center grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <div className="mt-1">
                  <input
                    type={field.type}
                    name={field.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.label}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
            <button
              type="submit"
              className="btn-add"
            >
              Simpan
            </button>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="btn-back"
            >
              Batal
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default AddGLModal;
