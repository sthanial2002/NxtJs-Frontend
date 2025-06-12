import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

const menuItems = [
    /* { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Contact", url: "/contact" }, */
];

const Menu = ({ showCatMenu, setShowCatMenu, categories }) => {
    return (
        <ul className="hidden md:flex items-center gap-8 font-medium text-black">
            {menuItems.map((item) => (
                <React.Fragment key={item.id}>
                    {item.subMenu ? (
                        <li
                            className="cursor-pointer relative flex items-center gap-2"
                            onMouseEnter={() => setShowCatMenu(true)}
                            onMouseLeave={() => setShowCatMenu(false)}
                        >
                            {item.name}
                            <BsChevronDown size={14} />

                            {showCatMenu && (
                                <ul className="absolute top-full left-0 mt-2 min-w-[250px] bg-white shadow-md rounded-md py-2 z-50">
                                    {categories?.data?.length > 0 ? (
                                        categories.data.map((cat) => (
                                            <Link
                                                key={cat.id}
                                                href={`/category/${cat.slug}`}
                                                onClick={() =>
                                                    setShowCatMenu(false)
                                                }
                                            >
                                                <li className="px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between">
                                                    {cat.name}
                                                </li>
                                            </Link>
                                        ))
                                    ) : (
                                        <li className="px-4 py-2 text-gray-500">
                                            Aucune catégorie trouvée.
                                        </li>
                                    )}
                                </ul>
                            )}
                        </li>
                    ) : (
                        <li>
                            <Link href={item.url}>{item.name}</Link>
                        </li>
                    )}
                </React.Fragment>
            ))}
        </ul>
    );
};

export default Menu;
