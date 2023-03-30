const ScheduleSystem=require("./app").ScheduleSystem;

let system=new ScheduleSystem();

let ans=system.initializeUser("raushan","21","r@gmail.com",9595995);
console.log(ans);