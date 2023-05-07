export class columnDefinition{
  name:string;
  displayName:string;
  primaryKeyColumn:Boolean;

  constructor(name:string,displayName:string = "",primaryKeyColumn:Boolean=false){
    this.name= name;
    this.displayName= displayName
    this.primaryKeyColumn =  primaryKeyColumn;
  }
}
