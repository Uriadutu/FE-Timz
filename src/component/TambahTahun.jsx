import React, { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import AddTahunModal from "./modals/AddTahunModal";
import axios from "axios";

const TambahTahun = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataGet, setDataget] = useState([]);
  const navigate = useNavigate();
  const { bulan } = useParams();


  
  const hapusData = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tahun/${id}`)
      getTahun()
    } catch (error) {
      console.log(error);
    }
  }


  const getTahun = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tahun/bulan/${bulan}`);
      setDataget(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTahun();
  }, []);
  

  return (
    <div className="p-2 w-full h-[100vh]">
      {openModalAdd && (
        <AddTahunModal setIsOpenModalAdd={setOpenModalAdd} getTahun={getTahun} />
      )}
      <div className="flex gap-3 items-center">
        <button
          className="bg-gray-200 border border-gray-300 p-2 rounded"
          onClick={() => navigate(-1)}
        >
          Kembali
        </button>
        <button className="btn-add" onClick={() => setOpenModalAdd(true)}>
          Tambah Tahun
        </button>
      </div>
      <div className="mt-2 rounded">
        <table className="min-w-full shadow-lg">
          <thead className=" bg-[#FFAF10]">
            <tr className="text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left border border-gray-200">Tahun</th>
              <th className="py-3 px-6 text-left border border-gray-200">tipe Vendor</th>
              <th className="py-3 px-6 text-left border border-gray-200">Jumlah Tagihan</th>
              <th className="py-3 px-6 text-center border border-gray-200">Opsi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dataGet.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-6 text-left border border-gray-200">{item?.tahun}</td>
                <td className="py-3 px-6 text-left border border-gray-200">{item?.jenis_vendor}</td>
                <td className="py-3 px-6 text-left border border-gray-200">{item?.jumlah_invoice}</td>
                <td className="py-3 px-6 text-center border border-gray-200 space-x-2">
                  <button
                    className=""
                    title="Tambah"
                    onClick={() => navigate(`/kelola-invoice/${bulan}/${item?.tahun}/${item.jenis_vendor}`)}
                  >
                    <IoAddCircleSharp size={20} color="silver" />
                  </button>
                  <button className="" title="Hapus">
                    <MdDelete size={20} color="silver" onClick={()=>hapusData(item?.id)}/>
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

export default TambahTahun;
