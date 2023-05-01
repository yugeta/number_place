import { Main } from '../main.js'

export class View{
  constructor(){
    if(!this.table){return}
    this.set_stage()
  }

  get table(){
    return document.getElementById(Main.stage_id)
  }

  set_stage(){
    const table = document.createElement('table')
    this.table.appendChild(table)
    this.set_row(table)
  }
  set_row(parent){
    for(let i=0; i<9; i++){
      const row = document.createElement('tr')
      parent.appendChild(row)
      this.set_cell(row)
    }
  }
  set_cell(parent){
    for(let i=0; i<9; i++){
      const cell = document.createElement('td')
      parent.appendChild(cell)
    }
  }
}