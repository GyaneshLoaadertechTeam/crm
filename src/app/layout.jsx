// components/RootLayout.js

'use client'
import AuthProvider from "./Providers";
import NavPage from "./navbar/page";
import Sidebar from "./sidebar/page";
import 'bootstrap/dist/css/bootstrap.css';
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
    const pathname = usePathname();

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '95vh',
        // width: '95%',
        // backgroundColor: 'white',
        paddingTop: '65px',
        borderRadius: '190px',
    };
    
    const sidBarStyle = {
        padding: "35px"
    }

    const bodyColor = {
        backgroundColor: 'oldlace'
    }

    return (
        <html lang="en" suppressHydrationWarning={true} >
            <body style={bodyColor}>
                 <AuthProvider>  {pathname !== "/login" && (
                        <>
                            <header>
                                <NavPage />
                            </header>
                            <div className="">
                                <div className="row">
                                    <div className="col-md-2 col-lg-2 col-xl-2">
                                        <div style={sidBarStyle}>
                                            <Sidebar />
                                        </div>
                                    </div>
                                    <div style={sidBarStyle} className="col-md-10 col-lg-10 col-xl-10">
                                        <div>
                                            {children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {/* This block will only show when the pathname is /login */}
                    {pathname === "/login" && (
                        <div style={containerStyle}>
                            {children} {/* You can still include the children if needed */}
                        </div>
                    )}
                   
                </AuthProvider>
            </body>
        </html>
    )
}
