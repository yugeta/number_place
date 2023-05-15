import { Main }    from '../main.js'
import { Element } from './element.js'
import { Common }  from './common.js'
import { Check }   from './check.js'

export class Input{
  constructor(){
    this.set_event()
  }

  get next_num(){
    if(!this.data){return null}
    const next_num = this.data.num + 1
    return next_num > 9 ? 0 : next_num
  }

  set_event(){
    const btn = Element.elm_button
    if(btn){
      btn.addEventListener('click' , this.click_btn.bind(this))
    }

    if(typeof window.ontouchstart !== 'undefined'){
      Element.table.addEventListener('touchstart' , this.touchstart.bind(this))
      Element.table.addEventListener('touchmove'  , this.touchmove.bind(this))
      Element.table.addEventListener('touchend'   , this.mouseup.bind(this))
    }
    else{
      Element.table.addEventListener('mousedown'  , this.mousedown.bind(this))
      Element.table.addEventListener('mousemove'  , this.mousemove.bind(this))
      Element.table.addEventListener('mouseup'    , this.mouseup.bind(this))
    }
  }

  touchstart(e){
    this.mousedown(e.touches[0])
  }
  touchmove(e){
    e.preventDefault()
    this.mousemove(e.touches[0])
  }

  mousedown(e){
    const cell = e.target.closest('td')
    if(!cell){return}
    if(cell.getAttribute('data-status') === 'lock'){return}
    this.data = {
      cell : cell,
      num  : Number(cell.textContent || 0),
      pos  : {
        x : e.pageX,
        y : e.pageY,
      },
    }
  }
  mousemove(e){
    if(this.data){
      const size = Math.abs(e.pageX - this.data.pos.x)
      if(size < Main.interval_px){return}
      const num  = this.pos2num(size)
      this.data.cell.textContent = num || ''
      this.data.num = num
      this.data.move_flg = true
    }
    else{
      // same-number
      this.check_same_number(e)
    }
  }

  mouseup(e){
    if(!this.data){return}
    if(!this.data.move_flg){
      this.data.num = this.next_num
    }
    this.data.cell.textContent = this.data.num || ''

    // same-number
    this.set_same_number(0)
    
    delete this.data
    Main.data.save_cache()
  }

  // 移動距離を0~9の数値に変換する
  pos2num(pos){
    const num = ~~(pos / Main.interval_px)
    return num > 9 ? num % 10 : num
  }

  click_btn(){
    const status = Element.elm_button.getAttribute('data-status')
    switch(status){
      case 'check':
        new Check()
        break

      case 'next':
        Main.question_num++
        Common.start()
        Main.data.save_cache()
        break;

      case 'start':
      default:
        Common.start()
        Main.data.save_cache()
        break
    }
  }

  check_same_number(e){
    const current_cell = e.target.closest('#NumberPlace td')
    if(current_cell && this.current_cell !== current_cell){
      this.current_cell = current_cell
      const current_num = Number(current_cell.textContent || 0)
      this.set_same_number(current_num)
    }
    else if(!current_cell && this.current_cell){
      this.set_same_number()
      delete this.current_cell
    }
  }
  set_same_number(current_num){
    const cell_all = document.querySelectorAll('#NumberPlace td')
    for(const cell of cell_all){
      const num = Number(cell.textContent || 0)
      if(!current_num
      || current_num !== num){
        if(cell.hasAttribute('data-same-number')){
          cell.removeAttribute('data-same-number')
        }
      }
      else if(current_num === num){
        cell.setAttribute('data-same-number' , 1)
      }
    }
  }
}