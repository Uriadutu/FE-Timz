import React, { useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const KelolaInvoice = () => {
  const [tagihan, setTagihan] = useState(true);
  const data = [{
    tagihan : "Januari - Lokal - Cipta Krida",
    tagihan_masuk : "11 - 01 - 2025",
    jatuh_tempo : "16 -  01 - 2025"
  }]

  return (
    <div className="p-2 w-full h-[100vh]">
      <div className="grid grid-cols-4 gap-x-24 gap-y-6 w-full">
        <Link
          to={"/tambah-tahun/januari"}
          className="px-4 py-5 bg-white  shadow-lg border border-gray-200 border-t-2 border-t-[#FFAF10] text-center rounded-md"
        >
          Januari
        </Link>
        <Link
          to={"/tambah-tahun/febuari"}
          className="px-4 py-5 bg-white  shadow-lg border border-gray-200 border-t-2 border-t-[#FFAF10] text-center rounded-md"
        >
          Febuari
        </Link>
        <Link
          to={"/tambah-tahun/maret"}
          className="px-4 py-5 bg-white  shadow-lg border border-gray-200 border-t-2 border-t-[#FFAF10] text-center rounded-md"
        >
          Maret
        </Link>
        <Link
          to={"/tambah-tahun/april"}
          className="px-4 py-5 bg-white  shadow-lg border border-gray-200 border-t-2 border-t-[#FFAF10] text-center rounded-md"
        >
          April
        </Link>
        <Link
          to={"/tambah-tahun/mei"}
          className="px-4 py-5 bg-white  shadow-lg border border-gray-200 border-t-2 border-t-[#FFAF10] text-center rounded-md"
        >
          Mei
        </Link>
        <Link
          to={"/tambah-tahun/juni"}
          className="px-4 py-5 bg-white  shadow-lg border border-gray-200 border-t-2 border-t-[#FFAF10] text-center rounded-md"
        >
          Juni
        </Link>
        <Link
          to={"/tambah-tahun/juli"}
          className="px-4 py-5 bg-white  shadow-lg border border-gray-200 border-t-2 border-t-[#FFAF10] text-center rounded-md"
        >
          Juli
        </Link>
        <Link
          to={"/tambah-tahun/agustus"}
          className="px-4 py-5 bg-white  shadow-lg border border-gray-200 border-t-2 border-t-[#FFAF10] text-center rounded-md"
        >
          Agustus
        </Link>
        <Link
          to={"/tambah-tahun/september"}
          className="px-4 py-5 bg-white  shadow-lg border border-gray-200 border-t-2 border-t-[#FFAF10] text-center rounded-md"
        >
          September
        </Link>
        <Link
          to={"/tambah-tahun/oktober"}
          className="px-4 py-5 bg-white  shadow-lg border border-gray-200 border-t-2 border-t-[#FFAF10] text-center rounded-md"
        >
          Oktober
        </Link>
        <Link
          to={"/tambah-tahun/november"}
          className="px-4 py-5 bg-white  shadow-lg border border-gray-200 border-t-2 border-t-[#FFAF10] text-center rounded-md"
        >
          November
        </Link>
        <Link
          to={"/tambah-tahun/desember"}
          className="px-4 py-5 bg-white  shadow-lg border border-gray-200 border-t-2 border-t-[#FFAF10] text-center rounded-md"
        >
          Desember
        </Link>
      </div>
      <div className="flex w-full justify-center mt-10">
        <div className="w-full">
          <p className="font-bold text-center">Pengingat Tagihan</p>
          <div className="mt-2 rounded">
            <table className="min-w-full shadow-lg">
              <thead className=" bg-[#FFAF10]">
                <tr className="text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left border border-gray-200">
                    Tagihan
                  </th>
                  <th className="py-3 px-6 text-left border border-gray-200">
                    Tagihan Masuk
                  </th>
                  <th className="py-3 px-6 text-left border border-gray-200">
                    Jatuh Tempo
                  </th>
                  <th className="py-3 px-6 text-center border border-gray-200">
                    Opsi
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {tagihan && (
                  <tr>
                    <td className="py-3 px-6 text-left border border-gray-200">
                      {data[0].tagihan}
                    </td>
                    <td className="py-3 px-6 text-left border border-gray-200">
                      {data[0].tagihan_masuk}
                    </td>
                    <td className="py-3 px-6 text-left border border-gray-200">
                      {data[0].jatuh_tempo}
                    </td>
                    

                    <td className="py-3 px-6 text-center border border-gray-200 space-x-2">
                      <button className="text-white px-5 py-1 border border-green-300 rounded bg-green-600" onClick={()=> setTagihan(false)}>
                        selesai
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KelolaInvoice;
