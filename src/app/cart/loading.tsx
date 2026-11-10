import DukkaLoader from "@/components/ui/dukka_loader";

export default function Loading() {
    return (
        <main className="pt-[120px] sm:pt-[130px] lg:pt-[230px] xl:pt-[270px]">
            <DukkaLoader variant="page" label="Loading cart" />
        </main>
    );
}
