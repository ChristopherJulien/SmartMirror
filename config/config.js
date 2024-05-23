let config = {
	address: "localhost",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
									// you must set the sub path here. basePath must end with a /
	ipWhitelist: [],	// Set [] to allow all IP addresses
									// or add a specific IPv4 of 192.168.1.5 :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
									// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "MMM-LifeCalendar",
			position: "top_center",
			config: {
				totalYears: 125,
				birthdate: "1996-11-14", // error on 2019,2013, In a standard year: 365 \div 7 \approx 52.142857365÷7≈52.142857 weeks. In a leap year: 366 \div 7 \approx 52.285714366÷7≈52.285714 weeks.
    			
				duration_events: [
					{ event_text: "Birth", duration_years: 0 , duration_weeks: 0},
					{ event_text: "Early Years", duration_years: 7 , duration_weeks: 0},
					{ event_text: "Elementary", duration_years: 6 , duration_weeks: 0},
					{ event_text: "Middle School", duration_years: 2, duration_weeks: 0 },
					{ event_text: "High School", duration_years: 4, duration_weeks: 0 },
					{ event_text: "College", duration_years: 7 , duration_weeks: 0},
					{ event_text: "Career", duration_years: 40, duration_weeks: 0},
					{ event_text: "Retirement", duration_years: 20, duration_weeks: 0}
				  ],

				date_events: [
					{ event_text: "Birth", date: "1996-11-14" , duration_weeks: 0},
					{ event_text: "Graduated High School", date: "2015-06-20", duration_weeks: 0 },
					{ event_text: "Submited Thesis", date: "2023-12-11", duration_weeks: 0 },
					{ event_text: "Started Career", date: "2024-06-01", duration_weeks: 0 },
					{ event_text: "Retirement", date: "2056-06-01",	duration_weeks: 0 },
					{ event_text: "Body Ratio 1.6", date: "2024-12-12",	duration_weeks: 0 },
					{ event_text: "Marathon", date: "2026-12-12",	duration_weeks: 0 },
					{ event_text: "Triathlon", date: "2028-12-12",	duration_weeks: 0 },
					{ event_text: "Swiss Male Life Expectancy", date: "2079-07-02",	duration_weeks: 0 },
				],

			  
			}
		}		
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
