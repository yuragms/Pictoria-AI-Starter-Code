import { getCredits } from '@/app/actions/credit-actions';
import { getImages } from '@/app/actions/image-actions';
import { fetchModels } from '@/app/actions/model-actions';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentImages from '@/components/dashboard/RecentImages';
import RecentModels from '@/components/dashboard/RecentModels';
import StatsCards from '@/components/dashboard/StatsCards';
import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: models, count: modelCount } = await fetchModels();

  const { data: credits } = await getCredits();
  const { data: images } = await getImages();

  const imageCount = images?.length || 0;
  return (
    <section className="container mx-auto flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.user_metadata.full_name}
        </h2>
      </div>
      <StatsCards
        imageCount={imageCount}
        modelCount={modelCount}
        credits={credits}
      />
      <div className="grid gap-6 grid-cols-4">
        <RecentImages images={images?.slice(0, 6) ?? []} />
        <div className="h-full flex flex-col space-y-6">
          <QuickActions />
          <RecentModels models={models ?? []} />
        </div>
      </div>
      {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div> */}
    </section>
  );
}
