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
    return 'Life Calendar';
  },
  
  // Define required scripts.
  getScripts: function () {
    return ["moment.js"];
  },
  
  // Define styles.
  getStyles(){
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
    var age = date.diff(birthdate, 'weeks');
    return age;
  },
  
  // Define start sequence
  start: function () {
    Log.info("Starting module: " + this.name);
    Log.info("Current date: " + this.getDate());
    Log.info("Age: " + this.getAge());      
  },
  
  // Override dom generator.
  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.className = "bright medium";
    
    // Displaying age in weeks
    var ageText = document.createElement("div");
    ageText.innerHTML = "You are " + this.getAge() + " weeks old.";
    wrapper.appendChild(ageText);
    var weeksLived = this.getAge();

    var weeksEarlyYears = this.config.earlyYears * this.config.weeksPerYear;
    var weeksElementaryYears = this.config.elementaryYears * this.config.weeksPerYear;
    var weeksMiddleSchoolYears = this.config.middleSchoolYears * this.config.weeksPerYear;
    var weeksHighSchoolYears = this.config.highSchoolYears * this.config.weeksPerYear;
    var weeksCollegeYears = this.config.collegeYears * this.config.weeksPerYear;
    var weeksCareerYears = this.config.careerYears * this.config.weeksPerYear;

    // Create grid container for 52 columns or weeks
    var grid = document.createElement("div");
    grid.className = "grid-container";
    grid.style.gridTemplateColumns = `repeat(${this.config.weeksPerYear}, auto)`; // Use the variable
    
    // Generate cells for each week
    for (var i = 0; i < this.config.totalYears * this.config.weeksPerYear; i++) {
      var cell = document.createElement("div");
      cell.className = "week-cell";
      
      if (i < weeksEarlyYears) {
        cell.classList.add("early_years");
      }
      else if (i < weeksEarlyYears + weeksElementaryYears) {
        cell.classList.add("elementary_years");
      }
      else if (i < weeksEarlyYears + weeksElementaryYears + weeksMiddleSchoolYears) {
        cell.classList.add("middle_school_years");
      }
      else if (i < weeksEarlyYears + weeksElementaryYears + weeksMiddleSchoolYears + weeksHighSchoolYears) {
        cell.classList.add("high_school_years");
      }
      else if (i < weeksEarlyYears + weeksElementaryYears + weeksMiddleSchoolYears + weeksHighSchoolYears + weeksCollegeYears) {
        cell.classList.add("college_years");
      }
      else if (i < weeksEarlyYears + weeksElementaryYears + weeksMiddleSchoolYears + weeksHighSchoolYears + weeksCollegeYears + weeksCareerYears) {
        cell.classList.add("career_years");
      }

      if (i == weeksLived) {
        cell.classList.add("current_week");
      }

      // Set the background color to black if the week number is larger than the current weeks lived
      if (i > weeksLived) {
        cell.style.backgroundColor = "black";
      }

      grid.appendChild(cell);
    }

    wrapper.appendChild(grid);
    return wrapper;
  },
});
