import { Main } from '../main.js'

export class Input{
  constructor(){
    this.set_event()
  }

  get table(){
    return document.getElementById(Main.stage_id)
  }

  get next_num(){
    if(!this.data){return null}
    const next_num = this.data.num + 1
    return next_num > 9 ? 0 : next_num
  }

  set_event(){
    this.table.addEventListener('mousedown' , this.mousedown.bind(this))
    this.table.addEventListener('mousemove' , this.mousemove.bind(this))
    this.table.addEventListener('mouseup'   , this.mouseup.bind(this))
  }

  mousedown(e){
    const cell = e.target.closest('td')
    if(!cell){return}
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
    if(!this.data){return}
    const size = Math.abs(e.pageX - this.data.pos.x)
    const num  = this.pos2num(size)
    this.data.cell.textContent = num || ''
    this.data.num = num
    this.data.move_flg = true
  }

  mouseup(e){
    if(!this.data){return}
    if(!this.data.move_flg){
      const next_num = this.next_num
      if(next_num === null){return}
      this.data.cell.textContent = this.next_num || ''
    }
    delete this.data
  }

  // 移動距離を0~9の数値に変換する
  pos2num(pos){
    const interval = 10
    const num      = ~~(pos / interval)
    return num > 9 ? num % 10 : num
  }
}