import CtaButton from "@/components/CtaButton";

export const HITPROTEIN_DOWNLOAD = "https://hitprotein.com.au/download";

// The black "track it in HitProtein" box used at the end of food pages and
// the high protein foods hub.
export default function TrackProteinCta() {
  return (
    <div className="mt-12 rounded-card bg-pt-black p-8 text-center text-pt-white">
      <p className="font-heading text-xl font-bold">Know what you&apos;re eating. Know your protein.</p>
      <p className="mt-2 text-sm text-pt-white/70">
        HitProtein logs your food and tracks it against your daily target automatically.
      </p>
      <div className="mt-5 flex justify-center">
        <CtaButton href={HITPROTEIN_DOWNLOAD}>Track Your Protein With HitProtein</CtaButton>
      </div>
    </div>
  );
}
