import Navbar from "@/components/organisms/Navbar";
import UsersDashboard from "@/components/organisms/Users_Dashboard";
import { CircularProgress } from "@mui/material";

interface IProps {
  loading: boolean;
}

export default function DashboardTemplate({ loading }: IProps) {
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <div className="hold-transition sidebar-full" style={{ height: "100vh" }}>
      <div className="wrapper">
        <Navbar />
        <UsersDashboard />
      </div>
    </div>
  );
}
