import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="thanh-pho/:cityId" element={<Home />} />
        <Route path="gioi-thieu" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
