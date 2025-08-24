import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";

export default async function AppBillingPage() {
  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Billing</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:gap-8">
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Subscription & Billing</h3>
          <p className="text-muted-foreground mt-2">
            Manage your subscription and billing information.
          </p>
        </div>
      </LayoutContent>
    </Layout>
  );
}
