import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyA509kMbF8WLh_CN7fpQE4Conoehv86KiM",
    authDomain: "time-management-a2f4e.firebaseapp.com",
    databaseURL: "https://time-management-a2f4e.firebaseio.com",
    projectId: "time-management-a2f4e",
    storageBucket: "time-management-a2f4e.appspot.com",
    messagingSenderId: "1055659372237"
};
firebase.initializeApp(config);

const database = firebase.database()

// create a new database object

firebase.database().ref().set({
    name: 'nate',
    age: 33,
    stressLevel:7,
    location:{
        city:'Saigon',
        country:'viet nam'
    },
    job:{
      title:'lecturer',
      company:'tien ginag Uni',  
    }
});

//create new item in existing database

database.ref('name').set('nhat');
database.ref('attributes').set({
    height:63,
    weight:120,
})

database.ref('isSingle').set(false);

//removing item in database

database.ref('job/company').remove()
database.ref('isSingle').set(null);

//update items in database. update always takes object there is no point in updating single item
database.ref().update({
    stressLevel:8.5,
    'job/company':'free lancer',
    'location/city':'vancouver'
})

//fetching data

//fetch all data once
//fetch all value
database.ref().once('value').then((snapshot) => {
    const val = snapshot.val();
    console.log(val);
})

// //fetch selective data
database.ref('name').once('value').then((snapshot) => {
    const val = snapshot.val();
    console.log(val)
})

//subcripting to changes, this fetching medod does not require promise
database.ref().on('value', (snapshot) => {
    console.log(snapshot.val());
});

database.ref().on('value', (snapshot) => {
    const {name, age, job} = snapshot.val()
    console.log(`${name} is a ${job.title} at ${job.company}`)
})

// //working with array in firebase

  database.ref('notes').push({
    title:'learn phaser',
    body:'be very good at phaser'
  })

database.ref('expenses').push({
    description:'school tuition',
    note:'2 months late',
    amount:'400000'
})

database.ref('expenses').push({
    description:'new year',
    note:'for lucky money',
    amount:'10000000'
})

database.ref('expenses').push({
    description:'living',
    note:'4 months living',
    amount:'50000000'
})

//fetch data and turn them to array or our app

database.ref('expenses')
    .once('value')
    .then((snapshot) => {
        let array = [];
        snapshot.forEach(chilVal => {
            array.push({
                id:chilVal.key,
                ...chilVal.val()
            })
        });
        // console.log(array)
    })

database.ref('expenses').on('value', (snapshot) => {
    let array = [];
        snapshot.forEach(chilVal => {
            array.push({
                id:chilVal.key,
                ...chilVal.val()
        })
    console.log(snapshot.val())
});
});

// more firebase event handlers beside 'value'
// child_removed

database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.val())
});

//child_changed

database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.val())
});

//Child_added

database.ref('expenses').on('child_added', (snapshot) => {
    console.log(snapshot.val())
})