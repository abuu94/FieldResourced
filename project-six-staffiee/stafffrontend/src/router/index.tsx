import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";

import StaffManagement from "@/pages/StaffManagement";
import StaffListPage from "@/pages/StaffListPage";
import StaffDetailPage from "@/pages/StaffDetailPage";
import StaffEditPage from "@/pages/StaffEditPage";
import StaffCreatePage from "@/pages/StaffCreatePage";
import SettingsPage from "@/pages/SettingsPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Application Layout */}
        <Route element={<AppLayout />}>
          {/* Default */}
          <Route path="/" element={<Navigate to="/staff" replace />} />

          {/* Dashboard / Management */}
          <Route path="/staff" element={<StaffManagement />} />

          {/* Staff List */}
          <Route path="/staff/list" element={<StaffListPage />} />

          {/* Staff Create */}

          <Route path="/staff/create" element={<StaffCreatePage />} />

          {/* Staff Details */}
          <Route path="/staff/:id" element={<StaffDetailPage />} />

          {/* Staff  Edit Details */}

          <Route path="/staff/:id/edit" element={<StaffEditPage />} />

          {/* Staff  Settings Details */}
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Unknown routes */}
        <Route path="*" element={<Navigate to="/staff" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import StaffManagement from "@/pages/StaffManagement";
// import StaffListPage from "@/pages/StaffListPage";
// import StaffDetailPage from "@/pages/StaffDetailPage";

// function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/staff" replace />} />

//         <Route path="/staff" element={<StaffManagement />} />

//         <Route path="/staff/list" element={<StaffListPage />} />

//         <Route path="/staff/:id" element={<StaffDetailPage />} />

//         <Route path="*" element={<Navigate to="/staff" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AppRouter;
