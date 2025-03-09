// AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CrudMain from "./CrudMain";
import CrudForm from "./CrudForm";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CrudMain />} />
        <Route path="/edit/:id" element={<CrudForm />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
