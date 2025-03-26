const titleElement = document.querySelector('#title')
const createBtn = document.querySelector('#create')
const listElement = document.querySelector('#list')

const notes = [{
  note: 'talk\'s about arrays',
  statusCompleted: false,
  index: 0,
},
{
  note: 'give theory abot objects',
  statusCompleted: true,
  index: 1,
}, ]

function getTemplateNote(notes, index) {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span class="${notes.statusCompleted ? 'text-decoration-line-through' : ''}">${notes.note}</span>
      <span>
        <span class="btn btn-small btn-${notes.statusCompleted? 'warning': 'success'}" data-index="${index}" data-type="checked">&check;</span>
        <span class="btn btn-small btn-danger" data-index="${index}" data-type="removed">&times;</span>
      </span>
    </li>`
}

function renderNotes() {  
  listElement.innerHTML = ''
  if(notes.length === 0) {
    listElement.innerHTML = '<li class="list-group-item">No notes</li>'    
  } 
   
  for(let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML('beforeend', getTemplateNote(notes[i], i))
  }
}
  

renderNotes()


createBtn.addEventListener('click', () => {
  if(titleElement.value === '') return
  

  const newNote = {
    note: titleElement.value,
    statusCompleted: false,
    index: notes.length,

  } 
  
  notes.push(newNote)
    
  listElement.insertAdjacentHTML('beforeend', getTemplateNote(newNote, newNote.index)) 
  

})

listElement.addEventListener('click', (event) => {
  if(event.target.dataset.index){
    const index = event.target.dataset.index
    const type = event.target.dataset.type
    
    if(type === 'checked') {        
        notes[index].statusCompleted = !notes[index].statusCompleted
        
    } else if(type === 'removed') {
        notes.splice(index, 1)
    }
    renderNotes()
  }


})


