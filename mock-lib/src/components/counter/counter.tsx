import { component$, useSignal } from "@builder.io/qwik";

export const Counter = component$(() => {
	const count = useSignal(0);

	return (
		<div class="bg-red-500">
			<p>Count: {count.value}</p>
			<p>
				<button onClick$={() => count.value++}>Increment</button>
			</p>
		</div>
	);
});
