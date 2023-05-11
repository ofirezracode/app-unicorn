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
    info: { title: 'text', txt: 'Fullstack Me Baby!' },
  },
  {
    id: 'n102',
    type: 'img',
    isPinned: false,
    info: {
      url: 'https://images.pexels.com/photos/16678544/pexels-photo-16678544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'If you like pina colada',
    },
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
  {
    id: 'n104',
    type: 'video',
    isPinned: false,
    info: {
      title: 'The Wolven Storm',
      videoId: 'mDYqT0_9VR4',
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
  pinNote,
  extractVideoIdFromURL,
}

function query(filterBy = {}) {
  return asyncStorageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.search) {
      const regExp = new RegExp(filterBy.search, 'i')
      notes = notes.filter((note) => {
        if (note.type === 'txt') {
          if (regExp.test(note.info.title)) return true
          if (regExp.test(note.info.txt)) return true
        } else if (note.type === 'img') {
          if (regExp.test(note.info.title)) return true
        } else if (note.type === 'todos') {
          if (regExp.test(note.info.title)) return true
          if (note.info.todos.some((todo) => regExp.test(todo.txt))) return true
        } else if (note.type === 'video') {
          if (regExp.test(note.info.title)) return true
        }
        return false
      })
    }

    if (filterBy.types) {
      notes = notes.filter((note) => {
        return filterBy.types.some((type) => type === note.type)
      })
    }

    if (!filterBy.pinned) {
      let pinnedNote = notes.filter((note) => note.isPinned)
      const pinnedNoteIndex = notes.indexOf(pinnedNote[0])
      if (pinnedNoteIndex >= 0) {
        pinnedNote = notes.splice(pinnedNoteIndex, 1)
        notes.unshift(pinnedNote[0])
      }
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

function pinNote(note) {
  return query({ pinned: true }).then((res) => {
    const pinnedNote = res[0]
    if (pinnedNote) {
      if (note.id === pinnedNote.id) {
        note.isPinned = false
        return save(note)
      } else {
        pinnedNote.isPinned = false
        note.isPinned = true
        return save(pinnedNote).then(() => save(note))
      }
    } else {
      note.isPinned = true
      console.log('note', note)
      return save(note)
    }
  })
}

function extractVideoIdFromURL(url) {
  const urlParams = new URLSearchParams(new URL(url).search)
  const newVideoId = urlParams.get('v')
  if (!newVideoId) return url
  else return newVideoId
}

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
