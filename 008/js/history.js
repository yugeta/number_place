import { Main }    from '../main.js'
import { Common }  from './common.js'
import { Element } from './element.js'

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

  get max_question_num(){
    const sort_datas = this.datas.sort((a,b)=>{
      if(a.question_num < b.question_num) return +1
      if(a.question_num > b.question_num) return -1
      return 0
    })
    if(!sort_datas || !sort_datas.length){return null}
    return sort_datas[0].question_num
  }
  get new_question_num(){
    const max_question_num = this.max_question_num
    if(max_question_num === null){return 0}
    const new_question_num = max_question_num + 1
    if(Main.question.datas[new_question_num]){
      return new_question_num
    }
    else{
      return null
    }
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
    return `game: ${data.question_num+1} , <span class='count'>${data.count||0}</span> <span class='date'>(${data.date||'--'})</span>`
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
    Main.question_num = data.question_num
    Element.table.setAttribute('data-status' , 'history-view')
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