import React, { useState } from "react";
import LogoApp from "../img/logoAPK.png";
import TextApp from "../img/TextApk.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import MenejemenAkunModal from "./modals/MenejemenAkunModal";

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <div className=" block bg-white w-full m-0 py-4 z-10 justify-between items-center fixed">
        {openModal && <MenejemenAkunModal setIsOpenModalAdd={setOpenModal} />}
        <div className="flex pl-5 justify-between w-full items-center border-b-8 pb-4 border-[#F9C817]">
          <div className="text-black mx-8 flex justify-between w-full items-center">
            <div className="flex items-center">
              <img src={LogoApp} className="flex w-36 " alt="" />
              <img src={TextApp} className="flex w-36 " alt="" />
            </div>
            <div className="text-black mx-8 flex justify-between gap-4">
              <Link className="font-bold" to={"/kelola-invoice"}>
                Kelola Tagihan
              </Link>
              <button className="font-bold" onClick={() => setOpenModal(true)}>
                Akun
              </button>
              <Link className="font-bold" to={"/vendor"}>
                + Vendor
              </Link>
              <Link className="font-bold" to={"/departemen"}>
                + Departemen
              </Link>
              <Link className="font-bold" to={"/gl"}>
                + Gl
              </Link>
              <button className="font-bold" onClick={logout}>
                {" "}
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
