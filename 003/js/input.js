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

  get interval(){
    return 10
  }

  set_event(){
    if(typeof window.ontouchstart !== 'undefined'){
      this.table.addEventListener('touchstart' , this.touchstart.bind(this))
      this.table.addEventListener('touchmove'  , this.touchmove.bind(this))
      this.table.addEventListener('touchend'   , this.mouseup.bind(this))
    }
    else{
      this.table.addEventListener('mousedown'  , this.mousedown.bind(this))
      this.table.addEventListener('mousemove'  , this.mousemove.bind(this))
      this.table.addEventListener('mouseup'    , this.mouseup.bind(this))
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
    if(size < this.interval){return}
    const num  = this.pos2num(size)
    this.data.cell.textContent = num || ''
    this.data.num = num
    this.data.move_flg = true
  }

  mouseup(e){
    if(!this.data){return}
    if(!this.data.move_flg){
      this.data.num = this.next_num
    }
    this.data.cell.textContent = this.data.num
    delete this.data
  }

  // 移動距離を0~9の数値に変換する
  pos2num(pos){
    const num      = ~~(pos / this.interval)
    return num > 9 ? num % 10 : num
  }
}