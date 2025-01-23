import BeatUploader from "@/components/BeatUploader";

export const BeatUploadSection = () => {
  // For demo purposes, you would typically get this from your auth state
  const isPremiumUser = true;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Beat Upload Studio</h2>
        <p className="text-muted-foreground">
          Share your beats with the world {isPremiumUser ? 'with custom visualizers' : ''}
        </p>
      </div>

      <BeatUploader isPremium={isPremiumUser} />
    </div>
  );
};