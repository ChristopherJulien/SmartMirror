let config = {
	address: "localhost",
	port: 8080,
	basePath: "/",
	ipWhitelist: [],

	useHttps: false,
	httpsPrivateKey: "",
	httpsCertificate: "",

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"],
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "MMM-LifeCalendar",
			position: "top_center",
			config: {
				totalYears: 125,
				birthdate: "1996-11-14",
				duration_events: [
					{ event_text: "Birth", duration_years: 0, duration_weeks: 0 },
					{ event_text: "Early Years", duration_years: 7, duration_weeks: 0 },
					{ event_text: "Elementary", duration_years: 6, duration_weeks: 0 },
					{ event_text: "Middle School", duration_years: 2, duration_weeks: 0 },
					{ event_text: "High School", duration_years: 4, duration_weeks: 0 },
					{ event_text: "College", duration_years: 7, duration_weeks: 0 },
					{ event_text: "Career", duration_years: 40, duration_weeks: 0 },
					{ event_text: "Retirement", duration_years: 20, duration_weeks: 0 }
				],
				date_events: [
					{ event_text: "Birth", date: "1996-11-14", duration_weeks: 0, icon_name: "heart.svg" },
					{ event_text: "Graduated High School", date: "2015-06-20", duration_weeks: 0, icon_name: "trophy2.svg" },
					{ event_text: "Submitted Thesis", date: "2023-12-11", duration_weeks: 0, icon_name: "icon.svg" },
					{ event_text: "Started Career", date: "2024-06-01", duration_weeks: 0, icon_name: "shoe.svg" },
					{ event_text: "Retirement", date: "2056-06-01", duration_weeks: 0, icon_name: "trophy.svg" },
					{ event_text: "Swiss Male Life Expectancy", date: "2079-07-02", duration_weeks: 0, icon_name: "icon.svg" }
				]
			}
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
