const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

exports.createCourse = async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        const savedCourse = await newCourse.save();


        res.status(201).json(savedCourse); 

    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
};


exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id); 
        if (!course) {
            return res.status(404).json({ message: 'couress no find غير موجود' }); 
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: 'الكورس غير موجود' });
        }
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
};



exports.deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id); // بيبحث ويحذف الكورس
        if (!deletedCourse) {
            return res.status(404).json({ message: 'couress not foundد' });
        }
        await Lesson.deleteMany({ courseID: req.params.id });
        res.status(200).json({ message: 'تdelete doneeeح.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};