// VARIABEL GLOBAL
// Variabel SEMENTARA
// updatekey
// activeNav
// Variabel ELEMEN
// content
// navButtons
// Variabel STORAGE
// BOOKS_KEY
// SEARCHED_BOOK_KEY
// variabel EVENT
// LAYOUT_CHANGE
// BOOKSHELF_CHANGE


// KONFIGURASI LAYOUTING
// Bikin Tampilan Bookshelf untuk Tab Home dan Search
const createBookshelf = (books) => {
    const bookshelf = document.getElementById('bookshelf')
    if (bookshelf == null) return
    bookshelf.innerHTML = ''
    const unfinishedBookBox = document.createElement('div')
    unfinishedBookBox.innerHTML += '<h2 class="card-title bookshelf-title">Still Reading</h2>'
    const finishedBookBox = document.createElement('div')
    finishedBookBox.innerHTML += '<h2 class="card-title bookshelf-title">Finished Reading</h2>'

    
    const unfinishedBookshelf = document.createElement('div')
    const finishedBookshelf = document.createElement('div')
    unfinishedBookshelf.setAttribute('id','unfinishedBooks')
    finishedBookshelf.setAttribute('id','finishedBooks')
    unfinishedBookshelf.classList.add('bookshelf', 'card')
    finishedBookshelf.classList.add('bookshelf', 'card')
    for (book of books) {
        if (!book.finishedReading) {
            createBookDisplay(book, unfinishedBookshelf, false)
        } else {
            createBookDisplay(book, finishedBookshelf, true)
        }
    }


    unfinishedBookBox.append(unfinishedBookshelf)
    finishedBookBox.append(finishedBookshelf)
    bookshelf.append(unfinishedBookBox, finishedBookBox)
}
// Bikin Tampilan Buku untuk Bookshelf
const createBookDisplay = (book, bookshelf, isCompleted) => {
    const bookbox = document.createElement('div')
    bookbox.classList.add('book')
    bookbox.innerHTML = `<div class="book-info" id ="${book.id}">
                            <p class="book-title">${book.title}</p>
                            <p class="book-author">${book.author}</p>
                            <p class="book-year">${book.year}</p>
                        </div>`
    bookshelf.append(bookbox)
    const buttonbox = document.createElement('div')
    buttonbox.classList.add('buttonbox')

    const updatebtn = document.createElement('button')
    updatebtn.innerHTML = `<i class="fa-solid fa-wrench"></i>`
    updatebtn.classList.add('.updatebtn')
    updatebtn.addEventListener('click', (event) => {
        updateBook(book)
    })
    const trashbtn = document.createElement('button')
    trashbtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
    trashbtn.classList.add('.deletebtn')
    trashbtn.addEventListener('click', (event) => {
        deleteBook(book.id)
    })
    buttonbox.append(updatebtn)

    if (!isCompleted) {
        const finishbtn = document.createElement('button')
        finishbtn.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
        finishbtn.classList.add('.finishbookbtn')
        finishbtn.addEventListener('click', (event) => {
            transferBook(book.id)
        })
        buttonbox.append(updatebtn, finishbtn, trashbtn)
    } else {
        const undobtn = document.createElement('button')
        undobtn.innerHTML = `<i class="fa-solid fa-rotate-left"></i>`
        undobtn.classList.add('.undofinishbookbtn')
        undobtn.addEventListener('click', (event) => {
            transferBook(book.id)
        })
        buttonbox.append(updatebtn, undobtn, trashbtn)
    }
    // Fitur yang akan datang
    // bookbox.addEventListener('click', (event)=> {
    //     createBookInfo(book)
    // })
    bookbox.append(buttonbox)
}
// Bikin Tampilan Tab Search
const createSearchDisplay = () => {
    const container = document.getElementById('search')
    container.classList.add('card')
    container.innerHTML += `<h2 class="card-title">Search Books</h2>`
    const searchBox = document.createElement('form')
    searchBox.classList.add('form')
    searchBox.setAttribute('action', '#')
    searchBox.setAttribute('id', 'searchform')
    
    const formGroup = document.createElement('div')
    formGroup.classList.add('form-group', 'form-title')
    formGroup.innerHTML+= `<label for="title">Book Title</label><input type="text" id="title" name="title">`
    
    searchBox.append(formGroup)
    const searchBtn = document.createElement('button')
    searchBtn.classList.add('btn-submit')
    searchBtn.innerText = 'SEARCH BOOK'
    searchBtnBox = document.createElement('div')
    searchBtnBox.classList.add('btn-submit-box')
    searchBtnBox.append(searchBtn)
    searchBox.append(searchBtnBox)
    searchBtn.addEventListener('click', (event)=> {
        event.preventDefault();
        const bookTitle = document.getElementById('title').value
        if (bookTitle == "") {
            alert("insert title")
            return
        }
        searchBookTitle(bookTitle)
        const bookshelf = document.createElement('div')
        bookshelf.setAttribute('id', 'bookshelf')
        container.append(bookshelf)
        content.dispatchEvent(new Event(BOOKSHELF_CHANGE))
    })

    container.append(searchBox)

}
// Bikin Tampilan Form untuk Tab Add dan Update
const createBookFormDisplay = (item) => {
    type = item.getAttribute('id')
    const formBox = document.createElement('form')
    formBox.classList.add('form')
    formBox.setAttribute('action', '#')
    formBox.setAttribute('id', 'form')
    
    formBox.innerHTML = (
        `<div class="form-group form-title">
            <label for="title">Book Title</label>
            <input type="text" id="title" name="title" required>
        </div>
        <div class="form-group form-title">
            <label for="author">Author</label>
            <input type="text" id="author" name="author" required>
        </div>
        <div class="form-group form-title">
            <label for="year">Year Published</label>
            <input type="number" id="year" name="date" value="2022" required>
        </div>
        <div class="form-group form-title">
            <label for="notes">Notes</label>
            <textarea id="notes" name="notes"></textarea>
        </div>
        <div class="form-checkbox">
            <label class="checklabel" for="readstat">Mark as "Finished Book"</label>
            <input type="checkbox" id="readstat" name="readstat">
        </div>
        <div class="btn-submit-box">
            <input type="submit" value="${`${type}`.toUpperCase()} BOOK" name="Submit" class="btn-submit">
        </div>`
    ) 
    formBox.addEventListener('submit', (event) => {
        event.preventDefault();
        if (type == "add") addBook()
        else if (type == "update") modifyBook(updatekey)
    })
    item.append(formBox)
}
// Navigasi Tab Deployment
const deploy = (type) => {
    const content = document.querySelector('.content')
    let container = ""
    container = (
        type == 'Home'? `<div id="home"><div id="bookshelf"></div></div>`
        : type == 'Search'? `<div id="search" class="card"></div>`
        : type == "Add"? `<div id="add" class="card"><h2 class="card-title">Add Book to Bookshelf</h2></div>`
        : `<div id="update" class="card"><h2 class="card-title">Update Book</h2></div>`
        )
    content.innerHTML = '';
    content.innerHTML = container
    content.dispatchEvent(new Event(LAYOUT_CHANGE))
}


