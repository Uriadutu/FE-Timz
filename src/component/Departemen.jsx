import React, { useEffect, useState } from 'react';
import AddDepartemenModal from './modals/AddDepartemenAdd';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

const Departemen = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataGet, setDataget] = useState([]);

  const getDepartemen = async () => {
    try {
      const response = await axios.get("http://localhost:5000/departemen");
      setDataget(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDepartemen = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/departemen/${id}`);
      getDepartemen(); // Refresh data after deletion
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDepartemen();
  }, []);

  return (
    <div className='p-2 w-full h-[100vh]'>
      {openModalAdd && (
        <AddDepartemenModal setIsOpenModalAdd={setOpenModalAdd} getDepartemen={getDepartemen} />
      )}
      <button className='btn-add' onClick={() => setOpenModalAdd(true)}>Tambah Departemen</button>
      <div className="overflow-x-auto  shadow-lg">
        <table className="w-full shadow-lg mt-2 rounded">
          <thead>
            <tr className="text-gray-600 bg-[#FFAF10] uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left border border-gray-200">ID Departemen</th>
              <th className="py-3 px-6 text-left border border-gray-200">Nama Departemen</th>
              <th className="py-3 px-6 text-center border border-gray-200">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dataGet.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-6 text-left border border-gray-200">{item?.id_departemen}</td>
                <td className="py-3 px-6 text-left border border-gray-200">{item?.nama_departemen}</td>
                <td className="py-3 px-6 border border-gray-200 text-center">
                  <button
                    title="Hapus"
                    onClick={() => deleteDepartemen(item?.id_departemen)}
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

export default Departemen;
