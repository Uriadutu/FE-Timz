import React, { useEffect, useState } from 'react';
import AddVendorModal from './modals/AddVendorModal';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Vendor = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataGet, setDataget] = useState([]);
  const {tipe} = useParams();

  const getVendor = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/vendor/jenis/${tipe}`);
      setDataget(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVendor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/vendor/${id}`);
      getVendor(); // Refresh the data after deletion
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVendor();
  }, []);

  const navigate = useNavigate()

  return (
    <div className='p-2 w-full  h-[100vh]'>
      {openModalAdd && (
        <AddVendorModal setIsOpenModalAdd={setOpenModalAdd} getVendors={getVendor} />
      )}
      <div className="flex gap-3">
        
      <button onClick={() => navigate(-1)} className='btn-back'>Kembali</button>
      <button onClick={() => setOpenModalAdd(true)} className='btn-add'>Tambah Vendor</button>
      </                                div>
      <div className="overflow-x-auto  shadow-lg">
        <table className="w-full shadow-lg mt-2 rounded">
          <thead>
            <tr className="text-gray-600 bg-[#FFAF10] uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left border border-gray-200">ID Vendor</th>
              <th className="py-3 px-6 text-left border border-gray-200">Nama Vendor</th>
              <th className="py-3 px-6 text-center border border-gray-200">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dataGet.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-6 text-left border border-gray-200">{item?.id_vendor}</td>
                <td className="py-3 px-6 text-left border border-gray-200">{item?.nama_vendor}</td>
                <td className="py-3 px-6 text-center border border-gray-200">
                  <button
                    title="Hapus"
                    onClick={() => deleteVendor(item?.id_vendor)}
                  >
                    <MdDelete color="silver" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendor;
