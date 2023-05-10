import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'

const notesData = [
  {
    id: 'n101',
    createdAt: 1112222,
    type: 'txt',
    isPinned: true,
    style: { backgroundColor: '#00d' },
    info: { txt: 'Fullstack Me Baby!' },
  },
  {
    id: 'n102',
    type: 'img',
    isPinned: false,
    info: { url: 'http://some-img/me', title: 'Bobi and Me' },
    style: { backgroundColor: '#00d' },
  },
  {
    id: 'n103',
    type: 'todos',
    isPinned: false,
    info: {
      title: 'Get my stuff together',
      todos: [
        { txt: 'Driving license', doneAt: null },
        { txt: 'Coding power', doneAt: 187111111 },
      ],
    },
  },
]

const NOTE_KEY = 'noteDB'

_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getDefaultFilter,
}

function query(filterBy = {}) {
  console.log('filterBy service:', filterBy)
  return asyncStorageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.type) {
      // const regExp = new RegExp(filterBy.title, 'i')
      notes = notes.filter((note) => note.title === filterBy.type)
    }
    return notes
  })
}

function get(noteId) {
  return asyncStorageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
  return asyncStorageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return asyncStorageService.put(NOTE_KEY, note)
  } else {
    return asyncStorageService.post(NOTE_KEY, note)
  }
}

// function getEmptyBook() {
//   return {
//     id: '',
//     title: '',
//     listPrice: {
//       amount: 0,
//       currencyCode: '',
//       isOnSale: false,
//     },
//   }
// }

function getDefaultFilter() {
  return { type: '' }
}

function _createNotes() {
  let notes = storageService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = []
    notesData.forEach((note) => notes.push(note))
    storageService.saveToStorage(NOTE_KEY, notes)
  }
}
