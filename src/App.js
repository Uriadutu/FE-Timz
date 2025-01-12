import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
import InvoicePage from "./pages/InvoicePage";
import MassUploadPage from "./pages/MassUploadPage";
import Login from "./component/Login";
import KelolaInvoicePage from "./pages/KelolaInvoicePage";
import VendorPage from "./pages/VendorPage";
import DepartemenPage from "./pages/DepartemenPage";
import GlPage from "./pages/GlPage";
import TambahTahunPage from "./pages/TambahTahunPage";
import NotFound from "./component/NotFound";
import TambahVendorPage from "./pages/TambahVendorPage";





function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} /> 
          <Route path="/" element={<Login />} /> 
          <Route path="/kelola-invoice" element={<KelolaInvoicePage />} />
          <Route path="/tambah-tahun/:bulan" element={<TambahTahunPage />} />
          <Route path="/kelola-invoice/:bulan/:tahun/:tipe" element={<InvoicePage />} />
          <Route path="/massupload" element={<MassUploadPage />} />
          <Route path="/vendor" element={<TambahVendorPage />} /> 
          <Route path="/vendor/:tipe" element={<VendorPage />} /> 
          <Route path="/departemen" element={<DepartemenPage />} /> 
          <Route path="/gl" element={<GlPage />} /> 
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
