import { getRoleFromToken } from "@/lib/jwtHelper";
import { ACCESS_TOKEN } from "@/constants";
import AdminDashboard from "@/components/AdminDashboard";
import UserDashboard from "@/components/UserDashboard";

const RoleBaseRouting = () => {
  const access_token = localStorage.getItem(ACCESS_TOKEN)
  const role = getRoleFromToken(access_token!)

  switch (role) {
    case "Admin":
      return <AdminDashboard />;
    case "User":
      return <UserDashboard />;
    default:
      return <div>Access Denied</div>
  }
};

export default RoleBaseRouting;
