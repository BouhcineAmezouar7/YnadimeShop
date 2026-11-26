import Sidebar from "@/components/Dashboard/Sidebar";
import Content from "@/components/Dashboard/Content";

export default function DashboardSectionPage() {
  return <main className="grid min-h-screen bg-[#F8F9FA] lg:grid-cols-[248px_minmax(0,1fr)]"><Sidebar/><Content/></main>;
}
