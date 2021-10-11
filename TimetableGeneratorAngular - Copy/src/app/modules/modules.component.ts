import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModuleService } from '../shared/module.service';
import { MatiereService } from '../shared/matiere.service';
import { FiliereService } from '../shared/filiere.service';

import { SeanceService } from '../shared/seance.service';

import { Matiere } from '../matiere/matiere';
import { Module } from './module';
//import { ModComponent } from '../mod/mod.component'
import {MatDialogModule, MatDialog,MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import {Enseignant} from 'src/models/enseignant';
import {Etudiant} from 'src/models/etudiant';
import { Publication } from 'src/models/publication';
import { Outil } from 'src/models/outil';
import { Evenement } from 'src/models/evenement';
import { Member_evenement } from 'src/models/member_evenement';


@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {
  etudiantForms : FormArray = this.fb.array([]);
  enseignantForms : FormArray = this.fb.array([]);
  moduleForms : FormArray = this.fb.array([]);
  filierForms : FormArray = this.fb.array([]);
  even_member_Forms : FormArray = this.fb.array([]);

  notification = null;
  static etudiantChoice: boolean=false;
  static enseignantChoice: boolean=false;
  static password:string;
  etudiantList:Etudiant[];
  enseignantList:Enseignant[];
  event_memberList:Member_evenement[];

  module: string[];  
  matiere: string[];  
  filiere: string[];  
  niveau:string[];
  static nom:string;
  static code:number;
  static niveau:number;
  static valueN:number;
  isHiddenNiv: boolean=false;
  isHiddenFil: boolean=false;
  matiereList:Matiere[];
  moduleList:Module[];
  pubList:Publication[];
  outilList:Outil[];
  eventList:Evenement[];
  static fil:number;
  static niv:number;
  ModulesComponent = ModulesComponent;
  email:string;
 static open: boolean=false;
 seanceForms : FormArray = this.fb.array([]);
 seanceList= [];

 static selectNiv: boolean=false;
 static selectFil: boolean=false;

 openAff:boolean =false;
 close:boolean =true;
 isSelectedAffiche:boolean=false;
 static val: number;
static  is:boolean=false;
 static x: number=0;
 isHiddenMod: boolean=false;

 static repeat: number=0;

  constructor(private dialog: MatDialog,private fb: FormBuilder,
    private moduleService : ModuleService, private matiereService : MatiereService,
    private filiereService : FiliereService,private seanceService:SeanceService ,private router: Router) { 
      this.router.routeReuseStrategy.shouldDetach(undefined);
}
  ngOnInit() {  
    
     
    
   this.seanceService.getSeanceList().then(  
      
    data => {   (data['_embedded']['evenements']).forEach((seance: any) => {
      this.seanceForms.push(this.fb.group({
       id : [seance.id],
       titre : [seance.titre],
       lieu : [seance.lieu ],
      dateDebut : [seance.dateDebut ],
      dateFin : [seance.dateFin ],

  }))});


    this.filiereService.getFiliereList()
    .subscribe(res => {
    
      {
       //generate formarray as per the data received from Filiere table
       (res as []).forEach((filiere: any) => {
         this.filierForms.push(this.fb.group({
           CodeFil : [filiere.codeFil],
           NomFil : [filiere.nomFil,Validators.required]
         }));
       });
     }
   }
 );  



    this.filiereService.getFiliereList().subscribe(  
      data => {  
       this.filiere = data as string []; 
       
      }  
    );  
 
    this.moduleService.getOutilList().then(  
          
      outils => {  this.outilList= outils['_embedded']['outilBeans'];
       
  
    });
    this.moduleService.getPubList().then(  
      
      pubs => {     this.pubList= pubs['_embedded']['publicationBeans'];
       
  
    });
    this.moduleService.getEventList().then(  
          
      events => { console.log(events); this.eventList= events['_embedded']['evenementBeans'];
       
  
    }); this.moduleService.getAllEtudiants()
    .then(
        members => {
            this.etudiantList = members;
            console.log(this.etudiantList);
            return this.etudiantList;
            //console.log('this.users[0].firstName=' + this.matiere[0].codeMat+this.matiere[0].nomMat);
        },
        err => {
                // Log errors if any
            })
          });

this.moduleService.getAllEnseignants()
    .then(
        members => {
            this.enseignantList = members;
            console.log(this.enseignantList);
            return this.enseignantList;
            //console.log('this.users[0].firstName=' + this.matiere[0].codeMat+this.matiere[0].nomMat);
        });
  this.getListMat(); 
  this.seanceService.getSeanceList().then(seance=>{this.seanceList=seance;return this.seanceList;});
  

  
  } 
 

 

  openChoiceEtudiant(){
    ModulesComponent.enseignantChoice=false;
    ModulesComponent.etudiantChoice=true;
    this.choiceEtudiant();
    
  }
  openChoiceEnseignant(){
    ModulesComponent.etudiantChoice=false;
    ModulesComponent.enseignantChoice=true;
    this.ChoiceEnseignant();
  }

  public choiceEtudiant() {
    this.etudiantForms.clear();
    for(let i=0;i<this.etudiantList.length;i++){
        
        this.etudiantForms.push(this.fb.group({
          id : [this.etudiantList[i].id],
          cin : [this.etudiantList[i].cin],
          nom : [this.etudiantList[i].nom],
          prenom : [this.etudiantList[i].prenom],
          dateNaissance : [this.etudiantList[i].dateNaissance],
          dateInscription : [this.etudiantList[i].dateInscription],
          email : [this.etudiantList[i].email],
          //cv : [this.etudiantList[i].cv],
          diplome : [this.etudiantList[i].diplome],
          sujet : [this.etudiantList[i].sujet],
          password : [this.etudiantList[i].password],
          encadrant : [this.etudiantList[i].encadrant],


        }));
      
  }

  }

  public ChoiceEnseignant() {
    this.enseignantForms.clear();
    for(let i=0;i<this.enseignantList.length;i++){

        this.enseignantForms.push(this.fb.group({
          id : [this.enseignantList[i].id],
          cin : [this.enseignantList[i].cin],
          nom : [this.enseignantList[i].nom],
          prenom : [this.enseignantList[i].prenom],
          dateNaissance : [this.enseignantList[i].dateNaissance],
          email : [this.enseignantList[i].email],
         // cv : [this.enseignantList[i].cv],
          grade : [this.enseignantList[i].grade],
          etablissement : [this.enseignantList[i].etablissement],

        }));
      
  } 


  }

  
  addModuleFormsEtudiant(){
    this.etudiantForms.push(this.fb.group({
      
      id : [0],
      cin : ['',Validators.required],
      nom : ['',Validators.required],
      prenom : ['',Validators.required],
      dateNaissance : ['',Validators.required],
      email : ['',Validators.required],
     // CV : ['',Validators.required],
      diplome : ['',Validators.required],
      sujet : ['',Validators.required],
      dateInscription : ['',Validators.required],
      encadrant : ['',Validators.required],

    }));
  }

  addModuleFormsEnseignant(){
    this.enseignantForms.push(this.fb.group({
      
      id : [0],
      cin : ['',Validators.required],
      nom : ['',Validators.required],
      prenom : ['',Validators.required],
      dateNaissance : ['',Validators.required],
      email : ['',Validators.required],
     // CV : ['',Validators.required],
      grade : ['',Validators.required],
      etablissement : ['',Validators.required],

        
    }));
  }
 

  getPassword(password){
    ModulesComponent.password=password;
  }
  recordSubmitEtudiant(fg : FormGroup){
    if (fg.value.id == 0){
      fg.value.password="0000";
      this.moduleService.PostEtudiantList(fg.value)
             .then((res : any) => {
                 fg.patchValue({id :res['id']})
                 this.showNotification('insert');
                 console.log("fg.value", fg.value);
 
             });}
     else{
       //console.log("passwd:  "+ ModulesComponent.password);
     
     this.moduleService.PutEtudiantList(fg.value).then((res: any) => {
         this.showNotification('update');
       });
   }}

   recordSubmitEnseignant(fg : FormGroup){
    if (fg.value.id == 0){
      fg.value.password="0000";

      this.moduleService.PostEnseignantsList(fg.value)
             .then((res : any) => {
                 fg.patchValue({id :res['id']})
                 this.showNotification('insert');
                 console.log("fg.value", fg.value);
 
             });}
     else{
     this.moduleService.PutEnseignantsList(fg.value).then((res: any) => {
         this.showNotification('update');
 });
       }}


   onDeleteEnseignant(id, i) {
    if (id== 0)
      this.enseignantForms.removeAt(i);
    else if (confirm('Are you sure to delete this record ?'))
      this.moduleService.deleteMemberList(id).then(
       (res: any)=> {
         console.log(res);
          this.enseignantForms.removeAt(i);
          this.showNotification('delete');
        });
   }
   onDeleteEtudiant(id, i) {
    if (id== 0)
      this.etudiantForms.removeAt(i);
    else if (confirm('Are you sure to delete this record ?'))
      this.moduleService.deleteMemberList(id).then(
       (res: any)=> {
         console.log(res);
          this.etudiantForms.removeAt(i);
          this.showNotification('delete');
        });
   }

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
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }
  


public SearchF($event) {
  ModulesComponent.selectFil=true;
  ModulesComponent.fil=parseInt($event.target.value);
  console.log(ModulesComponent.fil);
  return ModulesComponent.fil;
}

 public SearchFil($event) {
     let id = $event.target.options[$event.target.options.selectedIndex].text;
     ModulesComponent.nom=id;
     ModulesComponent.code=$event.target.value;
     let xcode=$event.target.value;
     //console.log(ModulesComponent.code);
     if(xcode==0){this.isHiddenFil=false;}
     else{this.isHiddenFil=true;}
     return ModulesComponent.code,xcode;

 }

public SearchNiveau($event){
    let id = $event.target.options[$event.target.options.selectedIndex].text;
     ModulesComponent.niveau=id;
     ModulesComponent.valueN=$event.target.value;
     let xcode=$event.target.value;
     if(xcode==0){this.isHiddenNiv=false;}
     else { this.isHiddenNiv=true; }
     //console.log(ModulesComponent.valueN);
     return ModulesComponent.valueN,xcode;
 }

 public getListMat() {
       this.matiereService.getUsers()
           .subscribe(
               users => {
                   this.matiereList = users;
                   //console.log(this.matiereList);
                  return this.matiereList;
                   //console.log('this.users[0].firstName=' + this.matiere[0].codeMat+this.matiere[0].nomMat);
               },
               err => {
                       // Log errors if any
                   })
                 }
affecterPartToEvent(fggg : FormGroup,fg:FormGroup){
  console.log(fg.value);
  console.log(fggg.value);
  this.moduleService.affecterparticipanttoevenement(fg.value,fggg.value);
}          
addEvent_MemberForms(is){
  if(is==false){
    ModulesComponent.is=true;
    this.even_member_Forms.push(this.fb.group({
    id:['']
     }));}
     else{
      ModulesComponent.is=false;
    }
    return ModulesComponent.is;

  }



openDialog(open,id)  { 
  if(open==false){
    ModulesComponent.open=true;
    try{this.seanceService.getSenaceByMember(id).then(  
      seance=>    {   for(let i=0;i<seance.length;i++){
        
        this.even_member_Forms.push(this.fb.group({
        id : [seance[i].id],
  
    }))}});}
    catch{}
  }
  else{
    ModulesComponent.open=false;
  }
  return ModulesComponent.open;
}

/***********************************************/
public SearchNiv($event,x:number) {
  ModulesComponent.selectNiv=true;
  ModulesComponent.niv=parseInt($event.target.value);
  this.moduleForms.clear();
  for(let i=0;i<this.moduleList.length;i++){
    if ((this.moduleList[i].codeFil==x)&&(this.moduleList[i].idNiv==ModulesComponent.niv)){

      this.moduleForms.push(this.fb.group({
        IdMod : [this.moduleList[i].idMod,Validators.required],
        CodeFil : [this.moduleList[i].codeFil,Validators.required],
        IdNiv: [this.moduleList[i].idNiv,Validators.required],
        NomMod: [this.moduleList[i].nomMod,Validators.required]
      }));
    }
} 
if(ModulesComponent.niv==0){
  this.isHiddenMod=false;
  this.close=false;
}
else{
  this.isHiddenMod=true;

}
ModulesComponent.val=x;
if(this.openAff==false){
  this.openAff=true;
}

//this.openAff=true;

 if (this.close==false){
  this.close=true;
}
console.log(this.close);

     return this.moduleForms,ModulesComponent.niv;
  
}

/************************************************************* */

openDialogAffichier(x:number){
  this.moduleForms.clear();
  for(let i=0;i<this.moduleList.length;i++){
    if ((this.moduleList[i].codeFil==x)&&(this.moduleList[i].idNiv==ModulesComponent.niv)){

      this.moduleForms.push(this.fb.group({
        IdMod : [this.moduleList[i].idMod,Validators.required],
        CodeFil : [this.moduleList[i].codeFil,Validators.required],
        IdNiv: [this.moduleList[i].idNiv,Validators.required],
        NomMod: [this.moduleList[i].nomMod,Validators.required]
      }));
    }
} 
ModulesComponent.val=x;
ModulesComponent.niv=0;
if(this.openAff==false){
  this.openAff=true;
}

//this.openAff=true;

 if (this.close==false){
  this.close=true;
}
console.log(this.close);

     return this.moduleForms;

}

/**************************************************************** */

onNoClick(){
  if (this.close==true){
      this.close=false;
  }
  
  this.openAff=true;


}



}