import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const AddInvoiceModal = ({ setIsOpenModalAdd, getInvoices }) => {
  const [departemen, setDepartemen] = useState([]);
  const [gl, setGl] = useState([]);
  const [vendor, setVendor] = useState([]);
  const { bulan, tahun } = useParams();
  const bulanTahun = `${bulan}${tahun}`;

  const [tglInvoiceGAHR, setTglInvoiceGAHR] = useState("");
  const [tglInvoiceFinance, setTglInvoiceFinance] = useState("");
  const [nomorInvoice, setNomorInvoice] = useState("");
  const [po, setPo] = useState("");
  const [tglInvoice, setTglInvoice] = useState("");
  const [totalInvoice, setTotalInvoice] = useState("");
  const [faktorPajak, setFaktorPajak] = useState("");
  const [jenisPengiriman, setJenisPengiriman] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [idDepartemen, setIdDepartemen] = useState("");
  const [idGl, setIdGl] = useState("");
  const [idVendor, setIdVendor] = useState("");
  const {tipe} = useParams()

  // Generic fetch function
  const fetchData = async (url, setter) => {
    try {
      const response = await axios.get(url);
      setter(response.data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  useEffect(() => {
    fetchData("http://localhost:5000/departemen", setDepartemen);
    fetchData("http://localhost:5000/gl", setGl);
    fetchData(`http://localhost:5000/vendor/jenis/${tipe}`, setVendor);
  }, []);

  const saveInvoice = async (e) => {
    e.preventDefault();

    const formData = {
      tglInvoiceGAHR,
      tglInvoiceFinance,
      nomorInvoice,
      po,
      tglInvoice,
      ppn :totalInvoice * 1.1 / 100,
      totalInvoice,
      faktorPajak,
      jenisPengiriman,
      deskripsi,
      id_gl: idGl,
      id_departemen: idDepartemen,
      id_vendor: idVendor,
      lainnya: "0",
      bulanTahun,
      totalDenganPPN: "0",
      vat23: "0",
      totalBayarVendor: "0",
    };

    try {
      const response = await axios.post("http://localhost:5000/invoice", formData);

      if (response.status === 201) {
        setIsOpenModalAdd(false); // Close modal
        getInvoices(); // Refresh invoice list
      }
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  return (
    <div
      id="invoice-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 px-2 flex items-center justify-center bg-black bg-opacity-60 z-40"
    >
      <form onSubmit={saveInvoice}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">Tambah Tagihan</h3>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900"
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
            <div className="mb-4 grid grid-cols-2 gap-4">
              <label className="block text-sm font-medium text-gray-700">
                Tanggal Tagihan diterima (GA/HR)
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                value={tglInvoiceGAHR}
                onChange={(e) => setTglInvoiceGAHR(e.target.value)}
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <label className="block text-sm font-medium text-gray-700">
                Tanggal Tagihan diterima (Finance)
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                value={tglInvoiceFinance}
                onChange={(e) => setTglInvoiceFinance(e.target.value)}
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <label className="block text-sm font-medium text-gray-700">Nomor Tagihan</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                value={nomorInvoice}
                onChange={(e) => setNomorInvoice(e.target.value)}
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <label className="block text-sm font-medium text-gray-700">PO</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                value={po}
                onChange={(e) => setPo(e.target.value)}
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <label className="block text-sm font-medium text-gray-700">Tanggal Tagihan</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                value={tglInvoice}
                onChange={(e) => setTglInvoice(e.target.value)}
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <label className="block text-sm font-medium text-gray-700">Total Tagihan</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                value={totalInvoice}
                onChange={(e) => setTotalInvoice(e.target.value)}
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <label className="block text-sm font-medium text-gray-700">Faktur Pajak</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                value={faktorPajak}
                onChange={(e) => setFaktorPajak(e.target.value)}
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <label className="block text-sm font-medium text-gray-700">Jenis Pengiriman</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                value={jenisPengiriman}
                onChange={(e) => setJenisPengiriman(e.target.value)}
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <label className="block text-sm font-medium text-gray-700">Departemen</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                value={idDepartemen}
                onChange={(e) => setIdDepartemen(e.target.value)}
              >
                <option value="">Pilih Departemen</option>
                {departemen.map((item, i) => (
                  <option key={i} value={item.id}>{item.nama_departemen}</option>
                ))}
              </select>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <label className="block text-sm font-medium text-gray-700">GL</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                value={idGl}
                onChange={(e) => setIdGl(e.target.value)}
              >
                <option value="">Pilih GL</option>
                {gl.map((item, i) => (
                  <option key={i} value={item.id_gl}>{item.nama_gl}</option>
                ))}
              </select>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <label className="block text-sm font-medium text-gray-700">Vendor</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                value={idVendor}
                onChange={(e) => setIdVendor(e.target.value)}
              >
                <option value="">Pilih Vendor</option>
                {vendor.map((item, i) => (
                  <option key={i} value={item.id_vendor}>{item.nama_vendor}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              Simpan
            </button>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Batal
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default AddInvoiceModal;