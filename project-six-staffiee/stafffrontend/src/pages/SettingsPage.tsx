import { Settings } from "lucide-react";

function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}{" "}
      <div>
        {" "}
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          {" "}
          <Settings className="h-6 w-6 text-primary" />{" "}
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Settings
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
          Manage system settings and future features.
        </p>
      </div>
      {/* Coming Soon */}
      <section className="flex min-h-64 items-center justify-center rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-8">
        <div>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Settings className="h-7 w-7 text-primary" />
          </div>

          <h2 className="mt-5 text-xl font-semibold">
            More Features Coming Soon
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            More features and system settings will be added here in future
            updates.
          </p>
        </div>
      </section>
    </div>
  );
}

export default SettingsPage;
