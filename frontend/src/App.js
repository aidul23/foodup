import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import Loading from "./components/Loading/Loading";
import AppRoutes from "./AppRoutes";
import { useLoading } from "./hooks/useLoading";
import { setLoadingInterceptor } from "./interceptors/loadingInterceptor";

function App() {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);

  return (
    <>
      <Loading></Loading>
      <Header></Header>
      <AppRoutes></AppRoutes>
    </>
  );
}

export default App;
