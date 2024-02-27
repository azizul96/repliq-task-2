"use client"
import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect, useState } from "react";
import CommonModal from "../CommonModal/CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal/CartModal";
import { FaCartPlus } from "react-icons/fa6";
import { getAllCartItems } from "@/services/cart";


const NavItem = ({isModalView = false, isAdminView, router}) => {

    return (
        <div className={`items-center justify-between w-full md:flex md:w-auto ${isModalView ? "" : "hidden"}`} id="nav-items">
            <ul className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${isAdminView ? "border-none" : "border border-gray-100" }`}>
            {
                isAdminView ? adminNavOptions.map(item => <li key={item.id} className="cursor-pointer block py-2 pl-3  pr-4 text-gray-900 rounded md:p-0 "
                onClick={()=>router.push(item.path)}
                > 
                {item.label}
                </li>) 
                : navOptions.map(item => <li key={item.id} className="cursor-pointer block py-2 pl-3  pr-4 text-gray-900 rounded md:p-0 "
                onClick={()=>router.push(item.path)}
                > 
                {item.label}
                </li>)
            }
            </ul>
        </div>
    )
}
const Navbar = () => {

    const {user, isAuthUser, setIsAuthUser, setUser, currentUpdatedProduct, setCurrentUpdatedProduct, showNavModal, setShowNavModal, showCartModal, setShowCartModal, cartItems} = useContext(GlobalContext);

    const pathName = usePathname()
    const router = useRouter();


    console.log( user , isAuthUser );

    useEffect(() => {
        if (
          pathName !== "/admin-view/add-product" &&
          currentUpdatedProduct !== null
        )
          setCurrentUpdatedProduct(null);
    }, [pathName]);

    const handleLogout = ()=>{
        setIsAuthUser(false)
        setUser(null)
        Cookies.remove('token')
        localStorage.clear()
        router.push('/')
    }

    const isAdminView = pathName.includes('admin-view')
    return (
        <>
        <nav className="bg-white w-full z-20 top-0 left-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div onClick={()=>router.push('/')} className="flex items-center cursor-pointer ">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap"><span className="text-[#C70039]">E-</span>Shop</span>
                </div>
                <div className="flex md:order-2 gap-2 ">
                    {
                        !isAdminView && isAuthUser ? (
                            <Fragment>
                                {/* <button className={"mt-1.5 inline-block bg-[#C70039] px-5 py-2 text-xs font-medium uppercase tracking-wide text-white rounded-sm"}>Account</button> */}
                                <button className={"mt-1.5  px-5 py-2 text-sm font-medium uppercase tracking-wide text-[#C70039] rounded-sm flex gap-1 "}
                                onClick={()=> setShowCartModal(true)}
                                ><FaCartPlus/>{cartItems.length}</button>
                            </Fragment>
                        ) : null
                    }
                    {
                        user?.role === 'admin' ?
                            isAdminView ? <button className={"mt-1.5 inline-block bg-[#C70039] px-5 py-2 text-xs font-medium uppercase tracking-wide text-white rounded-sm"}
                            onClick={()=>router.push('/')}
                            >Client View</button> 
                            : <button className={"mt-1.5 inline-block bg-[#C70039] px-5 py-2 text-xs font-medium uppercase tracking-wide text-white rounded-sm"}
                            onClick={()=>router.push('/admin-view')}
                            >
                                Admin View
                            </button>
                            : null
                    }
                    {
                        isAuthUser ? <button 
                        className={"mt-1.5 inline-block bg-[#C70039] px-5 py-2 text-xs font-medium uppercase tracking-wide text-white rounded-sm"} 
                        onClick={handleLogout}
                        >
                            Logout
                        </button> 
                        : 
                        <button className={"mt-1.5 inline-block bg-[#C70039] px-5 py-2 text-xs font-medium uppercase tracking-wide text-white rounded-sm"}
                        onClick={()=> router.push('/login')}
                        >
                            Login
                        </button>
                    }
                    <button
                    data-collapse-toggle="navbar-sticky"
                    type="button"
                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-sticky"
                    aria-expanded="false"
                    onClick={() => setShowNavModal(true)}
                    >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                        ></path>
                    </svg>
                    </button>
                </div>
                <NavItem isAdminView={isAdminView} router={router}/>
            </div>
        </nav>
        <CommonModal 
        showModalTitle={false}
        mainContent={<NavItem isModalView={true}  isAdminView={isAdminView} router={router}/>}
        show={showNavModal} 
        setShow={setShowNavModal}
        />
        {showCartModal && <CartModal />}
        </>
    );
};

export default Navbar;