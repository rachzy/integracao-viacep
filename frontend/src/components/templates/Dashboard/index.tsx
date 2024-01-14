import Navbar from "@/components/organisms/Navbar";
import UsersDashboard from "@/components/organisms/Users_Dashboard";
import { IUser } from "@/interfaces/User";
import { CircularProgress } from "@mui/material";

interface IProps {
  users: IUser[];
  loading: boolean;
}

export default function DashboardTemplate({ users, loading }: IProps) {
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <div
      className="hold-transition sidebar-full"
      style={{ height: "100vh" }}
    >
      <div className="wrapper">
        <Navbar />
        <UsersDashboard users={users} />
      </div>
    </div>
  );
}
