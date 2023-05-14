import { Main }    from '../main.js'
import { Common }  from './common.js'

export class Data{
  save_cache(){
    if(!Common.is_started){return}
    const data = {
      question_num : Main.question_num,
      input        : Common.get_matrix_numbers(''),
      question     : Common.get_matrix_numbers('lock'),
    }
    const json = JSON.stringify(data)
    window.localStorage.setItem(Main.save_name , json)
  }

  load_cache(){
    const json = window.localStorage.getItem(Main.save_name)
    if(!json){return null}
    return JSON.parse(json)
  }

  del_cache(){
    window.localStorage.removeItem(Main.save_name)
  }

  save_clear(){
    if(!Common.is_started){return}
    const datas = this.load_clear()
    const save_data = {
      question_num : Main.question_num,
      input        : Common.get_matrix_numbers(''),
      question     : Common.get_matrix_numbers('lock'),
    }
    const index = datas.findIndex(e => e.question_num === Main.question_num)

    // update
    if(index === null){
      datas.push(save_data)
    }
    // new
    else{
      datas[index] = save_data
    }
    
    const json = JSON.stringify(datas)
    window.localStorage.setItem(Main.clear_name , json)
  }

  load_clear(){
    const json = window.localStorage.getItem(Main.clear_name)
    return json ? JSON.parse(json) : []
  }

  del_clear(){
    window.localStorage.removeItem(Main.clear_name)
  }
}