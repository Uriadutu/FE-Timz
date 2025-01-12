import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const MassUpload = () => {
  const navigate = useNavigate();
  const [dataGet, setDataget] = useState([]);

  const getVendor = async () => {
    try {
      const response = await axios.get("http://localhost:5000/invoice");
      setDataget(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVendor();
  }, []);

  const kombinasi = (item) => {
    const duaAwal = item.slice(0, 2);
    const duaAkhir = item.slice(-2);

    const hasil = duaAwal + duaAkhir;
    return hasil;
  };
  const kombinasi2 = (item) => {
    const duaAwal = item.slice(2, -4);

    const hasil = duaAwal;
    return hasil;
  };
  const exportToExcel = () => {
    const dataToExport = dataGet.flatMap((item, index) => [
      // Baris pertama
      {
        No: index + 1,
        "Company Code": 1000,
        "Document Type": "KR",
        "Document Date": item.tglInvoice,
        "Posting Date": item.tglInvoiceFinance,
        "Doc.Header Text": item.faktorPajak,
        Reference: item.nomorInvoice,
        "G/L Acct / Assets": " ",
        "D/C": 31,
        Vendor: item?.Vendor?.id_vendor,
        "Tax Code": "V9",
        "Amount in Doc.Curr.": item.totalInvoice / item.ppn,
        "Base Amount": " ",
        Costcenter: item.costCenter,
        "Profit Center": kombinasi(item?.departemen?.id_departemen),
        "Business Area": "0Z02",
        "Pay Term": "ZK01",
        "Base Line Date": item.tglInvoiceGAHR,
      },
      // Baris kedua
      {
        No: " ",
        "Company Code": 1000,
        "Document Type": "KR",
        "Document Date": item.tglInvoice,
        "Posting Date": item.tglInvoiceFinance,
        "Doc.Header Text": item.faktorPajak,
        Reference: item.nomorInvoice,
        "G/L Acct / Assets": item?.Gl?.id_gl,
        "D/C": 40,
        Vendor: "",
        "Tax Code": "V9",
        "Amount in Doc.Curr.": item.totalInvoice,
        "Base Amount": " ",
        Costcenter: item?.departemen?.id_departemen,
        "Profit Center": kombinasi(item?.departemen?.id_departemen),
        "Business Area": kombinasi2(item?.departemen?.id_departemen),
        "Pay Term": "ZK01",
        "Base Line Date": item.tglInvoiceGAHR,
      },
      // Baris ketiga
      {
        No: " ",
        "Company Code": 1000,
        "Document Type": "KR",
        "Document Date": item.tglInvoice,
        "Posting Date": item.tglInvoiceFinance,
        "Doc.Header Text": item.faktorPajak,
        Reference: item.nomorInvoice,
        "G/L Acct / Assets": "1663011000",
        "D/C": 40,
        Vendor: " ",
        "Tax Code": "V9",
        "Amount in Doc.Curr.": item.ppn,
        "Base Amount": item.totalInvoice,
        Costcenter: " ",
        "Profit Center": "1999",
        "Business Area": "0Z02",
        "Pay Term": "ZK01",
        "Base Line Date": item.tglInvoiceGAHR,
      },
    ]);
  
    // Membuat worksheet dan workbook
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataJabatan");
  
    // Menulis file Excel
    XLSX.writeFile(workbook, "MASS_Upload.xlsx");
  };
  
  
  return (
    <div className="p-2 w-full h-[100vh]">
      <div className="flex gap-2 items-center">
        <button className="btn-back" onClick={() => navigate(-1)}>
          Kembali
        </button>
        <button className="btn-export" onClick={exportToExcel}>
          Export Excel
        </button>{" "}
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-[#FFAF10] rounded shadow-lg">
          <thead>
            <tr className="text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left border border-gray-300">No</th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Company Code
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Document Type
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Document Date
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Posting Date
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Doc.Header Text
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Reference
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                G/L Acct / Assets
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                D/C
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Vendor
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Tax Code
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Amount in Doc.Curr.
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Base Amount
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Costcenter
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Profit Center
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Business Area
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Pay Term
              </th>
              <th className="py-3 px-6 text-left border border-gray-300">
                Base Line Date
              </th>
            </tr>
          </thead>
          {dataGet.map((item, index) => (
            <tbody className="text-gray-600 bg-white text-sm font-light">
              <tr key={index}>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {index + 1}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  1000
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  KR
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.tglInvoice}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.tglInvoiceFinance}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.faktorPajak}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.nomorInvoice}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300"></td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  31
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item?.Vendor?.id_vendor}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  V9
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.totalInvoice / item.ppn}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300"></td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.costCenter}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {kombinasi(item?.departemen?.id_departemen)}
                </td>

                <td className="py-3 px-6 text-left border border-gray-300">
                  0Z02
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  ZK01
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.tglInvoiceGAHR}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-6 text-left border border-gray-300"></td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  1000
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  KR
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.tglInvoice}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.tglInvoiceFinance}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.faktorPajak}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.nomorInvoice}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item?.Gl?.id_gl}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  40
                </td>
                <td className="py-3 px-6 text-left border border-gray-300"></td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  V9
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.totalInvoice}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300"></td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item?.departemen?.id_departemen}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {kombinasi(item?.departemen?.id_departemen)}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {kombinasi2(item?.departemen?.id_departemen)}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  ZK01
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.tglInvoiceGAHR}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-6 text-left border border-gray-300"></td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  1000
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  KR
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.tglInvoice}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.tglInvoiceFinance}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.faktorPajak}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.nomorInvoice}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  1663011000{" "}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  40
                </td>
                <td className="py-3 px-6 text-left border border-gray-300"></td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  V9
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.ppn}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.totalInvoice}{" "}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300"></td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  1999
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  0Z02
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  ZK01
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {item.tglInvoiceGAHR}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default MassUpload;
