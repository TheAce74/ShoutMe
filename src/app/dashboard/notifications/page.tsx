import DashboardSection from "@/components/layout/DashboardSection";
import Notifications from "@/components/ui/dashboard/Notifications";

export default function page() {
  return (
    <DashboardSection id="notifications">
      <Notifications />
    </DashboardSection>
  );
}
