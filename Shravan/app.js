"use strict";
//user
//Name
//date_of_birth
//Number
//Email
//ID
exports.__esModule = true;
exports.ScheduleSystem = void 0;
var USER = /** @class */ (function () {
    function USER(ID, name, date_of_birth, mobile, email, password) {
        this.ID = ID;
        this.name = name;
        this.date_of_birth = date_of_birth;
        this.mobile = mobile;
        this.email = email;
        this.password = password;
    }
    return USER;
}());
//Doctors  
//Name
//Specialty
//Degree
//ID
var DOCTORS = /** @class */ (function () {
    function DOCTORS(ID, name, sub_speciality, Specialtiy, Degree) {
        this.ID = ID;
        this.name = name;
        this.sub_speaciality = sub_speciality;
        this.Speciality = Specialtiy;
        this.Degree = Degree;
    }
    return DOCTORS;
}());
var PriceBySubCat;
(function (PriceBySubCat) {
    PriceBySubCat["teethCleaning"] = "teethCleaning";
    PriceBySubCat["teethWhitening"] = "teethWhitening";
    PriceBySubCat["teethBreak"] = "teethBreak";
})(PriceBySubCat || (PriceBySubCat = {}));
var priceOf;
(function (priceOf) {
    priceOf[priceOf["teethCleaning"] = 200] = "teethCleaning";
    priceOf[priceOf["teethWhitening"] = 300] = "teethWhitening";
    priceOf[priceOf["teethBreak"] = 500] = "teethBreak";
})(priceOf || (priceOf = {}));
var pricebytime;
(function (pricebytime) {
    pricebytime[pricebytime["ONE"] = 1] = "ONE";
    pricebytime[pricebytime["TWO"] = 2] = "TWO";
    pricebytime[pricebytime["THREE"] = 3] = "THREE";
})(pricebytime || (pricebytime = {}));
var priceValuebytime;
(function (priceValuebytime) {
    priceValuebytime[priceValuebytime["ONE"] = 0] = "ONE";
    priceValuebytime[priceValuebytime["TWO"] = 100] = "TWO";
    priceValuebytime[priceValuebytime["THREE"] = 200] = "THREE";
})(priceValuebytime || (priceValuebytime = {}));
var Method;
(function (Method) {
    Method["CARD"] = "CARD";
    Method["CASH"] = "CASH";
})(Method || (Method = {}));
//Slot
//start_time
//end_time
//meetingId
//ID
var slot = /** @class */ (function () {
    function slot(ID, date, category, sub_category, duration, start_time, end_time) {
        this.ID = ID;
        this.start_time = start_time;
        this.end_time = end_time;
        this.date = date;
        this.meetingId = null;
        this.duration = duration;
        this.category = category;
        this.sub_category = sub_category;
        this.isbooked = false;
    }
    return slot;
}());
//Meeting
//user
//start_time
//end_time
//date
//meetingId
//category
var Meeting = /** @class */ (function () {
    function Meeting(ID, userId, slotId, category, sub_categoryOfMeet) {
        this.ID = ID;
        this.categoryOfMeet = category;
        this.sub_categoryOfMeet = sub_categoryOfMeet;
        this.slotID = slotId;
        this.userId = userId;
    }
    Meeting.prototype.calculatetime = function (slot) {
        var end = slot.end_time.split(" ");
        end = end[0].split(":");
        var endtime = parseInt(end[0]) * 60 + parseInt(end[1]);
        var start = slot.start_time.split(" ");
        start = start[0].split(":");
        var starttime = parseInt(start[0]) * 60 + parseInt(start[1]);
        var totaltime = endtime - starttime;
        totaltime = Math.ceil(totaltime / 60);
        return totaltime;
    };
    Meeting.prototype.calculatecost = function (slot) {
        var time = this.calculatetime(slot);
        var pricetime = time === pricebytime.ONE ? priceValuebytime.ONE : time === pricebytime.TWO ? priceValuebytime.TWO : priceValuebytime.THREE;
        var cat = slot.sub_category;
        var costforcat = cat === PriceBySubCat.teethCleaning ? priceOf.teethCleaning : cat === PriceBySubCat.teethWhitening ? priceOf.teethWhitening : priceOf.teethBreak;
        var totalcost = pricetime + costforcat;
        return totalcost;
    };
    return Meeting;
}());
//payemnt
//Method
//userID
//SlotID
//ID
//Amount
var Peyment = /** @class */ (function () {
    function Peyment(userID, slotId, Id, amount, method) {
        this.userID = userID;
        this.slotID = slotId;
        this.amount = amount;
        this.method = method;
        this.Id = Id;
        this.ispaid = false;
    }
    return Peyment;
}());
var ScheduleSystem = /** @class */ (function () {
    function ScheduleSystem() {
        this.doctors = [];
        this.Meetings = [];
        this.slots = [];
        this.users = [];
        this.Payments = [];
    }
    ScheduleSystem.prototype.initializeUser = function (name, date_of_birth, email, mobile, password) {
        var id = this.users.length + 1;
        var user = new USER(id, name, date_of_birth, mobile, email, password);
        this.users.push(user);
        return user;
    };
    ScheduleSystem.prototype.initializeDoctor = function (name, speciality, sub_speciality, Degree) {
        var id = this.doctors.length + 1;
        var doctor = new DOCTORS(id, name, sub_speciality, speciality, Degree);
        this.doctors.push(doctor);
        return doctor;
    };
    ScheduleSystem.prototype.initializeSlot = function (category, sub_category, start_time, duration) {
        var id = this.slots.length + 1;
        var currentDate = new Date();
        var dur = duration.split(" ");
        var dura = parseInt(dur[0]) * 60;
        console.log(dura);
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth() + 1;
        var day = currentDate.getDate();
        var date = "".concat(day, "-").concat(month, "-").concat(year);
        var start_timeof = start_time.split(" ");
        var conertime = this.convertTime(start_timeof[0]);
        var end = start_time.split(":");
        var hr = parseInt(end[0]) * 60;
        var mint = parseInt(end[1]);
        var hrOfend = Math.floor((hr + mint + dura) / 60);
        var hrofmint = Math.floor((hr + mint + dura) % 60);
        var end_time = this.convertTime("".concat(hrOfend, ":").concat(hrofmint));
        var slots = new slot(id, date, category, sub_category, duration, conertime, end_time);
        this.slots.push(slots);
        return slots;
    };
    ScheduleSystem.prototype.slotsof = function () {
        return this.slots;
    };
    ScheduleSystem.prototype.innitializeMeeting = function (category, sub_category, userID) {
        var id = this.Meetings.length + 1;
        var slotid = 1;
        var check = this.slots.map(function (item) {
            if (item.category == category && item.sub_category == sub_category) {
                item.isbooked = true;
                item.meetingId = id;
                slotid = item.ID;
                return true;
            }
        });
        if (check) {
            var meeting = new Meeting(id, userID, slotid, category, sub_category);
            this.Meetings.push(meeting);
            return meeting;
        }
        else {
            return false;
        }
    };
    ScheduleSystem.prototype.convertTime = function (time) {
        var timeArray = time.split(":");
        var hours = parseInt(timeArray[0]);
        var minutes = timeArray[1];
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ":" + minutes + " " + ampm;
    };
    ScheduleSystem.prototype.checkAloteeSlotCost = function (uid) {
        var _a;
        var meet = this.Meetings.map(function (item) {
            if (item.userId == uid) {
                return item;
            }
        });
        var meetid = (_a = meet[0]) === null || _a === void 0 ? void 0 : _a.slotID;
        console.log(meetid);
        var bookslot = this.slots.filter(function (item) {
            if (item.isbooked && item.ID == meetid) {
                return item;
            }
        });
        var bookid = bookslot[0].meetingId;
        var bookmeet = this.Meetings.filter(function (item) { return item.ID == bookid; });
        var cost = bookmeet[0].calculatecost(bookslot[0]);
        return cost;
    };
    ScheduleSystem.prototype.initializePayment = function (id) {
        var cost = this.checkAloteeSlotCost(id);
        var bookslot = this.Meetings.filter(function (item) { return item.userId == id; });
        var bookid = bookslot[0].slotID;
        var payID = this.Payments.length + 1;
        var payment = new Peyment(id, bookid, payID, cost, "CARD");
        payment.ispaid = true;
        this.Payments.push(payment);
        return payment;
    };
    return ScheduleSystem;
}());
exports.ScheduleSystem = ScheduleSystem;
// let system=new ScheduleSystem();
// let users=system.initializeUser("yunus",new Date("2003-08-12"),"yunus@gmail.com",969510765,"12345");
// console.log(users);
// let slots=system.initializeSlot("cleani","teethCleaning","1:30 am","1 hr");
// let slots2=system.initializeSlot("cleaning","teethWhitening","13:30 pm","1 hr");
// let slots3=system.initializeSlot("cleaning","teethCleaning","14:30 pm","1 hr");
// console.log(system.slotsof());
// let meet=system.innitializeMeeting("cleaning","teethWhitening",1)
// console.log("meet",meet);
// console.log("slots",system.slotsof());
// let opa=system.initializePayment(1)
// console.log(opa);
