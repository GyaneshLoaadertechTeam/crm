
import NavPage from "./navbar/page";
import Sidebar from "./sidebar/page";
import 'bootstrap/dist/css/bootstrap.css'

export default function RootLayout({ children }){
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '95vh',
        width: '95%',
        backgroundColor: '#f0f0f0',
        paddingTop: '65px',
        borderRadius: '190px',
      };
      const sidBarStyle ={
        padding:"35px"
    }
  
    const bodyColor ={
        backgroundColor:'oldlace'
    }
    
    return(
        <html lang="en" suppressHydrationWarning={true} >
            <body style={bodyColor}>
                <header>
                <NavPage/>
               

                </header>
                <div className="">
                    <div className="row">
                    <div className="col-md-2 col-lg-2 col-xl-2 ">
                        <div style={sidBarStyle}>

                <Sidebar/>
                        </div>
                </div>
                <div style={sidBarStyle} className="col-md-10 col-lg-10 col-xl-10">
                    <div>
                    {children}

                    </div>

                </div>

                    </div>
                </div>
               

            </body>

        </html>
    )
}