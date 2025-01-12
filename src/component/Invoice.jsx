import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddInvoiceModal from "./modals/AddInvoiceModal";
import axios from "axios";
import * as XLSX from "xlsx"; // Import library xlsx

const Invoice = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataGet, setDataget] = useState([]);
  const { bulan, tahun } = useParams();
  const navigate = useNavigate();

  const bulanTahun = `${bulan}${tahun}`;

  const getInvoice = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/invoice/bulan/${bulanTahun}`
      );
      setDataget(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvoice();
  }, []);

  const hapusData = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/invoice/${id}`);
      getInvoice();
    } catch (error) {
      console.log(error);
    }
  };

  // Fungsi untuk ekspor data ke file Excel
  const exportToExcel = () => {
    const dataExport = dataGet.map((item, index) => ({
      No: index + 1,
      "Tanggal Invoice (GA/HR)": item?.tglInvoiceGAHR,
      "Tanggal Invoice (Finance)": item?.tglInvoiceFinance,
      "Id Vendor": item?.Vendor?.id_vendor,
      "Nama Vendor": item?.Vendor?.nama_vendor,
      "Tanggal Invoice": item?.tglInvoice,
      "Nomor Invoice": item?.nomorInvoice,
      PO: item?.po,
      "Total Invoice": item?.totalInvoice,
      PPN: item?.ppn,
      Lainnya: item?.totalInvoice,
      "Total dengan PPN": (
        parseFloat(item.totalInvoice) +
        (parseFloat(item.totalInvoice) * 1.1) / 100
      ).toFixed(2),
      "VAT 23": (item.totalInvoice * 2) / 100,
      "Total Bayar ke Vendor": (
        Number(item.totalInvoice) +
        (Number(item.totalInvoice) * 1.11) / 100 -
        (Number(item.totalInvoice) * 2) / 100
      ).toFixed(2).slice(0, 5),
      "Faktor Pajak": item?.faktorPajak,
      "Departemen": item && item.departemen && item.departemen.nama_departemen,
      "Id Departemen": item && item.departemen && item.departemen.id_departemen,
      "Jenis Pengiriman": item?.jenisPengiriman,
      GL: item?.gl,
      Deskripsi: item?.deskripsi,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataHaji");
    XLSX.writeFile(workbook, `Invoice_${bulan}-${tahun}.xlsx`);
  };

  return (
    <div className="bg-white w-full h-[100vh] p-2">
      {openModalAdd && (
        <AddInvoiceModal
          setIsOpenModalAdd={setOpenModalAdd}
          getInvoices={getInvoice}
        />
      )}
      <div className="flex items-center gap-3">
        <div className="flex gap-2 items-center">
          <button className="btn-back" onClick={() => navigate(-1)}>
            Kembali
          </button>
          <button className="btn-add" onClick={() => setOpenModalAdd(true)}>
            Tambah Tagihan
          </button>
          <button className="btn-export" onClick={exportToExcel}>
            Export Excel
          </button>
          <Link to={"/massupload"} className="btn-upload">
            Mass Upload
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full shadow-lg mt-2 rounded-lg">
          <thead className="bg-[#FFAF10]">
            <tr className="text-gray-800 uppercase text-sm leading-normal">
              {/* Header Row */}
              <th className="py-3 px-6 text-left border border-gray-200">No</th>
              <th className="py-3 px-6 text-left border border-gray-200">
                Tanggal Tagihan (GA/HR)
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">
                Tanggal Tagihan (Finance)
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">
                Id Vendor
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">
                Nama Vendor
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">
                Tanggal Tagihan
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">
                Nomor Tagihan
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">PO</th>
              <th className="py-3 px-6 text-left border border-gray-200">
                Total Tagihan
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">
                PPN
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">
                Lainnya
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">
                Total dengan PPN
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">
                VAT 23
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">
                Total Bayar ke Vendor
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">
                Faktor Pajak
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">
                Departemen
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">
                Id Departemen
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">
                Jenis Pengiriman
              </th>
              <th className="py-3 px-6 text-left border border-gray-200">GL</th>
              <th className="py-3 px-6 text-left border border-gray-200">
                Deskripsi
              </th>
              <th className="py-3 px-6 text-center border border-gray-200">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {dataGet.map((item, index) => (
              <tr key={index} className="border border-gray-200">
                <td className="py-3 px-6 border border-gray-200">
                  {index + 1}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {item.tglInvoiceGAHR}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {item.tglInvoiceFinance}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {item?.Vendor?.id_vendor}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                {item?.Vendor?.nama_vendor}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {item.tglInvoice}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {item.nomorInvoice}
                </td>
                <td className="py-3 px-6 border border-gray-200">{item.po}</td>
                <td className="py-3 px-6 border border-gray-200">
                  {item.totalInvoice}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {item.ppn}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {item.totalInvoice}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {(
                    parseFloat(item.totalInvoice) +
                    (parseFloat(item.totalInvoice) * 1.1) / 100
                  ).toFixed(2)}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {(item.totalInvoice * 2) / 100}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {(
                    Number(item.totalInvoice) +
                    (Number(item.totalInvoice) * 1.11) / 100 -
                    (Number(item.totalInvoice) * 2) / 100
                  ).toFixed(2).slice(0, 5)}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {item.faktorPajak}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {item?.departemen?.nama_departemen}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                {item?.departemen?.id_departemen}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {item.jenisPengiriman}
                </td>
                <td className="py-3 px-6 border border-gray-200">{item?.Gl?.id_gl}</td>
                <td className="py-3 px-6 border border-gray-200">
                  {item.deskripsi}
                </td>
                <td className="py-3 px-6 text-center flex justify-center">
                  <button
                    className="hover:text-red-500"
                    title="Hapus"
                    onClick={() => hapusData(item?.id)}
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

export default Invoice;
