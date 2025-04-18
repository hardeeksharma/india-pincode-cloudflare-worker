
// export default {
// 	async fetch(request, env, ctx): Promise<Response> {
// 		return new Response('Hello World!');
// 	},
// } satisfies ExportedHandler<Env>;

import { z } from "zod";

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const pincode = url.pathname.split("/api/pincode/")[1];

		// Define Zod schema
		const pincodeSchema = z.object({
			pincode: z
				.string()
				.length(6, "Pincode must be exactly 6 digits")
				.regex(/^\d+$/, "Pincode must contain only numeric digits"),
		});

		try {
			// Validate the pincode
			pincodeSchema.parse({ pincode });

			// Fetch pincode details from the API
			const apiResponse = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
			const data: any = await apiResponse.json();

			if (data[0].Status === "Success") {
				const details = data[0].PostOffice[0];
				console.log(details);
				return new Response(
					JSON.stringify({
						success: true,
						pincode,
						city: details.District,
						state: details.State,
					}),
					{
						headers: { "Content-Type": "application/json"},
						status: 200,
					}
				);
			} else {
				return new Response(JSON.stringify({ success: false, message: "Pincode not found" }), {
					headers: { "Content-Type": "application/json" },
					status: 404,
				});
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				// Handle Zod validation errors
				return new Response(
					JSON.stringify({ success: false, errors: error.errors }),
					{ headers: { "Content-Type": "application/json" }, status: 400 }
				);
			}

			return new Response(JSON.stringify({ success: false, error: error }), {
				headers: { "Content-Type": "application/json" },
				status: 500,
			});
		}
	},
} satisfies ExportedHandler<Env>;