// NAVIGASI TAB
let activeNav = document.querySelector('.activeli')
const switchtab = (target) => {
    activeNav.classList.remove('activeli')
    activeNav = target;
    activeNav.classList.add('activeli')
}
const navButtons = document.querySelectorAll('.navbtn')
for (navBtn of navButtons) {
    navBtn.addEventListener('click', (event) => {
        let item = event.target;
        let icon = item.firstChild;
        if (icon == null) {
            text = item.nextSibling == null? item.innerText: item.nextSibling.innerText;
            switchtab(item.parentElement)
        } else if (icon.nextSibling == null) {
            text = item.innerText
            switchtab(item.parentElement)
        } else {
            text = icon.nextSibling.innerText;
            switchtab(item)
        }
        deploy(text)
    })
}


// MANIPULASI LOCAL STORAGE
const BOOKS_KEY = 'BOOKS';
const SEARCHED_BOOK_KEY = "SBOOKS"
const loadDataFromStorage = (key) => {
    const serializedData = localStorage.getItem(key);
    let books = JSON.parse(serializedData);
    const result = []
    if (books !== null) {
        for (const book of books) {
            result.push(book);
        }
    } 
    return result
}

const editStorageData = (keys, bookid, doOperationOn) => {
    for (key of keys) {
        let bookshelf = loadDataFromStorage(key)
        doOperationOn(bookshelf, bookid);
        saveData(key, bookshelf)
    }
}

const isStorageExist = () => {
    if (typeof (Storage) === undefined) {
        alert("You're Browser do not support Local Storage");
        return false;
    }
    return true;
}

