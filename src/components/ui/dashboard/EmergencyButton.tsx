import Button from "@/components/ui/button";
import { useResolveEmergency } from "@/hooks/tanstack/mutations/emergency/useResolveEmergency";

type EmergencyButtonProps = {
  emergencyId: string;
  isActive: boolean;
};

export default function EmergencyButton({
  emergencyId,
  isActive,
}: EmergencyButtonProps) {
  const { resolveEmergency, resolveEmergencyPending } = useResolveEmergency();
  return (
    <Button
      variant={isActive ? "active" : "resolved"}
      disabled={resolveEmergencyPending}
      onClick={async () => {
        await resolveEmergency(emergencyId);
      }}
    >
      {resolveEmergencyPending
        ? "Resolving..."
        : isActive
          ? "Active"
          : "Resolved"}
    </Button>
  );
}
