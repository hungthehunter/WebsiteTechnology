import { Fragment } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { DefaultLayout } from "./Component/Layout";
import { publicRoutes } from "./routes";

function App() {
  return (
   
    <Router >
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                path={route.path}
                key={index}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
