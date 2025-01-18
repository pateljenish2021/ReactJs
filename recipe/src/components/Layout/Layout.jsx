

import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Routers'
// import RecipeUploadForm from '../../pages/RecipeUploadForm'
// import EditRecipePage from '../../pages/EditRecipePage';



const Layout = () => {


  return( 
  <>
     <Header/>
     {/* <EditRecipePage/> */}
    <div>
        <Routers/>
    </div>
    <Footer/>
  </>
  )
}

export default Layout