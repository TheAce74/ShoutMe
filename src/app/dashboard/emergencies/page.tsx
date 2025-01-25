import DashboardSection from "@/components/layout/DashboardSection";
import Emergencies from "@/components/ui/dashboard/Emergencies";

export default function page() {
  return (
    <DashboardSection id="emergencies">
      <Emergencies />
    </DashboardSection>
  );
}
