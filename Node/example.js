// Class and Inheritance

class user {                                    // user class
    static count                                // static variable
    constructor(username,email,password) {      // constructor for user class
        this.username = username
        this.email = email
        this.password = password
        user.count++
    }

    printNumberOfUsers() {                      // class method
        console.log("The number of users = ",user.count)
    }
}
/**************************************************************************************** */
class member extends user {                     // new member class inheriting user class
    constructor(username,email,password) {
        super(username,email,password)
        this.membershipactivetilldate = new Date(2024,2,8)
        this.package = ''
    }

    purchaseMembership(membershippackagename) {         // class method
        if(membershippackagename === 'MONTHLYPACKAGE') {
          this.membershipactivetilldate.setMonth(this.membershipactivetilldate.getMonth() + 1)
          this.package = 'MONTHLYPACKAGE'
        } else if(membershippackagename === 'YEARLYPACKAGE') {
          this.membershipactivetilldate.setFullYear(this.membershipactivetilldate.getFullYear() + 1)
          this.package = 'YEARLYPACKAGE'
        }
      }

    subscriptionActiveTill() {                          // class method
        console.log(this.username + " is subscribed to " + this.package + " uptill " + this.membershipactivetilldate.toDateString())
    }
}    
/***************************************************************************************** */
function createNewStudents(username, email, password, membershippackagename) {              // function
    const mike = new member(username, email, password);  
    mike.purchaseMembership(membershippackagename);
    mike.subscriptionActiveTill();
}

let membershippackagename = 'MONTHLYPACKAGE'
let username = 'Mohan'
let email = 'mohan@gmail.com'
let password = 'fgfggdj'
createNewStudents(username, email, password, membershippackagename)

