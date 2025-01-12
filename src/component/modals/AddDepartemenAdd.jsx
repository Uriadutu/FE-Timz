import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AddDepartemenModal = ({ setIsOpenModalAdd, getDepartemen }) => {
  const [formData, setFormData] = useState({
    nama_departemen: "",
    id_departemen: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State untuk menyimpan pesan error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const saveDepartemen = async (e) => {
    e.preventDefault();
    try {
      // Reset error message saat mencoba mengirim data
      setErrorMessage(""); 

      await axios.post("http://localhost:5000/departemen", formData);
      setIsOpenModalAdd(false);
      getDepartemen();
    } catch (error) {
      // Jika ada error, set error message
      setErrorMessage("Gagal menambahkan data. ID Departemen Sudah Ada.");
    }
  };

  return (
    <div
      id="departemen-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 px-2 flex items-center sm:items-start sm:pt-3 justify-center bg-black z-40 bg-opacity-60"
    >
      <form onSubmit={saveDepartemen}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg bg-white rounded-lg shadow-lg"
        >
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Tambah Departemen
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
              { label: "ID Departemen", name: "id_departemen", type: "text" },
              { label: "Nama Departemen", name: "nama_departemen", type: "text" }
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

          {errorMessage && (
            <div className="p-4 text-sm text-red-600 bg-red-100 rounded-lg">
              {errorMessage}
            </div>
          )}

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

export default AddDepartemenModal;
