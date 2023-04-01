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
  meetingId:number |null
  sub_category:string
  isbooked:boolean
  constructor(ID:number,date:string,category:string,sub_category:string,duration:string,start_time:string,end_time:string){
     this.ID=ID;
     this.start_time=start_time;
     this.end_time=end_time;
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
 //start_time
 //end_time
 //date
 //meetingId
 //category
 class Meeting{
  userId:number
  slotID:number
  ID:number
  DocID:number
  categoryOfMeet:string
  sub_categoryOfMeet:string
  constructor(ID:number,userId:number,slotId:number,category:string,sub_categoryOfMeet:string,DocID:number){
    this.ID=ID;
    this.categoryOfMeet=category;
    this.sub_categoryOfMeet=sub_categoryOfMeet;
    this.slotID=slotId;
    this.userId=userId;
    this.DocID=DocID
  }

  calculatetime(slot:slot){
   let end= slot.end_time.split(" ");
   end=end[0].split(":");
   let endtime=parseInt(end[0])*60+parseInt(end[1]);
   let start=slot.start_time.split(" ");
   start=start[0].split(":");
   let starttime=parseInt(start[0])*60+parseInt(start[1]);
  let totaltime=endtime-starttime
  totaltime=Math.ceil(totaltime/60);
  return totaltime
  }

  calculatecost(slot:slot){
    let time=this.calculatetime(slot)
    const pricetime=time===pricebytime.ONE ? priceValuebytime.ONE :time===pricebytime.TWO ? priceValuebytime.TWO : priceValuebytime.THREE
    const cat=slot.sub_category;
    const costforcat=cat===PriceBySubCat.teethCleaning ? priceOf.teethCleaning :cat===PriceBySubCat.teethWhitening ? priceOf.teethWhitening : priceOf.teethBreak
   const totalcost=pricetime+costforcat;
   return totalcost
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
  payam(){
    return this.amount
  }
 }

export class ScheduleSystem{
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
  initializeSlot(category:string,sub_category:string,start_time:string,duration:string){
    let id=this.slot.length+1;
    const currentDate=new Date();
    let dur=duration.split(" ");
   let dura=parseInt(dur[0])*60
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const date=`${day}-${month}-${year}`
   let start_timeof=start_time.split(" ");
   let conertime=this.convertTime(start_timeof[0])
    const end=start_time.split(":");
    const hr=parseInt(end[0])*60;
    const mint=parseInt(end[1]);
    const hrOfend=Math.floor((hr+mint+dura)/60);
    const hrofmint=Math.floor((hr+mint+dura)%60);
    let end_time=this.convertTime(`${hrOfend}:${hrofmint}`);
    let slots=new slot(id,date,category,sub_category,duration,conertime,end_time);
    this.slot.push(slots);
    return slots
  }
   Allslots(){
    return this.slot
  }
  AllUser(){
    return this.user
  }
  AllPayment(){
    return this.AllPayment
  }
  AllMeeting(){
    return this.AllMeeting
  }
  AllDoctor(){
    return this.AllDoctor
  }
  innitializeMeeting(category:string,sub_category:string,userID:number,DocID:number,time:string){
    let id=this.Meeting.length+1;
    let slotid:number=1;
    let check=this.slot.filter((item)=>{
      if(item.category==category&&item.sub_category==sub_category && item.start_time==time){
        item.isbooked=true;
        item.meetingId=id;
        slotid=item.ID
        return item
      }
    })
    // console.log(check.length>0);
      if(check.length>0){
        let meeting=new Meeting(id,userID,slotid,category,sub_category,DocID);
        this.Meeting.push(meeting);
        return {meeting,check}
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
    let meet=this.Meeting.filter((item)=>{
    if(item.userId ==uid){
      return item
    }
  })
   let meetid= meet[0]?.slotID
    let bookslot=this.slot.filter((item)=>{
      if(item.isbooked && item.ID==meetid){
     return item
      }
    })
    if(bookslot.length>0){
      let bookid=bookslot[0]?.meetingId
      const bookmeet=this.Meeting.filter((item)=>item.ID==bookid)
     let cost= bookmeet[0].calculatecost(bookslot[0])
     return cost
    }else{
      return false
    }
    
  }
  initializePayment(id:number,payType:string){
    let cost=this.checkAloteeSlotCost(id)
    if(cost){
      let bookslot=this.Meeting.filter((item)=>item.userId==id)
      let bookid=bookslot[0].slotID
       let payID=this.Payment.length+1;
       let payment=new Peyment(id,bookid,payID,cost,payType);
       payment.ispaid=true;
       this.Payment.push(payment)
       return payment
    }else{
      return false
    }
    
  }
 }






let system=new ScheduleSystem();

let users=system.initializeUser("yunus","20","yunus@gmail.com",969510765);
// console.log(users);
let slots=system.initializeSlot("cleani","teethCleaning","1:30 am","1 hr");
let slots2=system.initializeSlot("cleaning","teethWhitening","13:30 pm","1 hr");
let slots3=system.initializeSlot("cleaning","teethCleaning","14:30 pm","1 hr");
// console.log(system.Allslots());
let meet=system.innitializeMeeting("cleaning","teethWhitening",1,2,"1:30 PM")
console.log("meet",meet);

console.log("slots",system.Allslots());
let opa=system.initializePayment(1,"CARD")
const cost=system.checkAloteeSlotCost(1)
console.log(cost);
// console.log(opa);

