import { expect, test } from "@playwright/test";
import { createTestAccount } from "./utils/auth-test";

test.describe("admin", () => {
  test("verify admin dashboard work", async ({ page }) => {
    await createTestAccount({
      page,
      callbackURL: "/app",
      admin: true,
    });

    await page.goto("/admin");

    // i18n: "Users" (EN) / "Utilisateurs" (FR)
    await expect(
      page.getByRole("link", { name: /Users|Utilisateurs/i }),
    ).toBeVisible();

    // i18n: "Feedback" (EN) / "Retours" (FR)
    await expect(
      page.getByRole("link", { name: /Feedback|Retours/i }).first(),
    ).toBeVisible();

    await page.getByRole("link", { name: /Users|Utilisateurs/i }).click();

    await expect(page).toHaveURL("/admin/users");

    await page
      .getByRole("link", { name: /Feedback|Retours/i })
      .first()
      .click();
    await expect(page).toHaveURL("/admin/feedback");
  });
});
