import { useEffect, useState } from "react";

const easeOut = (t: number) => 1 - (1 - t) ** 3;

export function useCountUp(target: number, duration = 1200, delay = 400) {
	const [value, setValue] = useState(0);

	useEffect(() => {
		let rafId: number;
		const timeoutId = setTimeout(() => {
			const startTime = performance.now();
			const tick = (now: number) => {
				const progress = Math.min((now - startTime) / duration, 1);
				setValue(Math.round(easeOut(progress) * target));
				if (progress < 1) rafId = requestAnimationFrame(tick);
			};
			rafId = requestAnimationFrame(tick);
		}, delay);

		return () => {
			clearTimeout(timeoutId);
			cancelAnimationFrame(rafId);
		};
	}, [target, duration, delay]);

	return value;
}
