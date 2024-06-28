import { CountryTable } from "@/widgets/country/country-table/ui/CountryTable";
import { PageLayout } from "@/core/layouts/page-layout/PageLayout";
import { COUNTRIES_QUERY_KEY, getAllCountries } from "@/api/country";
import { getQueryClient } from "@/core/providers/tanstack-query/utils/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function CountryList() {
	const queryClient = getQueryClient();
	const countries = await queryClient.prefetchQuery({
		queryKey: [COUNTRIES_QUERY_KEY],
		queryFn: getAllCountries,
	});

	console.log(queryClient);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PageLayout>
				<CountryTable />
			</PageLayout>
		</HydrationBoundary>
	);
}
