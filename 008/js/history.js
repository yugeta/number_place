import { Main }   from '../main.js'
import { Common } from './common.js'

export class History{
  constructor(){
    if(!this.is_elm){return}
    this.datas = Main.data.load_clear()
    if(this.datas && this.datas.length){
      this.add_lists()
    }
  }

  get elm(){
    return document.getElementById('NumberPlaceHistory')
  }

  get items(){
    return this.elm.querySelectorAll(':scope > *')
  }

  get is_elm(){
    return this.elm ? true : false
  }

  add_lists(){
    if(!this.is_elm){return}
    for(let i=0; i<this.datas.length; i++){
      this.add_list(i)
    }
  }

  add_list(num){
    const data = this.datas[num]
    if(!this.is_elm || !data){return}
    const div = document.createElement('div')
    div.classList.add('item')
    div.setAttribute('num' , num)
    div.innerHTML = this.set_history_value(data)
    this.elm.appendChild(div)
    div.addEventListener('click' , this.click.bind(this))
  }

  set_history_value(data){
    return `num: ${data.question_num} , count: ${data.count||0} <span class='date'>(${data.date||'--'})</span>`
  }

  click(e){
    const item = e.target.closest(`#NumberPlaceHistory .item`)
    if(!item){return}
    this.set_status_all(null)
    this.set_status(item , 'active')
    const num  = Number(item.getAttribute('num'))
    const data = this.datas.find((e,i) => i === num)
    Main.question.put_numbers(data.question)
    Common.put_number(data.input)
  }

  set_status_all(value){
    for(const item of this.items){
      this.set_status(item , value)
    }
  }
  set_status(item , value){
    if(value === null){
      if(item.hasAttribute('data-status')){
        item.removeAttribute('data-status')
      }
    }
    else{
      item.setAttribute('data-status' , value)
    }
  }

}