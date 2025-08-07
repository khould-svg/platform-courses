const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true    
    },
    description: {
        type: String,
        required: true
    },
    instructorID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: false
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // بيشير لنموذج الـ 'Category' (لو موجود عندك نموذج للفئات في المستقبل)
        required: false
    },
    price: {
        type: [String], 
        required: true
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'], 
        required: true
    },
    language: {
        type: String,
        required: true,
        trim: true
    },
    estimatedDuration: {
        type: Number, 
        required: true
    },
    coverImageURL: {
        type: String,
        required: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);