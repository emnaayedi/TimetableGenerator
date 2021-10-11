import { Evenement } from "./evenement";

export class Enseignant{
  id: string;
  cin: string;
  name: string;
  nom: string;
  prenom: string;
  cv: string;
  type: string;
  email:string;
  dateNaissance:Date;
  etablissement:string;
  grade:string;
  password:string;
  pubs: any;
  events: Evenement[];
  outils: any;
}
