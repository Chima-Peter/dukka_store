import DukkaLoader from "@/components/ui/dukka_loader";

export default function Loading() {
    return (
        <main className="page-nav-offset">
            <DukkaLoader variant="page" label="Loading profile" />
        </main>
    );
}
