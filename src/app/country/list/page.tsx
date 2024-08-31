import { PageLayout } from "config/layouts/page-layout/PageLayout";
import { CountryTable } from "widgets/country/country-table/ui/CountryTable";
import {
	COUNTRIES_PAGINATED_QUERY_KEY,
	getPaginatedCountries,
} from "entities/country";
import { getQueryClient } from "config/providers/tanstack-query/lib/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
//import { getUrlParamsServer } from "shared/lib/urlServer";

export default async function CountryList() {
	/* const params = getUrlParamsServer();
	const page = params["page"] ?? "1";
	const limit = params["limit"] ?? "10"; */

	const params = { page: "1", limit: "10" };

	const queryClient = getQueryClient();
	await queryClient.prefetchQuery({
		queryKey: [COUNTRIES_PAGINATED_QUERY_KEY, params],
		queryFn: async () => {
			return await getPaginatedCountries(params);
		},
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PageLayout>
				<CountryTable />
			</PageLayout>
		</HydrationBoundary>
	);
}
