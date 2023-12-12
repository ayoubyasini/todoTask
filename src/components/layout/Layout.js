import MainSidebar from './MainSidebar';

function Layout({children}) {
  return (
    <>
        <MainSidebar />
        {children}
    </>
  )
}

export default Layout;