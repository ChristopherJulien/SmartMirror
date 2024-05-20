Module.register("MMM-LifeCalendar", {
  defaults: {
    weeksPerYear: 52,
    totalYears: 120,
    birthdate: "2000-01-01",
    earlyYears: 6,
    elementaryYears: 6,
    middleSchoolYears: 2,
    highSchoolYears: 4,
    collegeYears: 7,
    careerYears: 40,
  },

  getHeader: function () {
    return "Life Calendar";
  },

  // Define required scripts.
  getScripts: function () {
    return ["moment.js"];
  },

  // Define styles.
  getStyles: function () {
    return ["MMM-LifeCalendar.css"];
  },

  // Retrieve current date
  getDate: function () {
    var date = moment();
    return date;
  },

  // Retrieve age in weeks
  getAge: function () {
    var date = this.getDate();
    var birthdate = moment(this.config.birthdate);  // Use configurable birthdate
    var age = date.diff(birthdate, "weeks");
    return age;
  },

  // Define start sequence
  start: function () {
    Log.info("Starting module: " + this.name);
    Log.info("Current date: " + this.getDate());
    Log.info("Age: " + this.getAge());
  },

  getDom: function () {
    const wrapper = document.createElement("div");
    wrapper.className = "bright medium";

    // Displaying age in weeks
    const ageText = document.createElement("div");
    ageText.innerHTML = "You are " + this.getAge() + " weeks old.";
    wrapper.appendChild(ageText);

    const weeksLived = this.getAge();

    const weeksEarlyYears = this.config.earlyYears * this.config.weeksPerYear;
    const weeksElementaryYears = this.config.elementaryYears * this.config.weeksPerYear;
    const weeksMiddleSchoolYears = this.config.middleSchoolYears * this.config.weeksPerYear;
    const weeksHighSchoolYears = this.config.highSchoolYears * this.config.weeksPerYear;
    const weeksCollegeYears = this.config.collegeYears * this.config.weeksPerYear;
    const weeksCareerYears = this.config.careerYears * this.config.weeksPerYear;

    // Create container for headers and grid
    const container = document.createElement("div");
    container.className = "grid-container-wrapper";

    // Create top row for "Week" header and week numbers
    const topRow = document.createElement("div");
    topRow.className = "top-row";

    // Add "Week" text
    const weekHeader = document.createElement("div");
    weekHeader.className = "week-header";
    weekHeader.innerHTML = "Week";
    weekHeader.style.gridColumn = "1 / span 52"; // Span all columns
    topRow.appendChild(weekHeader);

    // Create container for week numbers
    const weekNumbersContainer = document.createElement("div");
    weekNumbersContainer.className = "week-numbers-container";
    weekNumbersContainer.style.gridColumn = "1 / span 52"; // Span all columns

    // Add week numbers
    for (let i = 1; i <= this.config.weeksPerYear; i++) {
      const weekNumber = document.createElement("div");
      weekNumber.className = "week-number";
      weekNumber.innerHTML = i;
      weekNumber.style.gridColumn = i; // Aligns week numbers with the columns
      weekNumbersContainer.appendChild(weekNumber);
    }

    // Append week numbers container to top row
    topRow.appendChild(weekNumbersContainer);

    // Create left column for "Year" header
    const leftColumn = document.createElement("div");
    leftColumn.className = "left-column";

    // Add year numbers
    for (let i = 0; i < this.config.totalYears; i++) {
      const yearNumber = document.createElement("div");
      yearNumber.className = "year-number";
      yearNumber.innerHTML = i + 1;
      yearNumber.style.gridRow = i + 2; // Aligns year numbers with the rows
      leftColumn.appendChild(yearNumber);
    }

    // Create grid container for 52 columns or weeks
    const grid = document.createElement("div");
    grid.className = "grid-container";
    grid.style.gridTemplateColumns = `repeat(${this.config.weeksPerYear}, auto)`; // Use the variable

    // Generate cells for each week
    for (let i = 0; i < this.config.totalYears * this.config.weeksPerYear; i++) {
      const cell = document.createElement("div");
      cell.className = "week-cell";

      if (i < weeksEarlyYears) {
        cell.classList.add("early_years");
      } else if (i < weeksEarlyYears + weeksElementaryYears) {
        cell.classList.add("elementary_years");
      } else if (i < weeksEarlyYears + weeksElementaryYears + weeksMiddleSchoolYears) {
        cell.classList.add("middle_school_years");
      } else if (i < weeksEarlyYears + weeksElementaryYears + weeksMiddleSchoolYears + weeksHighSchoolYears) {
        cell.classList.add("high_school_years");
      } else if (i < weeksEarlyYears + weeksElementaryYears + weeksMiddleSchoolYears + weeksHighSchoolYears + weeksCollegeYears) {
        cell.classList.add("college_years");
      } else if (i < weeksEarlyYears + weeksElementaryYears + weeksMiddleSchoolYears + weeksHighSchoolYears + weeksCollegeYears + weeksCareerYears) {
        cell.classList.add("career_years");
      }

      if (i === weeksLived) {
        cell.classList.add("current_week");
      }

      // Set the background color to black if the week number is larger than the current weeks lived
      if (i > weeksLived) {
        cell.style.backgroundColor = "black";
      }

      grid.appendChild(cell);
    }

    container.appendChild(topRow);
    container.appendChild(leftColumn);
    container.appendChild(grid);

    wrapper.appendChild(container);
    return wrapper;
  },
});
