Module.register("MMM-LifeCalendar", {
  // Default module config.
  
  defaults: {
    text: "Hello World!",
    weeksPerYear: 52,
    totalYears: 90,
    birthdate: "1990-01-01",
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
  // Calculate life progress
  calculateLifeProgress: function() {
    var weeksLived = this.getAge();
    var totalWeeks = this.config.weeksPerYear * this.config.totalYears;
    return (weeksLived / totalWeeks) * 100;  // Returns percentage of life lived
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
  // var ageText = document.createElement("div");
  // ageText.innerHTML = "You are " + this.getAge() + " weeks old.";
  // wrapper.appendChild(ageText);

  // Create grid container for weeks
  var grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(52, auto)"; // Creates 52 columns
  grid.style.gap = "3px"; // Small gap between cells

  // Total weeks lived calculation
  var weeksLived = this.getAge();
  
  // Generate cells for each week
  for (var i = 0; i < this.config.totalYears * this.config.weeksPerYear; i++) {
    var cell = document.createElement("div");
    cell.style.width = "5px";  // Set the width of each cell
    cell.style.height = "5px"; // Set the height of each cell
    cell.style.backgroundColor = i < weeksLived ? "green" : "grey"; // Color cells based on weeks lived
    grid.appendChild(cell);
  }

  wrapper.appendChild(grid);
  return wrapper;
},
});