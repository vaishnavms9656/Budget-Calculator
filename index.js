const username=JSON.parse(localStorage.getItem("username"));
document.getElementById("nav_heading").innerHTML=`<p>Welcome ${username}</p>`
function registerAcc() {
  uname = reg_uname.value;
  email = reg_email.value;
  pswd = reg_pwd.value;
  re_pswd = re_reg_pwd.value;
  const accountDetails = {
    uname,
    email,
    pswd,
  };
  if (uname == "" || pswd == "" || email == "" || re_pswd == "") {
    alert("Please fill all the Data");
  } else {
    if (uname in localStorage) {
      alert("Username Already Exists");
    } else {
      if (re_pswd == pswd) {
        localStorage.setItem(uname, JSON.stringify(accountDetails));
        localStorage.setItem("username", JSON.stringify(accountDetails.uname));
        alert("Account Created Successfully");
        window.location = "./index.html";
      } else {
        alert("Password didnt match");
      }
    }
  }
}
function loginAcc() {
  uname = login_uname.value;
  pswd = login_pwd.value;
  const accountDetails = {
    uname,
    pswd,
  };
  if (uname == "" || pswd == "") {
    alert("Please fill all the Data");
  } else {
    if (uname in localStorage) {
      let Acc = JSON.parse(localStorage.getItem(uname));
      if (pswd == Acc.pswd) {
        window.location = "./home.html";
      } else {
        alert("Incorrect Password");
      }
    } else {
      alert("Incorrect Username");
    }
  }
}

let budget = {
  balance: 0,
  spend: 0,
};
function addIncome() {
  let income_type = document.getElementById("income_desc").value;

  let amount = Math.floor(
    parseFloat(document.getElementById("income_amt").value)
  );
  if (income_type === "" || isNaN(amount) || amount <= 0) {
    alert("Enter valid Data");
  } else {
    alert("amount added sucessfully");
    let date=new Date();
    budget.balance += amount;
    updateLocalStorageAndUI();
    updateUI(income_type, amount, "income",date);
  }
}
function addExpense() {
  let expense_type = document.getElementById("expense_desc").value;
  let expense_amount = Math.floor(
    parseFloat(document.getElementById("expense_amt").value)
  );
  if (expense_type === "" || isNaN(expense_amount) || expense_amount <= 0) {
    alert("Enter valid data");
  } else {
    if (expense_amount <= budget.balance) {
      alert("amount reduced sucessfully");
      budget.spend += expense_amount;
      budget.balance -= expense_amount;
      let date=new Date();
      updateLocalStorageAndUI();
      updateUI(expense_type, expense_amount, "expense",date);
    } else {
      alert(`insufficient balance`);
    }
  }
}
function updateLocalStorageAndUI() {
  localStorage.setItem("budgetData", JSON.stringify(budget));
}

function updateUI(type, amount, transactionType,date) {
  const amountDetails = {
    type,
    amount,
    transactionType,
    date,
  };
  localStorage.setItem("amt", JSON.stringify(amountDetails));
  const amt = JSON.parse(localStorage.getItem("amt"));
      if (amt.transactionType === "income") {
        balance_output.innerHTML = `
        <div class="balance_output ms-4">
        <h4 class="mt-3">Balance</h4>
        <p id="bmi">$ ${budget.balance}</p>
        </div<`;
    income_results.innerHTML += `<tr>
    <td>${amt.type}</td>
    <td><span class="text-success">+${amt.amount}</span></td>
    <td>${budget.balance}</td>
    <td>${amt.date}</td>
  </tr>`;
    }
    else if (amt.transactionType === "expense"){
      spent_output.innerHTML = `<div class="spent_output ms-4" style="background-color: brown;" >
      <h4 class="mt-3">Expense</h4>
      <p id="bmi">$ ${budget.spend}</p>
      </div>`
       balance_output.innerHTML = `
       <div class="balance_output ms-4">
       <h4 class="mt-3">Balance</h4>
        <p id="bmi">$ ${budget.balance}</p>
        </div>`;
    expense_results.innerHTML += `<tr>
  <td>${amt.type}</td>
  <td><span class="text-danger">-${amt.amount}</span></td>
  <td>${budget.balance}</td>
  <td>${amt.date}</td>
</tr>`;
    }
  }

window.onload = function () {

  const storedData = localStorage.getItem("budgetData");
  if(storedData){
    budget = JSON.parse(storedData);
    console.log(budget);
    balance_output.innerHTML = `<div class="balance_output ms-4">
    <h4 class="mt-3">Balance</h4>
    <p id="bmi">$ ${budget.balance}</p>
    </div>`;
    spent_output.innerHTML = `  <div class="spent_output ms-4" style="background-color: brown;" >
    <h4 class="mt-3">Expense</h4>
    <p id="bmi">$ ${budget.spend}</p>
    </div>`;
  }
};
function clearAll(){
  msg = confirm("Are You Sure");
  if (msg) {
    localStorage.removeItem("budgetData")
    alert("Successfully Deleted");
    location.reload();
  }

}


function logout(){
  window.location="./index.html"
}
