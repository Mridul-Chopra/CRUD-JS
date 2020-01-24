

var records_=[];

function addRow()
{
    let table = document.getElementById("records");

    let row  = table.insertRow(table.length);

    
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
         
    cell1.setAttribute("contenteditable", true);
    cell2.setAttribute("contenteditable", true);
    cell3.setAttribute("contenteditable", true);
    cell4.setAttribute("contenteditable", true);

  

    cell5.innerHTML = ' <i class="fa fa-minus-square" style="font-size:2em;color:red" onclick=deleteRow(this)></i>';
    cell5.id = "row-options";

    showOrHide();

}

function deleteRow(e)
{
    let row = e.parentNode.parentNode;
    let rowIndex = e.parentNode.parentNode.rowIndex;

   records_.splice(rowIndex-1,1)

  records_.filter( x=> x.id>rowIndex).map( x=> x.id = x.id -1);
   
    console.log(records_);
    row.remove();
    
    showOrHide();
}


class Student
{

   constructor(data , index)
   {
       
       this.name=data[0];
       this.branch=data[1];
       this.rollNo = data[2];
       this.percent=data[3];
       this.id = index; 

       records_.push(this);
     
   } 

    
}



function saveData()
{
    let table = document.getElementById("records");
    let row;

    let message = "Records inserted sucessfully";

    let data =[];
    let isFilled = true;

    for( i = 1; i<table.rows.length ; i++)
    {
        data.splice(0, 4);
        row = table.rows[i];

        if(isAlreadyInserted(i))
        {
            continue;
        }

        for(j=0;j<=3;j++)
        {
            cell = row.cells[j]
             let info = cell.innerHTML ;
             if(info== "")
             {
                cell.style.backgroundColor = "#ffcccc";
                isFilled = false;
                message = "Please fill the highighted fields to insert all records"
             }
             else
             {
                cell.style.backgroundColor = "white";
                data.push(cell.innerHTML);
             }

            
        }

       

        if(isFilled)
        { new Student(data , i); }

        
    }

    console.log(records_);
    showMessage(message);
}


function isAlreadyInserted(index)
{
    
  return  records_.filter( x=> x.id == index).length == 0 ? false : true;
    
}

function closeMessage()
{
    var messageBox = document.getElementById("messageBox");
    messageBox.style.marginTop = "-30em";
}

function showMessage(message)
{
    var messageBox = document.getElementById("messageBox");
    document.getElementById("message-content").innerHTML = message
    messageBox.style.marginTop = "-1em";
}

function showOrHide()
{

    let button = document.getElementById("saveButton");
    let table =  document.getElementById("records");
    
    if(table.rows.length > 1)
    button.style.display = "block";
    else
    button.style.display = "none";
        


}


function showSearchBox()
{
    var messageBox = document.getElementById("search-box");
    messageBox.style.marginTop = "0em";

}

function search()
{
    let name = document.getElementById("search-content").value;
    console.log("Name is : "+ name);
    let student = records_.filter(x=> x.name == name);
    console.log(records_);
    let message = " Name : "+student.name +"/n"+ "Branch : "+student.branch+"\n Roll No. : "+student.rollNo+"\n Percentage : "+student.percent;
    
    var messageBox = document.getElementById("search-box");
    messageBox.style.marginTop = "-30em";

    
    
    showMessage(message);


}