import { Component , AfterViewInit,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ngxCsv } from 'ngx-csv';
import jsPDF from 'jspdf';
import { applyPlugin } from 'jspdf-autotable'
import {MatTable, MatTableDataSource,MatTableModule} from '@angular/material/table';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import * as CryptoJS from 'crypto-js';
//import { AuthserviceService } from '../authservice.service';
import decode from 'jwt-decode';
//import { AuthserviceService } from '../authservice.service';
//import { UserService } from '../services/user.service';
applyPlugin(jsPDF)
//import html2canvas from 'html2canvas';

export interface user_info{
  _id:string,
  username:string,
  password:string,
  email_addr:string,
  mobile_no:string,
  __v:number
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})

export class ContentComponent{

userArray:any[]=[]
dataSource = new MatTableDataSource<user_info>(this.userArray);
//DATA:user_info[]=[]
content:string=""
form ={
username:"",
password:"",
mobile_no:"",
email_addr:""
}
currentUserID:string=""
name:string=""
token = localStorage.getItem("token")
constructor(private http: HttpClient,private route:Router,private userIdle:UserIdleService)
  {
    this.getAllUsers();
    const decodeToken:any = decode(this.token||"");
    this.name=decodeToken.username;
  }  
  logout(){
    localStorage.removeItem('token');
    localStorage.clear();
    window.localStorage.setItem('logout-event', "logged out")
    this.route.navigate(['login']);
  }
  getAllUsers() {
    this.http.get("http://localhost:8086/user/getAll")
    .subscribe((resultData: any)=>
    {
      
        console.log(resultData);
        this.userArray = resultData.data;
        var len = Object.keys(this.userArray).length;
        for(let i=0;i<len;i++)
        {
          //const CryptoJS = require("crypto-js");
          var encrypted = ((this.userArray)[i]).password
          const key="secret_key";
          var decrypted = CryptoJS.AES.decrypt(encrypted, key)
          var plainText = decrypted.toString(CryptoJS.enc.Utf8);
          ((this.userArray)[i]).password = plainText;
        }
        //this.DATA = resultData.data;
        //console.log("==> "+(this.DATA)[1].username)
        this.dataSource = new MatTableDataSource<user_info>(this.userArray);
        this.dataSource.paginator = this.paginator;
    });
  }
  setUpdate(data: any)
  {
   this.form.username = data.username
   this.form.password = data.password
   this.form.mobile_no = data.mobile_no
   this.form.email_addr = data.email_addr
   this.currentUserID = data._id
  
  }
 
  UpdateRecords()
  {
    let bodyData = {
      "username" : this.form.username,
      "password" : this.form.password,
      "mobile_no":this.form.mobile_no,
      "email_addr":this.form.email_addr
    };
    
    this.http.patch("http://localhost:8086/user/update"+ "/"+this.currentUserID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("User Updated")
        this.getAllUsers();     
    });
  }
  setDelete(data: any) {
    this.http.delete("http://localhost:8086/user/delete"+ "/"+ data._id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("User Deleted")
        this.getAllUsers();
  
    });
    }
    
  save()
  {
    if(this.currentUserID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
       this.currentUserID="";
      }      
 
  }
 
register()
  {
 
    let bodyData = {
      "username" : this.form.username,
      "password" : this.form.password,
      "mobile_no":this.form.mobile_no,
      "email_addr":this.form.email_addr
    };
    this.http.post("http://localhost:8086/user/create",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("User Registered Successfully")
        this.form.username = ''
        this.form.password = ''
        this.form.mobile_no  = ''
        this.form.email_addr = ''
        this.getAllUsers();
    });
  }
  fileDownloadCSV()
  {
    var csvArr = this.userArray
    for(let i=0;i<csvArr.length;i++)
    {
      delete csvArr[i]['_id']
      delete csvArr[i]['__v']
    }
    var options =
    {
      fieldSeperator:',',
      quoteStrings:'"',
      //decimaloperator:'.',
      showLabels:true,
      //showTitle:true,
      //title:"Report",
      //useBom:true,
      noDownload:false,
      headers:["Username","Mobile Number","Email Address","Password"]
    }
    new ngxCsv(csvArr,"Report",options)
  }
  /*fileDownloadPDF()
  {
    let DATA: any = document.getElementById('data');
    html2canvas(DATA).then((canvas) => {
      //let fileWidth = 208;
      //let fileHeight = (canvas.height * fileWidth) / canvas.width
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Report.pdf');
  })   
  }*/
 fileDownloadPDF()
 {
  var pdfArr = this.userArray
  for(let i=0;i<pdfArr.length;i++)
  {
    delete pdfArr[i]['_id']
    delete pdfArr[i]['__v']
  }
  let pdf = new jsPDF()
  pdf.setFontSize(20)
  pdf.text("Users Report",11,8);
  (pdf as any).autoTable({
    body:pdfArr,
    columns:[{header:'Username',dataKey:'username'},{header:'Password',dataKey:'password'},{header:'Email Address',dataKey:'email_addr'},{header:'Mobile Number',dataKey:'mobile_no'}]
  });
  pdf.save('Report.pdf')
  /*(pdf as any).autoTable({html:'#table'});
  pdf.save('Report.pdf')*/
  /*(pdf as any).autoTable({
    head:[["Username","Password","Mobile Number","Email Address"]],
    body:csvArr,
    theme:"plain",
    //didDrawCell:(data:{column:{index:any}})=>{console.log(data.column.index)}
  })*/
  //pdf.output('dataurlnewwindow')
  //pdf.save('Report.pdf')
 }
 initColumns:any=[
  { name: 'username', display: 'Username' },
  { name: 'password', display: 'Password' },
  { name: 'email_addr', display: 'Email Address' },
  { name: 'mobile_no', display: 'Mobile No' },
  {name:'options',display:'Options'}
 ]
 //dataSource = this.userArray;
 
 //displayedColumns: any[] =  this.initColumns.map((col:any)=> col.name);
 displayedColumns: string[] = ['username', 'password', 'email_addr', 'mobile_no','options'];
 //@ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
 @ViewChild(MatTable, { static: false }) matTable!: MatTable<any>;
 ngAfterViewInit():void {
  //this.dataSource = new MatTableDataSource(this.userArray);
  this.dataSource.paginator = this.paginator;
}

ngOnInit(){
  this.userIdle.startWatching();
  this.userIdle.onTimerStart().subscribe(count => console.log("!==>!"+count));
  this.userIdle.onTimeout().subscribe(() => {
    console.log('Time is up!');
    this.logout();
    this.userIdle.stopTimer();
    this.userIdle.stopWatching();
    this.userIdle.resetTimer();
  });
  //this.userIdle.onTimeout().subscribe(() => this.logout);
}
 //@ViewChild(MatPaginator) paginator!: MatPaginator;
}