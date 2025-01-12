import React from 'react';
import { IoAddCircleSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

const TambahVendor = () => {
    const navigate = useNavigate()
  return (
    <div className='p-2 w-full h-[100vh]'>
      <div className="overflow-x-auto  shadow-lg">
        <table className="w-full shadow-lg mt-2 rounded">
          <thead>
            <tr className="text-gray-600 bg-[#FFAF10] uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left border border-gray-200">Tipe Vendor</th>
              <th className="py-3 px-6 text-center border border-gray-200">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
              <tr>
                <td className="py-3 px-6 text-left border border-gray-200">Tunggal</td>
                <td className="py-3 px-6 text-center border border-gray-200"><button onClick={()=> navigate("/vendor/tunggal")}> <IoAddCircleSharp size={20} color="silver" /></button></td>
              </tr>
              <tr>
                <td className="py-3 px-6 text-left border border-gray-200">Lokal</td>
                <td className="py-3 px-6 text-center border border-gray-200"><button onClick={()=> navigate("/vendor/lokal")}> <IoAddCircleSharp size={20} color="silver" /></button></td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TambahVendor;
