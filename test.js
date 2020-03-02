const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

// BlogPost.create({
//     title: "The Mythbuster's Guide to Saving Money on Energy Bills",
//     body: "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favorite money topics, because once you get past the boring bullet point lists, a whole new world of thrifty nerdery opens up. You know those bullet point lists. You start spotting them everything at this time of the year. They go like this:"
// },  BlogPost.find({title: 'The Mythbuster's Guide to Saving Money on Energy Bills'
// }, (error, blogpost)=>{
//     console.log(error, blogspot);
// }));

var id = "5cb436980b33147489eadfbb";

BlogPost.findByIdAndDelete(id, (error, blogspot) =>{
    console.log(error,blogspot);
});