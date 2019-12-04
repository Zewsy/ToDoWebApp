# Index és App, alapvető felépítés
A React alkalmazás az **index.js** fájlból indul ki.
Az alkalmazás két fontos komponensbe csomagolja be a vázat leíró App komponenst:
 - **BrowserRouter**: A routingot biztosítja. A react-router-dom csomag része.
 - **Provider**: A belső komponensek számára elérhetővé teszi a redux store-t. A react-redux csomag része.

Az **App** a **Switch**-en belül hozza létre az alkalmazásban fellelhető **Route**-okat.

 - /: A *ProjectTable*, mint home képernyő.
 - /create-project: *CreateProject* képernyő
 - /tasks: *TaskBoard* által megjelenített teendők képernyője
