Module.register("MMM-LifeCalendar", {
  defaults: {
    weeksPerYear: 52,
    totalYears: 125,
    birthdate: "2000-01-01",
    colorScheme: "gray", // Add this line for color scheme
    duration_events: [
      { event_text: "Birth", duration_years: 0, duration_weeks: 0 },
      { event_text: "Early Years", duration_years: 6, duration_weeks: 0 },
      { event_text: "Elementary", duration_years: 6, duration_weeks: 0 },
      { event_text: "Middle School", duration_years: 2, duration_weeks: 0 },
      { event_text: "High School", duration_years: 4, duration_weeks: 0 },
      { event_text: "College", duration_years: 7, duration_weeks: 0 },
      { event_text: "Career", duration_years: 40, duration_weeks: 0 },
      { event_text: "Retirement", duration_years: 20, duration_weeks: 0}
    ],
    date_events: [
      { event_text: "Birth", date: "1996-11-14", duration_weeks: 0 },
      { event_text: "Graduated High School", date: "2015-06-20", duration_weeks: 0 },
      { event_text: "Submitted Thesis", date: "2023-12-11", duration_weeks: 0 },
      { event_text: "Started Career", date: "2024-06-01", duration_weeks: 0 },
      { event_text: "Retirement", date: "2056-06-01", duration_weeks: 0 },
    ],
  },

  getHeader: function () {
    return "Life Calendar";
  },

  getScripts: function () {
    return ["moment.js"];
  },

  getStyles: function () {
    return ["MMM-LifeCalendar.css"];
  },

  getDate: function () {
    var date = moment();
    return date;
  },

  getAge: function () {
    var date = this.getDate();
    var birthdate = moment(this.config.birthdate); // Use configurable birthdate
    var age = date.diff(birthdate, "weeks");
    return age;
  },

  start: function () {
    Log.info("Starting module: " + this.name);
    Log.info("Current date: " + this.getDate());
    Log.info("Age: " + this.getAge());
  },

  getDom: function () {
    const wrapper = document.createElement("div");
    wrapper.className = "bright medium";

    const ageText = document.createElement("div");
    ageText.innerHTML = "You are " + this.getAge() + " weeks old.";
    wrapper.appendChild(ageText);
    const weeksLived = this.getAge();

    // Create a moment object for the date of birth
    var dob = moment(this.config.birthdate);

    // Loop through each event in the date_events array
    for (let i = 0; i < this.config.date_events.length; i++) {
      // Create a moment object for the event date
      var event = moment(this.config.date_events[i].date);
      // Calculate the duration in weeks between the date of birth and the event date
      this.config.date_events[i].duration_weeks = event.diff(dob, 'weeks');
    }

    for (let i = 1; i < this.config.duration_events.length; i++) {
      this.config.duration_events[i].duration_weeks = this.config.duration_events[i].duration_years * this.config.weeksPerYear;
      if (i > 1) {
        this.config.duration_events[i].duration_weeks += this.config.duration_events[i - 1].duration_weeks;
      }
    }

    // Create container for headers and grid
    const container = document.createElement("div");
    container.className = "grid-container-wrapper";

    // Create grid container for year numbers and weeks
    const grid = document.createElement("div");
    grid.className = "grid-container";
    grid.style.gridTemplateColumns = `auto repeat(${this.config.weeksPerYear}, auto)`; // Include extra column for year numbers
    grid.style.gridTemplateRows = `auto auto repeat(${this.config.totalYears}, auto)`; // Include extra rows for "Weeks" header and week numbers

    // Add "Weeks" text to the first row
    const weekHeader = document.createElement("div");
    weekHeader.className = "week-header";
    weekHeader.innerHTML = "Weeks";
    weekHeader.style.gridRow = 1;
    weekHeader.style.gridColumn = "2 / span 52"; // Span all columns starting from the second column
    grid.appendChild(weekHeader);

    // Add week numbers to the second row
    for (let i = 1; i <= this.config.weeksPerYear; i++) {
      const weekNumber = document.createElement("div");
      weekNumber.className = "week-number";
      weekNumber.innerHTML = i; // Adds a space for single-digit weeks
      weekNumber.style.gridRow = 2;
      weekNumber.style.gridColumn = i + 1; // Aligns week numbers with the columns, offset by 1
      grid.appendChild(weekNumber);
    }

    // Add year numbers and week cells to the grid
    for (let i = 0; i < this.config.totalYears; i++) {
      const yearNumber = document.createElement("div");
      yearNumber.className = "year-number";
      yearNumber.innerHTML = i;
      yearNumber.style.gridRow = i + 3; // Aligns year numbers with the rows, offset by 2 for "Weeks" header and week numbers
      yearNumber.style.gridColumn = 1;
      grid.appendChild(yearNumber);

      for (let j = 0; j < this.config.weeksPerYear; j++) {
        const cell = document.createElement("div");
        cell.className = "week-cell";
        cell.style.gridRow = i + 3;
        cell.style.gridColumn = j + 2;

        let colorSchemeSuffix = this.config.colorScheme === "gray" ? "_gray" : "";

        if (i * this.config.weeksPerYear + j < this.config.duration_events[1].duration_weeks) {
          cell.classList.add("early_years" + colorSchemeSuffix);
        } else if (i * this.config.weeksPerYear + j < this.config.duration_events[2].duration_weeks) {
          cell.classList.add("elementary_years" + colorSchemeSuffix);
        } else if (i * this.config.weeksPerYear + j < this.config.duration_events[3].duration_weeks) {
          cell.classList.add("middle_school_years" + colorSchemeSuffix);
        } else if (i * this.config.weeksPerYear + j < this.config.duration_events[4].duration_weeks) {
          cell.classList.add("high_school_years" + colorSchemeSuffix);
        } else if (i * this.config.weeksPerYear + j < this.config.duration_events[5].duration_weeks) {
          cell.classList.add("college_years" + colorSchemeSuffix);
        } else if (i * this.config.weeksPerYear + j < this.config.duration_events[6].duration_weeks) {
          cell.classList.add("career_years" + colorSchemeSuffix);
        } else if (i * this.config.weeksPerYear + j < this.config.duration_events[7].duration_weeks) {
          cell.classList.add("retirement_years" + colorSchemeSuffix);
        }

        if (i * this.config.weeksPerYear + j === weeksLived) {
          cell.classList.add("current_week" + colorSchemeSuffix);
        }

        // Loop over all date_events
        this.config.date_events.forEach(event => {
          if (i * this.config.weeksPerYear + j === event.duration_weeks) {
            const tooltip = document.createElement("div");
            tooltip.className = "tooltip";
            tooltip.innerHTML = event.event_text;

            const tooltipContainer = document.createElement("div");
            tooltipContainer.className = "tooltip-container";
            tooltipContainer.appendChild(tooltip);
            cell.appendChild(tooltipContainer);

            // Adjusting the tooltip container to center the tooltip
            tooltipContainer.style.position = "absolute";
            tooltipContainer.style.top = "100%"; // Position the container just below the cell
            tooltipContainer.style.left = "50%";
            tooltipContainer.style.transform = "translateX(-50%)";
          }
        });

        // Set the background color to black if the week number is larger than the current weeks lived
        if (i * this.config.weeksPerYear + j > weeksLived) {
          cell.style.backgroundColor = "black";
        }

        grid.appendChild(cell);
      }
    }

    container.appendChild(grid);
    wrapper.appendChild(container);
    return wrapper;
  },
});
