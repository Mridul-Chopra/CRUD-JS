

var records_=[];

class Student  // this class contains student's information
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


function addRow()  // function to add new rows to the table
{
    let table = document.getElementById("records");  // getting table 

    let row  = table.insertRow(table.length);  // inserting row

    // inserting cells
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
	
    // setting properties of cell     
    cell1.setAttribute("contenteditable", true);
    cell2.setAttribute("contenteditable", true);
    cell3.setAttribute("contenteditable", true);
    cell4.setAttribute("contenteditable", true);

  

    cell5.innerHTML = ' <i class="fa fa-minus-square" style="font-size:2em;color:red" onclick=deleteRow(this)></i>';
    cell5.id = "row-options";

    showOrHide();  // checking if to show or hide save button

}

function deleteRow(e)  // function to delete rows
{  
    let row = e.parentNode.parentNode;  // getting rows
    let rowIndex = e.parentNode.parentNode.rowIndex;  

   records_.splice(rowIndex-1,1)  // removing record

  records_.filter( x=> x.id>rowIndex).map( x=> x.id = x.id -1);  // updating ids
   
    console.log(records_);  
    row.remove();  //removing row
    
    showOrHide();  // function to check if to show or hide save button
}





function saveData()  // function for saving data 
{
    let table = document.getElementById("records");
    let row;

    let message = "Records inserted sucessfully";  // feedback message

    let data =[];
    let isFilled = true;  // checks if all data is filled
	
	records_.splice(0,records_.length);

	// iterating all rows to get data
    for( i = 1; i<table.rows.length ; i++)
    {
        data.splice(0, 4);
        row = table.rows[i];


        for(j=0;j<=3;j++)
        {
            cell = row.cells[j]
             let info = cell.innerHTML ;
             if(info== "")
             {
				 // changing cell properties to highlight the blank fields
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

       
	// inserting if filled
        if(isFilled)
        { new Student(data , i); }

        
    }

    console.log(records_);
    showMessage(message);  // showing alert box
}



function closeMessage()  //function to close alert
{
    var messageBox = document.getElementById("messageBox");
    messageBox.style.marginTop = "-30em";
}

function showMessage(message) // function to close alert
{
    var messageBox = document.getElementById("messageBox");
    document.getElementById("message-content").innerHTML = message
    messageBox.style.marginTop = "-1em";
}

function showOrHide()  // decides whether to show or hide save button
{

    let button = document.getElementById("saveButton");
    let table =  document.getElementById("records");
    
    if(table.rows.length > 1)  // show if table has rows
    button.style.display = "block";
    else
    button.style.display = "none";
        


}


function showSearchBox()  // function to view search box
{
    var messageBox = document.getElementById("search-box");
    messageBox.style.marginTop = "0em";

}

function search()    // function to search for required records
{
    let name = document.getElementById("search-content").value;
    console.log("Name is : "+ name);
    let student = records_.filter(x=> x.name == name);  // getting record with same name as input
    console.log(student);
	
	// printing the message
    let message = " Name : "+student[0].name +"<br>"+ "Branch : "+student[0].branch+"<br> Roll No. : "+student[0].rollNo+"<br> Percentage : "+student[0].percent;
    
    var messageBox = document.getElementById("search-box");
    messageBox.style.marginTop = "-30em";

    
    
    showMessage(message);


}