import React, { useEffect, useState } from 'react';
import AddGLModal from './modals/AddGlModal'; 
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

const Gl = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataGet, setDataget] = useState([]);

  const getGl = async () => {
    try {
      const response = await axios.get("http://localhost:5000/gl");
      setDataget(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGl = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/gl/${id}`);
      getGl(); // Refresh the list after deletion
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGl();
  }, []);

  return (
    <div className='p-2 w-full h-[100vh]'>
      {openModalAdd && (
        <AddGLModal setIsOpenModalAdd={setOpenModalAdd} getGL={getGl} />
      )}
      <button className='btn-add bg-[#FFAF10] text-white font-bold py-2 px-4 rounded-lg my-3' onClick={() => setOpenModalAdd(true)}>
        Tambah GL
      </button>
      <div className="overflow-x-auto shadow-lg">
        <table className="w-full shadow-lg mt-2 rounded-lg border border-gray-200">
          <thead>
            <tr className="text-gray-600 bg-[#FFAF10] uppercase text-sm font-semibold">
              <th className="py-3 px-6 text-left border border-gray-200">ID GL</th>
              <th className="py-3 px-6 text-left border border-gray-200">Nama GL</th>
              <th className="py-3 px-6 text-center border border-gray-200">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {dataGet.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-3 px-6 text-left border border-gray-200">{item?.id_gl}</td>
                <td className="py-3 px-6 text-left border border-gray-200">{item?.nama_gl}</td>
                <td className="py-3 px-6 text-center border border-gray-200">
                  <button
                    title="Hapus"
                    onClick={() => deleteGl(item?.id_gl)}
                    className="hover:text-red-500"
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

export default Gl;
