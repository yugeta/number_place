import { View }   from './view.js'
import { System } from './system.js'

export const Main = {}

function init(){
  Main.view   = new View()
  Main.system = new System()
}

switch(document.readyState){
  case 'complete':
  case 'interactive':
    init()
    break
  default:
    window.addEventListener('load' , init)
    break
}