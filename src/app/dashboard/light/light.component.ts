import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs'
import { DecimalPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { UtilService } from 'src/app/services/util.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {

  error ;
  error2 ;
  error3 ;
  error4 ;
  error5 ;
  image;
  docid;
  element;
  firstForm:FormGroup;
  Result;
  select: number =1;
  form: FormGroup;
  isDisabled = true;

  num1;
  num4;
  loanName;
  num2: number = 99;
  num3: number = 99;
  Total;
  TotalLoans:any='';
  notFocused = false;
  images: Observable<any[]>;
  Loancategory;
  LoanList;
  LeadName;
  contact;
  amount;
  BankLoans:any;
  serviceType:any={
    id:'',
    name:'',

  };

  errormessage:boolean = true;
  message:any;

  loan;
  category;
  categoryname=null;
  moduleName = 'ණය වර්ගය';
  calMethodValue:boolean = true;
  TableResults:any[] = [];
  AddformSubmitError:any = ""

  years:any=20

  last_indexa = 200;
  last_indexd = 200;
  countera = 100;
  counterd = 100;
  firstCount = 100;

  constructor(
    private fb: FormBuilder,
    public firebaseService: FirebaseService,
    private util: UtilService,
    private _decimalPipe: DecimalPipe,
    private apiService: ApiService) {

      this.initForm();

  }

  ngOnInit() {

    this.last_indexa = (this.Aboutus.substring(0, 200)).lastIndexOf(' ');
    this.last_indexd = (this.Disclaimer.substring(0, 200)).lastIndexOf(' ');
    if(this.last_indexa > 200)
      this.last_indexa = 200;
      this.countera = this.last_indexa;
      if(this.last_indexd > 200)
      this.last_indexd = 200;
      this.counterd = this.last_indexd;

    this.firebaseService.GetBanners().subscribe(data => {
     this.element = data;
    });
    this.GetLoans();
    this.getLoanList();

    //this.firstForm.disable()
  }
  showTxta = "Show More"
  showTxtd = "Show More"
  toggleaboutus(){

    if(this.countera < 201 )
      {
        this.countera = this.Aboutus.length;
        this.showTxta = "Show less";
      }

      else {
        this.countera = this.last_indexa;
        this.showTxta = "Show More"
      }
  }

  toggledis(){

    if(this.counterd < 201 )
      {
        this.counterd = this.Disclaimer.length;
        this.showTxtd = "Show less";
      }

      else {
        this.counterd = this.last_indexd;
        this.showTxtd = "Show More"
      }
  }

  counter(i: number) {
    return new Array(i);
}

  initForm2() {
    this.firstForm = this.fb.group({
      LeadName: ['', [Validators.required]],
      contact: ['',[Validators.required]],
      loanName: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }

  formReset(firstForm: FormGroup) {

    firstForm.reset();
    Object.keys(firstForm.controls).forEach(key => {
      firstForm.get(key).setErrors(null) ;
    });
  }

  getLoanList(){
    this.firebaseService.getLoanList().then((data) =>{
      this.LoanList = data;
    }).catch((error) =>{
      console.log('no data');
    })
  }

  Select(id,name){
    this.category=id;
    this.categoryname = name;
    console.log(this.categoryname);


  }

  flip() {
    this.isDisabled = !this.isDisabled;
  }

  AddformSubmit(){

    if(!this.LeadName || !this.contact || !this.amount || !this.categoryname || this.contact.length<10){
      this.AddformSubmitError = "Fill all details correcly."
    }else{
      this.AddformSubmitError = ""
      this.util.showloading('Please wait...', 'Data Saving!');
    let details = {
      name: this.LeadName,
      service: this.categoryname,
      contact: this.contact.toString(),
      amount:this.amount.toString(),
      date:  moment(Date.now()).format('l'),
    }
    console.log(details);


    this.apiService.AddLeadphp(details).subscribe((data)=>{
      console.log(data);
      console.log("success");
      this.flip();
      this.firstForm.enable();
      this.util.showSuccessful();

    }),(error)=>{
      this.util.showError(error.message);
      console.log(error);
    };

    }

  }

  Clear(){
    this.LeadName ='',
    this.contact='',
    this.amount=''
  }

  check(e) {
    this.num1 = e.target.value
      if (this.num1.length <= 0){
        this.error = 'This field is required.';
      } else {
        this.error = '';
      }
    }

  check2(e) {
    this.num2 = e.target.value
       if (this.num2 != 99){
        this.error2 = '';
      } else {
        this.error2 = 'This field is required.';
      }
    }

  check3(e) {
    this.num3 = e.target.value
      if (this.num3 != 99){
        this.error3 = '';
      } else {
        this.error3 = 'This field is required.';
      }
    }

  check4(e) {
    this.select = e.target.value
      if (this.select != 999){
        this.error5 = '';
      } else {
        this.error5 = 'This field is required.';
      }
    }

  check5(e) {
    this.num4 = e.target.value
    if (this.num4.length <= 0){
        this.error4 = 'This field is required.';
      } else {
        this.error4 = '';
      }
    }


  initForm() {
    this.firstForm = this.fb.group({
      num1: ['',[Validators.required, Validators.email, Validators.minLength(5)]],
      num2: ['',[Validators.required]],
      num3: ['', [Validators.required]],
      num4: ['', [Validators.required]],
      select: ['', [Validators.required]]

    });
  }

  GetLoans(){
    this.firebaseService.GetLoanCategory().subscribe(data => {
      this.Loancategory = data;
     });
  }


  Add(){
    if(this.num2!=99 && this.num3!==99 ){
      this.OtherError();
        if(this.num1!= null && this.num4!= null && this.select ==2){
          this.ErrorHide();
          this.Result =  this.Calculation2(this.Total,this.num1,this.num2,this.num3,this.num4);
          this.TableResults = this.calculatetableresults2(this.BankLoans);

        }else if(this.num1!= null && this.num4!= null && this.select==1){
          this.ErrorHide();
          this.Result =  this.Calculation1(this.Total,this.num1,this.num2,this.num3,this.num4);
          this.TableResults = this.calculatetableresults1(this.BankLoans);
        }
    }else{
      console.log("error");
      this.Error();
    }
  }


  Calculation1(Total,num1,num2,num3,num4){
    Total= Number(num1) * (( (Number(num4)/100)/12 * Math.pow((1+ ( (Number(num4)/100)/12)),this.calculatemonths(Number(num2),Number(num3)))  )
    / (Math.pow((1+ ( (Number(num4)/100)/12)),this.calculatemonths(Number(num2),Number(num3))) - 1));

    var decimal_formatted = this._decimalPipe.transform(Total,"1.2-2");

    return decimal_formatted;
      //console.log(this.Result);
  }

  Calculation2(Total,num1,num2,num3,num4){

    Total =  (( (  Number(num1) * (Number(num4)/100)) * Number(num2)) + Number(num1)) / this.calculatemonths(Number(num2),Number(num3)) ;
    var decimal_formatted = this._decimalPipe.transform(Total,"1.2-2");

    return decimal_formatted;

  }

  OtherError(){
    if(this.num1==null){
      this.error='This field is required.';
      } if(this.num4==null){
      this.error4='This field is required.';
        }if(this.select==999){
          this.error5='This field is required.';
        }
  }

  Error(){
    if(this.num1==null){
      this.error='This field is required.';
      } if(this.num4==null){
      this.error4='This field is required.';
        } if(this.num2==99){
      this.error2='This field is required.';
          } if(this.num3==99){
            this.error3='This field is required.';
            } if(this.select==999){
              this.error5='This field is required.';
            }if( this.BankLoans=='' || !this.BankLoans){
              this.util.showError('Select Loan Type!')
            }

  }

  ErrorHide(){
      this.error= false,
      this.error2= false,
      this.error3= false,
      this.error4= false,
      this.error5= false
  }

  reset(){
      this.Result='0.00',
      this.num1=null,
      this.num2=99,
      this.num3=99,
      this.select=1,
      this.num4=null

      this.error= false,
      this.error2= false,
      this.error3= false,
      this.error4= false,
      this.error5= false

  }

  calculatemonths(years,months){
    return (years*12)+ months;
  }

  //select type of service
  public SelectServiceType(type,id,cal,duration){
    this.serviceType.id =id;
    this.serviceType.name =type;
    this.years = duration;
    this.calMethodValue = this.returntrueorfalse(cal);
    console.log(this.serviceType);
    console.log(this.calMethodValue);
    this.getbanklaoddetails(id);

  }
  //return true or false
  public returntrueorfalse(cal){
    if(cal==1){
      this.select = 1
      return true
    }else{
      return false
    }
  }
  // get bank loan details
  public getbanklaoddetails(id){
    this.firebaseService.getbanklaoddetails(id).then(data=>{
      this.BankLoans = data.Interests;
      console.log(this.BankLoans);

    }).catch(error=>{
      console.log(error);

    })

  }

  //calculate table results
  calculatetableresults1(BankLoans){
    this.TableResults = [];
    let TableResults = [];

    BankLoans.forEach(element => {
      let data = {
        BankName:element.bankName,
        InterestRate:element.interest,
        MonthlyInstallment : this.Calculation1(this.Total,this.num1,this.num2,this.num3,element.interest)
      }
      TableResults.push(data)
    });

     return  _.orderBy(TableResults, ['InterestRate'], ['asc']);

  }

  calculatetableresults2(BankLoans){
    this.TableResults = [];
    let TableResults = [];

    BankLoans.forEach(element => {
      let data = {
        BankName:element.bankName,
        InterestRate:element.interest,
        MonthlyInstallment : this.Calculation2(this.Total,this.num1,this.num2,this.num3,element.interest)
      }
      TableResults.push(data)
    });

     return _.orderBy(TableResults, ['InterestRate'], ['asc']);

  }


  Aboutus = "We are a Financial Consultancy Service dedicated for bracing people to achieve their financial requirements. Through our web platform, we provide our users with a comparison of the internet available financial information from different financing institutes. Further, we take steps to match any user having a financial requirement with representatives from Sri Lankan Financial Institutes which cater a requirement under consideration."
  Disclaimer = "All the financial rates available in this web site is from publicly available information posted by banks and financial institutions is Sri Lanka. We only provide a comparison of those. Please note that there can be differences between actual rates and the rates in the web site due to various reasons. All the information you are submitting to the website as loan requests are distributed among selected representatives of banks and financial institutions of Sri Lanka. None of those members are employed in mon.lk and we are not responsible for any kind of activity performed by those members. This is a totally free service and please don’t pay money to unknown people. Always contact respective banks or financial institutions to get most recent rates and information. This is only to get an understanding."
}
