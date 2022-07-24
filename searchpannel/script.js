class TrieNode{
  constructor(ch){
    this.ch=ch
    this.end=false
    this.children={}
  }
}
insert=(word,root)=>{
  let head=root
  for (c of word){
    if (c in head.children){
        head=head.children[c]
    }else{
      let newNode = new TrieNode(c)
      head.children[c]=newNode
      head=newNode
    }
  }
  head.end=true
}
query=(word,root)=>{
  let head=root
  let match=[]
  let ans=''
  for (c of word){
    if (c in head.children){
      ans+=c
      head=head.children[c]
    }else{
      return []
    }
  }
  let que = [[head,ans]]
  while (que.length>0){
    let arr=que.shift()
    let node=arr[0]
    let str=arr[1]
    if (node.end==true){
      match.push(str)
    }
    for (child in node.children){
      que.push([node.children[child],str+child])
    }
  }
  return match
}
let root=new TrieNode('-1')
$(document).ready(()=>{

  $('#add').click(()=>{
    let name = $('#name').val()
    if (name!=''){
      $('#name').val('')
      name=name.toLowerCase()
      insert(name,root)
    }
  })
  $('#search').keyup(()=>{
    let name = $('#search').val()
    if (name!=''){
      name=name.toLowerCase()
      let result=query(name,root)
      let out=''
      for (sen of result){
        let content=`
        <li class='list-group-item'>${sen}</li>
        `
        out+=content
      }
      $('#users').html(out)
    }else{
      $('#users').html('')
    }
  })

})
