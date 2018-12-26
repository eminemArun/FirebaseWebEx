const cafeList = document.querySelector('#tea-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let desc = document.createElement('span');
    //let weblink = document.createElement('span');
    //let imageurl = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    desc.textContent = doc.data().desc;
   // weblink.textContent = doc.data().weblink;
    //imageurl.textContent = doc.data().imageurl;
    cross.textContent = 'x';


    var imagelink = doc.data().imageurl;
    var element = document.createElement("a");
    element.setAttribute("href", imagelink);
    element.innerHTML = "Image Link";

    var weblink = doc.data().weblink;
    var webelement = document.createElement("a");
    webelement.setAttribute("href", weblink);
    webelement.innerHTML = "website Link";
// and append it to where you'd like it to go:

    li.appendChild(name);
    li.appendChild(desc);
    //li.appendChild(weblink);
    li.appendChild(webelement);
     li.appendChild(element);
    //li.appendChild(imageurl);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Teas').doc(id).delete();
    });
}

// getting data
// db.collection('cafes').orderBy('city').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });

// saving data
form.addEventListener('submit', (e) => {

    if (form.name.value.length == 0 || form.desc.value.length == 0 || form.weblink.value.length == 0) {
     alert("Require Filed are empty"); return false;
    }
    e.preventDefault();
    db.collection('Teas').add({
        name: form.name.value,
        desc: form.desc.value,
        weblink: form.weblink.value,
        imageurl: form.imageurl.value

    });
    form.name.value = '';
    form.desc.value = '';
     form.weblink.value = '';
    form.imageurl.value = '';
});

// real-time listener
db.collection('Teas').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});

// updating records (console demo)
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     name: 'mario world'
// });

// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     city: 'hong kong'
// });

// setting data
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').set({
//     city: 'hong kong'
// });