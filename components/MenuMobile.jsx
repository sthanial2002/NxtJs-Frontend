"use client";
import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

const menuItems = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "/contact" },
];

const MenuMobile = ({ showCatMenu, setShowCatMenu, setMobileMenu, categories }) => {
    return (
        <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black z-50">
            {menuItems.map((item) => (
                <React.Fragment key={item.id}>
                    {item.subMenu ? (
                        <li
                            className="cursor-pointer py-4 px-5 border-b flex flex-col"
                            onClick={() => setShowCatMenu((prev) => !prev)}
                        >
                            <div className="flex justify-between items-center">
                                {item.name}
                                <BsChevronDown size={14} />
                            </div>

                            {showCatMenu && (
                                <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                                    {categories?.map((category) => {
                                        const { id, name, slug, products } = category;

                                        return (
                                            <li key={id} className="border-t">
                                                <Link
                                                    href={`/category/${slug}`}
                                                    onClick={() => {
                                                        setShowCatMenu(false);
                                                        setMobileMenu(false);
                                                    }}
                                                    className="flex justify-between px-8 py-4"
                                                >
                                                    {name}
                                                    <span className="opacity-50 text-sm">
                                                        ({products?.length || 0})
                                                    </span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                    ) : (
                        <li className="py-4 px-5 border-b">
                            <Link href={item.url} onClick={() => setMobileMenu(false)}>
                                {item.name}
                            </Link>
                        </li>
                    )}
                </React.Fragment>
            ))}
        </ul>
    );
};

export default MenuMobile;
