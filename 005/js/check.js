import { Main }  from '../main.js'

export class Check{
  constructor(){
    console.log('check')
  }

  calc(){

  }

  fail(){

  }

  correct(){
    Main.question_num++
  }
}