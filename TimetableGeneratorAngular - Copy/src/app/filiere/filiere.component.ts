

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { FiliereService } from '../shared/filiere.service';
import { Filiere } from './filiere';
import {  Classe } from './classe';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GroupeService } from '../shared/groupe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from '../shared/Classe.service';
import { NiveauService } from '../shared/niveau.service';


@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.css']
})
export class FiliereComponent implements OnInit {
  
  filierForms : FormArray = this.fb.array([]);
  filiereList:Filiere[];  
  classe: string[];  
  notification = null;
  notificationG = null;
  classList:Classe[];
  gl:Classe[]=[];
  niveau: string[];  
  groupe: string[]; 
  static nomGroup:string;
  static idGroup:number;
  static niveau:number;
  static valueN:number;
  classForms : FormArray = this.fb.array([]);
  static fil:number;
   open:boolean =false;
  static select:boolean =false;
  static  val:number;
  FiliereComponent=FiliereComponent;
  static clickAdd:boolean=false;
x:boolean=false;
y:boolean=false;
test:string;
  constructor(private niveauService : NiveauService,private groupeService : GroupeService,private classeService:ClasseService,private fb: FormBuilder,
     private filiereService : FiliereService,private router: Router) { 
      this.router.routeReuseStrategy.shouldDetach(undefined);
}
   

  ngOnInit() {
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
    );  

    this.filiereService.getFiliereList()
    .subscribe(res => {
     if (res == [])
          this.addFiliereForms();
     else {
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

 this.classeService.getClasseList()
       .subscribe(ress => {
        console.log(ress);

        if (ress == [])
             this.addClassForms();
     
      }
    );  

    this.getListFil();  this.getListClas();

  }

  public getListFil() {
    this.filiereService.getFil()
        .subscribe(
            users => {
             this.filiereList = users;
             console.log(this.filiereList);
              
            },
           
            err => {
                  
                })
              }

  public getListClas() {
                this.classeService.getClass()
                    .subscribe(
                        users => {
                         this.classList = users;
                         console.log(this.classList);
                          
                          
                        },
                         //Bind to view
                        err => {
                                // Log errors if any
                            })
                          }
 
  
  addFiliereForms(){
    this.filierForms.push(this.fb.group({
      CodeFil : [0],
      NomFil : ['',Validators.required]
    }));
  }

  addClassForms(){
  

    console.log("okkkk");
    FiliereComponent.clickAdd=true;
    this.classForms.push(this.fb.group({
      GroupeId : [0],
      NiveauId:[0],
      FiliereId : [0]
    }));
   

  }


  recordSubmit(fg : FormGroup){
    if (fg.value.CodeFil == 0){

     this.filiereService.PostFiliereList(fg.value)
            .subscribe((res : any) => {
                fg.patchValue({CodeFil :res.codeFil})
                this.showNotification('insert');

            }); 
          } 
    else
    this.filiereService.PutFiliereList(fg.value).subscribe(
      (res: any) => {
        this.showNotification('update');
      });
  }

  onDelete(CodeFil, i) {
    if (CodeFil == 0)
      this.filierForms.removeAt(i);
    else if (confirm('Are you sure to delete this record ?'))
      this.filiereService.deleteFiliereList(CodeFil).subscribe(
        res => {
          this.filierForms.removeAt(i);
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

  showNotificationG(category) {
    switch (category) {
      case 'insert':
        this.notificationG = { class: 'text-success', message: 'saved!' };
        break;
      case 'update':
        this.notificationG = { class: 'text-primary', message: 'updated!' };
        break;
      case 'delete':
        this.notificationG = { class: 'text-danger', message: 'deleted!' };
        break;

      default:
        break;
    }
    setTimeout(() => {
      this.notificationG = null;
    }, 3000);
  }



 
  recordSubmitG(fgg : FormGroup){
if(  FiliereComponent.select==true){fgg.value.FiliereId=FiliereComponent.fil;}
    fgg.value.GroupeId=FiliereComponent.idGroup;
    fgg.value.NiveauId=FiliereComponent.valueN;
    console.log(fgg.value);
   
    if (fgg.value.FiliereId == 0 && fgg.value.GroupeId==0 && fgg.value.NiveauId==0 ){

     this.classeService.PostClasseList(fgg.value)
            .subscribe((res : any) => {
                fgg.patchValue({FiliereIdl:res.filiereId})
                this.showNotificationG('insert');

            });
          } 
    else
    this.classeService.PutClasseList(fgg.value).subscribe(
      (res: any) => {
        this.showNotificationG('update');
      });
     this.classeService.PostClasseList(fgg.value)
            .subscribe((res : any) => {
                fgg.patchValue({FiliereId:res.filiereId})
                this.showNotificationG('insert');

            });
          } 
   
  

  onDeleteG(IdGroup, i) {
    if (IdGroup == 0)
      this.classForms.removeAt(i);
    else if (confirm('Are you sure to delete this record ?'))
      this.classeService.deleteClasseList(IdGroup).subscribe(
        res => {
          this.classForms.removeAt(i);
          this.showNotificationG('delete');
        });
  }

  public SearchFil($event) {
    FiliereComponent.fil=parseInt($event.target.value);
    //console.log(MatiereComponent.fil);
    FiliereComponent.select=true;
    return FiliereComponent.fil;

  }
  public SearchGroup($event) {
 this.x=true;
    let id = $event.target.options[$event.target.options.selectedIndex].text;
    FiliereComponent.nomGroup=id;
    FiliereComponent.idGroup=parseInt($event.target.value);
    let xcode=$event.target.value;

    return xcode;
  
  }
  
  public SearchNiveau($event){

  this.y=true;
    
   let id = $event.target.options[$event.target.options.selectedIndex].text;
   FiliereComponent.niveau=id;
   FiliereComponent.valueN=parseInt($event.target.value);
    let xcode=$event.target.value;
    console.log(FiliereComponent.niveau);
    return xcode;
  }
  openDialog(x:number){
    this.classForms.clear();
    for(let i=0;i<this.classList.length;i++){
      if (this.classList[i].filiereId==x){
        this.classForms.push(this.fb.group({
          GroupeId : [this.classList[i].groupeId],
          FiliereId : [this.classList[i].filiereId,Validators.required],
          NiveauId : [this.classList[i].niveauId,Validators.required],
         
        }));  console.log(this.classList);    
      }
      
  } 

  if(this.open==false){
    this.open=true;
  }
  else{
    this.open=false;
  }

    FiliereComponent.val=x;
   // this.open=false;

       console.log(FiliereComponent.val);
       return this.classForms;

  }

}