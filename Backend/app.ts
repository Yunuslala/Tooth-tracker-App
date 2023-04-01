//user
//Name
//date_of_birth
//Number
//Email
//ID

class USER{
  name:string
  date_of_birth: string
  mobile:number
  email:string
  password: string
  ID:number
  constructor(ID:number,name:string,date_of_birth: string,mobile:number,email:string,password: string){
    this.ID=ID;
    this.name=name;
    this.date_of_birth=date_of_birth;
    this.mobile=mobile;
    this.email=email;
    this.password = password;
  }
}

//Doctors  
//Name
//Specialty
//Degree
//ID

class DOCTORS{
  name:string
  Speciality:string
  sub_speaciality:string
  Degree:string
  ID:number
  constructor(ID:number, name:string,sub_speciality:string,Specialtiy:string,Degree:string){
    this.ID=ID;  
    this.name=name;
    this.sub_speaciality=sub_speciality;
    this.Speciality=Specialtiy;
    this.Degree=Degree;
  }
}

enum PriceBySubCat{
teethCleaning="teethCleaning",
teethWhitening="teethWhitening",
teethBreak="teethBreak"
}

enum priceOf{
teethCleaning=200,
teethWhitening=300,
teethBreak=500
}

enum pricebytime{
ONE=1,
TWO=2,
THREE=3
}

enum priceValuebytime{
ONE=0,
TWO=100,
THREE=200
}

enum Method{
CARD="CARD",
CASH="CASH"
}



//Slot
//start
//end
//meetingId
//ID
class Slot{
ID:number
start: Date
end: Date 
date: Date
duration:number
category:string
meetingId:number |null
sub_category:string
isbooked:boolean
constructor(ID:number,date:Date,category:string,sub_category:string,duration:number,start:Date,end:Date){
    this.ID=ID;
    this.start=start;
    this.end=end;
    this.date=date;
    this.meetingId=null
    this.duration=duration;
    this.category=category;
    this.sub_category=sub_category;
    this.isbooked=false
}

}



//Meeting
//user
//start
//end
//date
//meetingId
//category
class Meeting{
userId:number
slotID:number
ID:number
categoryOfMeet:string
sub_categoryOfMeet:string
constructor(ID:number,userId:number,slotId:number,category:string,sub_categoryOfMeet:string){
  this.ID=ID;
  this.categoryOfMeet=category;
  this.sub_categoryOfMeet=sub_categoryOfMeet;
  this.slotID=slotId;
  this.userId=userId;
}

// calculatetime(slot:slot){
//  let end= slot.end.split(" ");
//  end=end[0].split(":");
//  let endtime=parseInt(end[0])*60+parseInt(end[1]);
//  let start=slot.start.split(" ");
//  start=start[0].split(":");
//  let starttime=parseInt(start[0])*60+parseInt(start[1]);
// let totaltime=endtime-starttime
// totaltime=Math.ceil(totaltime/60);
// return totaltime
// }

// calculatecost(slot:slot){
//   let time=this.calculatetime(slot)
//   const pricetime=time===pricebytime.ONE ? priceValuebytime.ONE :time===pricebytime.TWO ? priceValuebytime.TWO : priceValuebytime.THREE
//   const cat=slot.sub_category;
//   const costforcat=cat===PriceBySubCat.teethCleaning ? priceOf.teethCleaning :cat===PriceBySubCat.teethWhitening ? priceOf.teethWhitening : priceOf.teethBreak
//  const totalcost=pricetime+costforcat;
//  return totalcost
// }

}

//payemnt
//Method
//userID
//SlotID
//ID
//Amount

class Peyment{
userID:number
slotID:number | null
Id:number
method:string
amount:number
ispaid:boolean
constructor(userID:number,slotId:number,Id:number,amount:number,method:string){
  this.userID=userID;
  this.slotID=slotId;
  this.amount=amount;
  this.method=method
  this.Id=Id;
  this.ispaid=false
}

}

