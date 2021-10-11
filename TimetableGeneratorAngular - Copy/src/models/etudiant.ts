import { Enseignant } from "./enseignant";

export class Etudiant{
  id: string;
  cin: string;
  name: string;
  nom: string;
  prenom: string;
  dateInscription: Date;
  cv: string;
  type: string;
  email:string;
  dateNaissance:Date;
  diplome:string;
  sujet:string;
  password:string;
  encadrant:Enseignant;
  pubs: any;
  events: any;
  outils: any;

}