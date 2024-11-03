import mongoose from 'mongoose'

//DEFINING BOOK SCHEMA (FIRST A SCHEM ADEFINE KORTE HOY)
const bookSchema = new mongoose.Schema(
    {
        bookName : {type : String, required : true },
        authorName : {type : String, required : true },
        edition : {type : String },
        publish : {type : String, required : true },
        stock : {type : Number, required : true },
        insertedDate : {type : Date, default: Date.now },         
    
    }
) 

//CREATING MODEL  (THEN OI SCHEMA USE KORE MODEL CREATE KORTE HOY)
 const BookModel = mongoose.model( 'bookinformation', bookSchema)

 export default BookModel