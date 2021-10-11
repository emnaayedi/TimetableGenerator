import { Component, OnInit, Input } from '@angular/core';
import { NiveauService } from '../shared/niveau.service';
import { GroupeService } from '../shared/groupe.service';
import { FiliereService } from '../shared/filiere.service';
import { MatierEnsService } from '../shared/matier-ens.service';
import { ClasseService } from '../shared/Classe.service';
import { MatiereService } from '../shared/matiere.service';
import { EnseignantService } from '../shared/enseignant.service';
import { SalleService } from '../shared/salle.service';
import {MatDialogModule, MatDialog,MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as $ from 'jquery';
import { SeanceService } from '../shared/seance.service';
import { CalendarOptions, diffWholeWeeks } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import momentPlugin from '@fullcalendar/moment'
import * as moment from 'moment';

import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { now } from 'jquery';
import { SeanceComponent } from '../seance/seance.component';
import { Router } from '@angular/router';
import { Color } from 'angular-bootstrap-md';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Evenement } from 'src/models/evenement';



@Component({
  selector: 'app-emploi',
  templateUrl: './emploi.component.html',
  styleUrls: ['./emploi.component.css']
})
export class EmploiComponent implements OnInit{
  cheminImage:any = "../images/s42.jpg";
  email: string;
  x:number =0;
  y:number=0;
  z:number=0;
  today: Date;
  today7: Date;
  d11: number;
  today0: Date;
  div1:boolean=false;
  classeForms : FormArray = this.fb.array([]);

  seanceForms : FormArray = this.fb.array([]);
  seanceList= [];
  notification = null;
  public dateTimeRange: any;
  posts = [];
  niveau: string[];  
    groupe: string[]; 
    classe: string[];  
    filiere: string[];  
    seance: string[];
    matiere:string[];
    enseignant:string[];
    salle:string[];
    static nom:string;
    static code:number;
    static nomGroup:string;
    static idGroup:number;
    static niveau:number;
    static valueN:number;
    static nomEns:string;
    static codeEns:number;
   private event:Evenement;
static is:boolean=false;
    EmploiComponent = EmploiComponent;
    
  calendarOptions: CalendarOptions = {
  expandRows:true
  
  }
  grp: boolean=false;
  ens: boolean=false;
  back: any;
  handleDateClick(arg) {
    alert('date click! ' + arg.date);
    console.log(arg);
  }
  
     
    
  
    
  constructor(private router: Router,private dialog: MatDialog,private matierEnsService:MatierEnsService,private classeService:ClasseService,private enseignantService:EnseignantService,private salleService:SalleService,private fb: FormBuilder ,private matiereService:MatiereService,private niveauService : NiveauService,private seanceService : SeanceService,private groupeService : GroupeService, private filiereService : FiliereService) { 
 
    this.router.routeReuseStrategy.shouldDetach(undefined);
    
  }
  
  
  ngOnInit() { 
    
  
    this.enseignantService.getEnseignantList().subscribe(  
      data => {  
       this.enseignant = data as string [];  
      }  
    );  
    this.groupeService.getGroupeList().subscribe(  
      data => {  
       this.groupe = data as string [];  
      }  
    );  
    
    this.classeService.getClasseList().subscribe(  
      data => {  
       this.classe = data as string [];  
      }  
    );  
    this.niveauService.getNiveauList().subscribe(  
      data => {  
       this.niveau = data as string [];  
      }  
    );  this.filiereService.getFiliereList().subscribe(  
      data => {  
       this.filiere = data as string [];  
      }  
    );  
   
    this.seanceService.getSeanceList().then(  
      
      data => {   (data['_embedded']['evenements']).forEach((seance: any) => {
        this.seanceForms.push(this.fb.group({
         id : [seance.id],
         titre : [seance.titre],
         lieu : [seance.lieu ],
        dateDebut : [seance.dateDebut ],
        dateFin : [seance.dateFin ],

    }));
  
    
  
 setTimeout(() => {
  this.notification = null;
}, 1000);


});});
this.ss();
this.sa();
}

addSeanceForms(){
  this.seanceForms.push(this.fb.group({
    id : [0],
    titre : ['',Validators.required],
   lieu : ['',Validators.required],
   dateDebut : ['',Validators.required],
   dateFin : ['',Validators.required],  }));
}
openModal(id: string) {
  this.seanceService.open(id);
}

closeModal(id: string) {
  this.seanceService.close(id);
  window.location.reload();
}
openDialog(): void {
  const dialogRef = this.dialog.open(SeanceComponent, {
    width: '1200px',
    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    this.email = result;
  });
}
sa(){    
  setTimeout(() => {
   this.calendarOptions = {
    plugins: [ momentPlugin,timeGridPlugin ],
    initialView: 'timeGridWeek',
    slotDuration: '00:30',slotMinTime:'08:00:00',slotMaxTime:'19:00:00'
  ,
  slotMinWidth:100,
 

 
  contentHeight: 700,
  hiddenDays:[0],

  dayHeaderFormat: this.dayHeaderFormatUsingMoment,
  dateClick: this.handleDateClick.bind(this),


  
 expandRows:true,
 aspectRatio: 1.5,
 events:this.posts,

 
  };
  }, 3000);

  }
 

