import { Main }    from '../main.js'
import { Common }  from './common.js'

export class Check{
  constructor(){
    this.datas = Common.get_matrix_numbers('all')
    this.judgement()
  }

  judgement(){
    if(this.check_empty()
    || this.check_error_horizon()
    || this.check_error_vertical()
    || this.check_error_cube()){
      this.fail()
    }
    else{
      this.correct()
    }
  }

  // 空欄がある場合にtrueを返す
  check_empty(){
    for(const data of this.datas){
      const empty_lists = data.filter(e => !e)
      if(empty_lists.length){
        this.status = 'empty'
        return true
      }
    }
  }

  // 横一列に重複数値がある場合はtrueを返す
  check_error_horizon(){
    for(const data of this.datas){
      if(this.check_over(data)){
        this.status = 'horizon'
        return true
      }
    }
  }

  // 縦一列に重複数値がある場合はtrueを返す
  check_error_vertical(){
    const pivot_datas = this.convert_pivot_datas(this.datas)
    for(const data of pivot_datas){
      if(this.check_over(data)){
        this.status = 'vertical'
        return true
      }
    }
  }

  // 3x3の枠内に重複数値がある場合はtrueを返す
  check_error_cube(){
    const cube_datas = this.convert_cube_datas(this.datas)
    for(const data of cube_datas){
      if(this.check_over(data)){
        this.status = 'cube'
        return true
      }
    }
  }

  // 配列内の重複確認
  check_over(arr){
    const res = arr.filter((a,b,c)=>{return c.indexOf(a) === b && b !== c.lastIndexOf(a)})
    return res.length ? true : false
  }

  // ２重配列の縦横を入れ替える
  convert_pivot_datas(datas){
    const pivot_datas = []
    for(let i=0; i<datas.length; i++){
      for(let j=0; j<datas[i].length; j++){
        pivot_datas[j] = pivot_datas[j] || []
        pivot_datas[j].push(datas[i][j])
      }
    }
    return pivot_datas
  }

  // 3x3毎のブロックで配列を組み直す
  convert_cube_datas(datas){
    const cube_datas = []
    let x,y,num
    for(let i=0; i<datas.length; i++){
      x = ~~(i/3)
      for(let j=0; j<datas[i].length; j++){
        y = ~~(j/3)
        num = x * 3 + y
        cube_datas[num] = cube_datas[num] || []
        cube_datas[num].push(datas[i][j])
      }
    }
    return cube_datas
  }

  fail(){
    Main.view.error()
  }

  correct(){
    Main.data.save_clear()
    Main.view.correct()
  }
}