class ScheduleSystem{
Meetings:Meeting[]
doctors:DOCTORS[]
slots:Slot[]
users:USER[]
Payments:Peyment[]
constructor(){
  this.doctors=[];
  this.Meetings=[];
  this.slots=[];
this.users=[];
this.Payments=[];
}
initializeUser(name:string,date_of_birth: string,email:string,mobile:number,password:string){
let id=this.users.length+1;
let user=new USER(id,name,date_of_birth,mobile,email,password);
this.users.push(user);
return user
}
initializeDoctor(name:string,speciality:string,sub_speciality:string,Degree:string){
let id=this.doctors.length+1;
let doctor=new DOCTORS(id, name,sub_speciality,speciality,Degree);
this.doctors.push(doctor);
return doctor
}
initializeSlot(category:string,sub_category:string,duration:number,start:string,date:string){
console.log(`${date} ${start}`);
const Start = new Date(`${date} ${start}`);
console.log(Start);
let end = new Date(`${date} ${start}`)
end.setMinutes(end.getMinutes() + duration);
let slot = new Slot(this.slots.length+1, new Date(date), category, sub_category, duration, Start, end);
this.slots.push(slot);
return slot
}
slotsof(){
return this.slots
}
innitializeMeeting(category:string,sub_category:string,userID:number){
let id=this.Meetings.length+1;
let slotid:number=1;
let check=this.slots.map((item)=>{
  if(item.category==category && item.sub_category==sub_category){
    item.isbooked=true;
    item.meetingId=id;
    slotid=item.ID
    return true
  }
})
if(check){
  let meeting=new Meeting(id,userID,slotid,category,sub_category);
  this.Meetings.push(meeting);
  return meeting
}
else{
  return false
}
}
convertTime(time:string) {
var timeArray = time.split(":");
var hours = parseInt(timeArray[0]);
var minutes = timeArray[1];
var ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12;
hours = hours ? hours : 12; 
return hours + ":" + minutes + " " + ampm;
}
checkAloteeSlotCost(uid:number){
let meet=this.Meetings.map((item)=>{
if(item.userId ==uid){
  return item
}
})
let meetid= meet[0]?.slotID
console.log(meetid);
let bookslot=this.slots.filter((item)=>{
  if(item.isbooked && item.ID==meetid){
  return item
  }
})
let bookid=bookslot[0].meetingId
const bookmeet=this.Meetings.filter((item)=>item.ID==bookid)
//  let cost= bookmeet[0].calculatecost(bookslot[0])
//  return cost
}

calculatecost(slot:Slot){
  let time= Math.ceil(slot.duration/60);
  const pricetime=time===pricebytime.ONE ? priceValuebytime.ONE :time===pricebytime.TWO ? priceValuebytime.TWO : priceValuebytime.THREE
  const cat=slot.sub_category;
  const costforcat=cat===PriceBySubCat.teethCleaning ? priceOf.teethCleaning :cat===PriceBySubCat.teethWhitening ? priceOf.teethWhitening : priceOf.teethBreak
const totalcost=pricetime+costforcat;
return totalcost
}

initializePayment(id:number,payType:string,cost:number){
    let bookslot=this.Meetings.filter((item)=>item.userId==id)
    let bookid=bookslot[0].slotID
    let payID=this.Payments.length+1;
    let payment=new Peyment(id,bookid,payID,cost,payType);
    payment.ispaid=true;
    this.Payments.push(payment)
    return payment
 }
}


// export{ScheduleSystem}





// let system=new ScheduleSystem();

// let users=system.initializeUser("yunus",new Date("2003-08-12"),"yunus@gmail.com",969510765,"12345");
// console.log(users);

// let slot=system.initializeSlot("cleani","teethCleaning",30,"16:00","2023-03-30");
// console.log(slot);
// const cost = system.calculatecost(slot);
// console.log(cost);
// let slots2=system.initializeSlot("cleaning","teethWhitening","13:30 pm","1 hr");
// let slots3=system.initializeSlot("cleaning","teethCleaning","14:30 pm","1 hr");

// console.log(system.slotsof());

// let meet=system.innitializeMeeting("cleaning","teethWhitening",1)
// console.log("meet",meet);

// console.log("slots",system.slotsof());

// let opa=system.initializePayment(1)
// console.log(opa);

//  let id=this.slots.length+1;
//   const currentDate=new Date();
//   let dur=duration.split(" ");
//   let dura=parseInt(dur[0])*60
//   console.log(dura);
//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth() + 1;
//   const day = currentDate.getDate();
//   const date=`${day}-${month}-${year}`
//   let startof=start.split(" ");
//   let conertime=this.convertTime(startof[0])
//   const end=start.split(":");
//   const hr=parseInt(end[0])*60;
//   const mint=parseInt(end[1]);
//   const hrOfend=Math.floor((hr+mint+dura)/60);
//   const hrofmint=Math.floor((hr+mint+dura)%60);
//   let end=this.convertTime(`${hrOfend}:${hrofmint}`); 

