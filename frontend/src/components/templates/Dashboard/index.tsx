import Loader from "@/components/atoms/Loader";
import Navbar from "@/components/organisms/Navbar";
import UsersDashboard from "@/components/organisms/Users_Dashboard";

interface IProps {
  loading: boolean;
}

export default function DashboardTemplate({ loading }: IProps) {
  if (loading) {
    return <Loader />;
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
