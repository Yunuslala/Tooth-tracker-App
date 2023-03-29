//user
  //Name
  //Age
  //Number
  //Email
  //ID
  
class USER{
    name:string
    age:string
    mobile:number
    email:string
    ID:number
    constructor(name:string,age:string,mobile:number,email:string,ID:number){
        this.name=name;
        this.age=age;
        this.mobile=mobile;
        this.email=email;
        this.ID=ID
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
    constructor(name:string,sub_speciality:string,Specialtiy:string,Degree:string,ID:number){
        this.name=name;
        this.sub_speaciality=sub_speciality;
        this.Speciality=Specialtiy;
        this.Degree=Degree;
        this.ID=ID;
    }
 }
 




//Slot
  //start_time
  //end_time
  //meetingId
  //ID
class slot{
  ID:number
  start_time:string
  end_time:string
  date:string
  duration:string
  category:string
  meetingId:number
  sub_category:string
  isbooked:boolean
  constructor(ID:number,start_time:string,end_time:string,date:string,category:string,sub_category:string,duration:string){
     this.ID=ID;
     this.start_time=start_time;
     this.end_time=end_time;
     this.date=date;
     this.meetingId=-1
     this.duration=duration;
     this.category=category;
     this.sub_category=sub_category;
     this.isbooked=false
  }
}



//Meeting
 //user
 //start_time
 //end_time
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
    this.slotID=slotId
    this.userId=userId
  }
 }

//payemnt
 //Method
 //userID
 //SlotID
 //ID
 //Amount

 class Peyment{
  userID:number
  slotID:number
  Id:number
  method:string
  amount:number
  constructor(userID:number,slotId:number,Id:number,method:string,amount:number){
    this.userID=userID;
    this.slotID=slotId;
    this.amount=amount;
    this.method=method;
    this.Id=Id
  }
 }

 class ScheduleSystem{
  Meeting:Meeting[]
  doctor:DOCTORS[]
  slot:slot[]
  user:USER[]
  Payment:Peyment[]
  constructor(){
    this.doctor=[];
    this.Meeting=[];
    this.slot=[];
    this.user=[];
    this.Payment=[];
  }
  initializeUser(name:string,age:string,email:string,mobile:number){
    let id=this.user.length+1;
    let user=new USER(name,age,mobile,email,id);
    this.user.push(user);
    return user
  }
  initializeDoctor(name:string,speciality:string,sub_speciality:string,Degree:string){
    let id=this.doctor.length+1;
    let doctor=new DOCTORS(name,sub_speciality,speciality,Degree,id);
    this.doctor.push(doctor);
    return doctor
  }
  initializeSlot(category:string,sub_category:string,start_time:string,end_time:string){
    let id=this.slot.length+1;
    const currentDate=new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const date=`${day}-${month}-${year}`
    let slots=new slot(id,start_time,end_time,date,category,sub_category,"1hr");
    this.slot.push(slots);
    return slots
  }
   slotsof(){
    return this.slot
  }
  innitializeMeeting(category:string,sub_category:string,userID:number){
    let id=this.Meeting.length+1;
    let slotid:number;
    let check=this.slot.map((item)=>{
      if(item.category==category&&item.sub_category==sub_category){
        item.isbooked=true;
        item.meetingId=id;
        slotid=item.ID
        return true
      }
    })
      if(check){
        let meeting=new Meeting(id,userID,slotid,category,sub_category);
        this.Meeting.push(meeting);
        return meeting
      }
      else{
        return false
      }
  }
 }






let system=new ScheduleSystem();

let users=system.initializeUser("yunus","20","yunus@gmail.com",969510765);
console.log(users);

let slots=system.initializeSlot("cleani","teethCleaning","12:30 pm","1:30 pm");
let slots2=system.initializeSlot("cleaning","teethCleaning","12:30 pm","1:30 pm");
let slots3=system.initializeSlot("cleaning","teethCleaning","12:30 pm","1:30 pm");
console.log(system.slotsof());
let meet=system.innitializeMeeting("cleaning","teethCleaning",1)
console.log("meet",meet);

console.log("slots",system.slotsof());

