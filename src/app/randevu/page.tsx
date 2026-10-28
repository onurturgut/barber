import { BookingFlow } from "@/components/booking/BookingFlow";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ hizmet?: string; berber?: string }>;
}) {
  const { hizmet, berber } = await searchParams;
  return (
    <main className="min-h-screen bg-ink pt-32 md:pt-40">
      <div className="shell pb-10">
        <div className="micro flex items-center gap-4 text-muted-foreground">
          <span className="text-primary">05</span>
          <span className="h-px w-10 bg-current" />
          BOOK NOW
        </div>
        <h1 className="font-display text-giant mt-6">
          RANDEVU<span className="text-primary">.</span>
        </h1>
        <p className="micro mt-4 text-muted-foreground">
          DEMO ARAYÜZ — GERÇEK REZERVASYON OLUŞTURULMAZ.
        </p>
        <div className="mt-14">
          <BookingFlow initialService={hizmet} initialBarber={berber} />
        </div>
      </div>
    </main>
  );
}
