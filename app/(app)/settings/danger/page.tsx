import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";

export default async function AppDangerPage() {
  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Danger Zone</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:gap-8">
        <div className="rounded-lg border border-red-200 p-6">
          <h3 className="text-lg font-semibold text-red-900">Danger Zone</h3>
          <p className="text-muted-foreground mt-2">
            Irreversible and destructive actions.
          </p>
        </div>
      </LayoutContent>
    </Layout>
  );
}
