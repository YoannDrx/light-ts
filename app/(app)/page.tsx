import { buttonVariants } from "@/components/ui/button";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import Link from "next/link";

export default async function AppDashboardPage() {
  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Dashboard</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Link
          href="/app/settings"
          className={buttonVariants({ variant: "outline" })}
        >
          Settings
        </Link>
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:gap-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold">Welcome!</h3>
            <p className="text-muted-foreground mt-2">
              Your personal dashboard is ready to use.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold">Projects</h3>
            <p className="text-muted-foreground mt-2">
              Start creating your first project.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold">Analytics</h3>
            <p className="text-muted-foreground mt-2">
              View your usage statistics.
            </p>
          </div>
        </div>
      </LayoutContent>
    </Layout>
  );
}