const saveData = (key, value) => {
    if (isStorageExist()) {
        const parsed = JSON.stringify(value);
        localStorage.setItem(key, parsed);
    }
}


// KONFIGURASI BUKU
// UNTUK TAB ADD & UPDATE
const generateId = () => {
    return +new Date();
}
const extractBookInfo = () => {
    const bookTitle = document.getElementById('title').value;
    const bookAuthor = document.getElementById('author').value;
    const bookYear = document.getElementById('year').value;
    const bookNote = document.getElementById('notes').value;
    const readingStatus = document.getElementById('readstat').checked;

    return {
        title: bookTitle, 
        author: bookAuthor, 
        year: bookYear, 
        notes: bookNote, 
        finishedReading: readingStatus}
}
const addBook = () => {
    const bookObject = extractBookInfo()
    bookObject.id = generateId()
    editStorageData([BOOKS_KEY], null, (bookshelf, bookid) => {bookshelf.push(bookObject)})
}
const modifyBook = (book) => {
    if (book == 0) {
        alert("The Book does not exist")
        return
    }
    const bookObject = extractBookInfo()
    deleteBook(book.id)
    bookObject.id = book.id
    editStorageData([BOOKS_KEY], null, (bookshelf, bookid) => {bookshelf.push(bookObject)})
    updatekey = 0;
    deploy('Home')
    switchtab(navButtons[0])
}
// UNTUK SEMUA TAB
let updatekey = 0;
const updateBook = (book) => {
    deploy('Update')
    const bookTitle = document.getElementById('title')
    const bookAuthor = document.getElementById('author')
    const bookYear = document.getElementById('year')
    const bookNote = document.getElementById('notes')
    const readingStatus = document.getElementById('readstat');
    bookTitle.value = book.title
    bookAuthor.value = book.author
    bookYear.value = book.year
    bookNote.value = book.notes
    readingStatus.checked = book.finishedReading
    switchtab(navButtons[3])
    updatekey = book
}
const searchBookIndex = (books, bookid) => {
    for (index in books) {
        if (books[index].id == bookid) return index
    }
    return null
}
const deleteBook = (bookid) => {
    editStorageData([SEARCHED_BOOK_KEY, BOOKS_KEY], bookid, (bookshelf, bookid) => {
        const index = searchBookIndex(bookshelf, bookid)
        bookshelf.splice(index, 1)
    })
    content.dispatchEvent(new Event(BOOKSHELF_CHANGE))
}
const transferBook = (bookid) => {
    editStorageData([SEARCHED_BOOK_KEY, BOOKS_KEY], bookid, (bookshelf, bookid) => {
        const index = searchBookIndex(bookshelf, bookid)
        if (bookshelf[index] != undefined) {
            bookshelf[index].finishedReading = !bookshelf[index].finishedReading
        }
    })
    content.dispatchEvent(new Event(BOOKSHELF_CHANGE))
}
// UNTUK TAB SEARCH
const searchBookTitle = (booktitle) => {
    const target = new RegExp(booktitle, 'i')
    let searchedBooks = []
    const allbooks = loadDataFromStorage(BOOKS_KEY)
    for (book of allbooks) {
        if (book.title.match(target) != null) {
            searchedBooks.push(book)
        }
    }
    saveData(SEARCHED_BOOK_KEY, searchedBooks)
}


// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
    deploy('Home')
})

const LAYOUT_CHANGE = 'layout-change'
const content = document.querySelector('.content')
content.addEventListener(LAYOUT_CHANGE, (event) => {
    const item = event.target;
    const child = item.firstChild;
    const type = child.getAttribute("id")
    if (type == 'home') {
        content.dispatchEvent(new Event(BOOKSHELF_CHANGE))
    } else if (type == 'search') {
        createSearchDisplay()
    } else {
        createBookFormDisplay(child)
    }
})

const BOOKSHELF_CHANGE = 'bookshelf-change'
content.addEventListener(BOOKSHELF_CHANGE, (event) => {
    const content = event.target
    const child = content.firstChild;
    const type = child.getAttribute("id")
    if (type == 'home') {
        books = loadDataFromStorage(BOOKS_KEY)
    } else if (type == 'search') {
        books = loadDataFromStorage(SEARCHED_BOOK_KEY)
    }
    createBookshelf(books)
})



// UPCOMING
const createBookInfo = (book) => {
    // Fitur untuk melihat info dari buku termasuk notes
}


