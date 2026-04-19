import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiBook, FiPackage } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4 mt-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard 
            size={30}
            color={`${active === 1 ? "#4444AC" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[#4444AC]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 mt-4">
        <Link to="/dashboard-products" className="w-full flex items-center">
          <FiBook size={30} color={`${active === 3 ? "#4444AC" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[#4444AC]" : "text-[#555]"
            }`}
          >
            Meus anúncios
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 mt-4">
        <Link
          to="/dashboard-create-product"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30} 
            color={`${active === 4 ? "#4444AC" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[#4444AC]" : "text-[#555]"
            }`}
          >
            Criar anúncio
          </h5>
        </Link>
      </div>


      <div className="w-full flex items-center p-4 mt-4">
        <Link to="/dashboard-messages" className="w-full flex items-center">
          <BiMessageSquareDetail
            size={30}
            color={`${active === 8 ? "#4444AC" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[#4444AC]" : "text-[#555]"
            }`}
          >
            Mensagens
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 mt-4">
        <Link to="/settings" className="w-full flex items-center">
          <CiSettings
            size={30}
            color={`${active === 11 ? "#4444AC" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? "text-[#4444AC]" : "text-[#555]"
            }`}
          >
            Configurações
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;