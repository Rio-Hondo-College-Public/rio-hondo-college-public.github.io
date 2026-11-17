

function urlSwitch(elementId, urlTest) {
	const bannerLink = document.getElementById(elementId);
	if (!bannerLink) return;

	function getParentContext() {
		const referrer = document.referrer;
		if (referrer) {
			return { url: referrer, method: "Referrer" };
		}

		const params = new URLSearchParams(window.location.search);
		const parentUrlParam = params.get("parentUrl");
		if (parentUrlParam) {
			return { url: parentUrlParam, method: "URL Parameter" };
		}
		return {
			url: window.location.href,
			method: "Fallback, Current URL (window.location.href)",
		};
	}

	function getEnv(parentUrl) {
		try {
			const host = new URL(parentUrl).hostname.toLowerCase();
			if (host === "experience-test.elluciancloud.com") return "Test";
			if (host === "experience.elluciancloud.com") return "Prod";
			return "Unknown";
		} catch {
			return "Unknown";
		}
	}

	const { url: finalParentUrl } = getParentContext();
	const env = getEnv(finalParentUrl);

	// Only override the link if Test environment
	if (env === "Test") {
		bannerLink.href = urlTest;
	}
}

function showNewRibbon() {
	const ribbon = document.querySelector(".new-ribbon");
	if (!ribbon) return;
	// const heroElement = document.querySelector(".hero[data-created]");
	// if (!heroElement) return;

	const createdDateStr = ribbon.getAttribute("data-created");
	const createdDate = new Date(createdDateStr);
	const today = new Date();

	// Calculate difference in days
	const timeDiff = today - createdDate;
	const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

	// Show ribbon if within 15 days
	if (daysDiff < 15) {
		if (ribbon) {
			ribbon.textContent = "NEW";
			ribbon.classList.add("show");
			// Prevent scrolling when the new ribbon is shown
			document.body.style.overflowX = "hidden"; 
		}
	}
}
