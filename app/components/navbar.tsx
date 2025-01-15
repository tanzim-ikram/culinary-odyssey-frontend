import React from "react";
import Image from "next/image";

const navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Image
                    src="/co-logo.png"
                    width={80}
                    height={80}
                    alt="Culinary Odyssey Logo"
                />
                <a
                    className="btn btn-ghost text-xl"
                    style={{
                        fontFamily: '"Bayon", sans-serif',
                        fontSize: "48px",
                        color: "#C4986A",
                    }}
                >
                    Culinary Odyssey
                </a>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <a>Link</a>
                    </li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="bg-base-100 rounded-t-none p-2">
                                <li>
                                    <a>Link 1</a>
                                </li>
                                <li>
                                    <a>Link 2</a>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default navbar;
