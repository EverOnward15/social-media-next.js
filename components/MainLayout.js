import Sidebar from "./Sidebar"

export default function MainLayout({children,hideNavigation}) {
  let rightColumClasses = "";
  if (hideNavigation) {
    rightColumClasses += "w-full";
  }
  else {
    rightColumClasses += "mx-4 md:mx-0 md:w-3/4";
  }
    return (
      <div className="md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24 md:0">
        {!hideNavigation && (
          <div className="fixed md:static w-full bottom-0 md:w-1/4 -mb-5">
            <Sidebar></Sidebar>
          </div>
        )}
        <div className={rightColumClasses}>
            {children}
        </div>
      </div>
    );
  }