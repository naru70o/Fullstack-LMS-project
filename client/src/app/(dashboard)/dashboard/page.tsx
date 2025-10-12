import { Sidebar } from "../../../components/side-bar";

export default function page() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Dashboard Content</h1>
        <p className="mt-2 text-muted-foreground">
          Your main content goes here
        </p>
      </main>
    </div>
  );
}