  recordSubmit(fg : FormGroup){
    if (fg.value.id == 0){


      this.seanceService.PostSeanceList(fg.value)
             .then((res : any) => {
               console.log(res);
                 fg.patchValue({id :res['id']});
                 this.showNotification('insert');
                 console.log("fg.value", fg.value);
 
             });}
     else{
     this.seanceService.PutSeanceList(fg.value).then((res: any) => {
      console.log(res);
         this.showNotification('update');
       }); }
  
  }
  

  onDelete(id, i) {
   if (id== 0)
     this.seanceForms.removeAt(i);
   else if (confirm('Are you sure to delete this record ?'))
     this.seanceService.deleteSeanceList(id).then(
      (res: any)=> {
        console.log(res);
         this.seanceForms.removeAt(i);
         this.showNotification('delete');
       });
  }
    
ss(){
  this.posts=[]
  setTimeout(() => {
    function checkTime(i) {
      return (i < 10) ? "0" + i : i;
  }
    //Api call to get data from php file
  
    return this.seanceService.getSeanceList().then(data => {(data['_embedded']['evenements']).forEach((seance: any) =>{
        let s=seance.dateDebut;
        let newDate=new Date(s)
        this.today=new Date();
        let dd=this.today.getDay();
         this.d11= this.today.getDate();
         this.today7=new Date();
         this.today7.setDate(this.d11-dd+6);
         this.today0=new Date();
         this.today0.setDate(this.d11-dd);
        let x =newDate.getDay();
        console.log(x);
      
        this.today.setDate(checkTime(x+this.d11-dd));
        let year =new Date().getFullYear();
        let month=checkTime(new Date().getMonth()+1); 
       let day=checkTime(this.today.getDate());
        let d=checkTime(newDate.getHours());
        let m=checkTime(newDate.getMinutes());
        let se=checkTime(newDate.getMinutes());
        let s1=seance.heureFin;
        let newDate1=new Date(s1)
        let d1=checkTime(newDate1.getHours());
        let m1=checkTime(newDate1.getMinutes());
        let se1=checkTime(newDate1.getMinutes());
        if( x==1 || x==4){this.back='#0239b0';}
        else if( x==2|| x==6){this.back='#b0028d'}
        else if ( x==3 || x==5){this.back='#b0024d'}
        // else if ( (x==1&&(d=="10" ||d=="16"))||(x==4&&(d=="10" ||d=="16"))){this.back='#02a1b0'}
        // else if ( (x==2&&(d=="10" ||d=="16"))||(x==5&&(d=="10" ||d=="16"))){this.back='#87b002'}
        // else if( (x==3&&(d=="10" ||d=="16"))||(x==6&&(d=="10" ||d=="16"))){this.back='#d6cf3e'}
                this.posts.push({backgroundColor: this.back,title:seance.titre+"\n"+seance.lieu+"\n",start:seance.dateDebut,end:seance.dateFin});
          console.log(this.posts);})});
        }
         
, 2000); }
showNotification(category) {
 switch (category) {
   case 'insert':
     this.notification = { class: 'text-success', message: 'saved!' };
     break;
   case 'update':
     this.notification = { class: 'text-primary', message: 'updated!' };
     break;
   case 'delete':
     this.notification = { class: 'text-danger', message: 'deleted!' };
     break;

   default:
     break;
 }
 
  }
  
  dayHeaderFormatUsingMoment(info) {
   
    return moment(info.date.marker).format("dddd"); //output : Tue, 21/07/2020
}

public SearchFil($event) {
  
  this.x+=1;

  console.log(this.x);
  if(EmploiComponent.valueN!=null && EmploiComponent.idGroup!=null || this.x>1){
    
    this.ss();
    this.sa();}
 
  
 
  let id = $event.target.options[$event.target.options.selectedIndex].text;
  EmploiComponent.nom=id;
  EmploiComponent.code=parseInt($event.target.value);
  let xcode=$event.target.value;
  console.log(EmploiComponent.nom);
  return xcode;

}
public SearchGroup($event) {
  this.y+=1;
  
  console.log(this.y);
  if(EmploiComponent.valueN!=null && EmploiComponent.code!=null || this.y>1){
  this.ss();
  this.sa();}
  let id = $event.target.options[$event.target.options.selectedIndex].text;
  EmploiComponent.nomGroup=id;
  EmploiComponent.idGroup=parseInt($event.target.value);
  let xcode=$event.target.value;
  console.log(EmploiComponent.nomGroup);
  return xcode;

}

public SearchNiveau($event){
  this.z+=1;console.log(this.z);
  
  if(EmploiComponent.idGroup!=null && EmploiComponent.code!=null || this.z>1){
    this.ss();
    this.sa();}
  

  
 let id = $event.target.options[$event.target.options.selectedIndex].text;
 EmploiComponent.niveau=id;
 EmploiComponent.valueN=parseInt($event.target.value);
  let xcode=$event.target.value;
  console.log(EmploiComponent.niveau);
  return xcode;
}
public SearchEns($event) {  
  this.ss();
  this.sa();
  let id = $event.target.options[$event.target.options.selectedIndex].text;
  EmploiComponent.nomEns=id;
  EmploiComponent.codeEns=parseInt($event.target.value);
  let xcode=$event.target.value;
  console.log(EmploiComponent.codeEns);
  return xcode;


}

openChoice(is){
  if(is==false){
    
    EmploiComponent.is=true;
  }
  else{
   EmploiComponent.is=false;
  }
  return EmploiComponent.is;
 
  
}
openChoiceEns(){
  this.grp=false;
  this.ens=true;
}

}