import References from "@/components/References";
import { GLP1_DISCLAIMER, GLP1_LAST_UPDATED, GLP1_SOURCES } from "@/lib/glp1-sources";

// References block shared by the GLP-1 calculator and guide.
export default function Glp1References({ path }: { path: string }) {
  return (
    <References sources={GLP1_SOURCES} lastUpdated={GLP1_LAST_UPDATED} disclaimer={GLP1_DISCLAIMER} path={path} />
  );
}
