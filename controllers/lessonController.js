const Lesson = require('../models/Lesson');
const Course = require('../models/Course');


exports.createLesson = async (req, res) => {
    try {
        const { courseID } = req.body;
        const courseExists = await Course.findById(courseID);
        if (!courseExists) {
            return res.status(404).json({ message: 'notfoundddddddد.' });
        }

        const newLesson = new Lesson(req.body);
        const savedLesson = await newLesson.save();
        res.status(201).json(savedLesson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllLessons = async (req, res) => {
    try {
        const { courseId } = req.query;
        let query = {};


        if (courseId) {
            query.courseID = courseId; 
        }
        const lessons = await Lesson.find(query).populate('courseID', 'title');
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. جلب درس واحد عن طريق الـ ID بتاعه
exports.getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id).populate('courseID', 'title');
        if (!lesson) {
            return res.status(404).json({ message: 'الدرس غير موجود' });
        }
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. تحديث بيانات درس عن طريق الـ ID بتاعه
exports.updateLesson = async (req, res) => {
    try {
        const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedLesson) {
            return res.status(404).json({ message: 'الدرس غير موجود' });
        }
        res.status(200).json(updatedLesson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 5. حذف درس عن طريق الـ ID بتاعه
exports.deleteLesson = async (req, res) => {
    try {
        const deletedLesson = await Lesson.findByIdAndDelete(req.params.id);
        if (!deletedLesson) {
            return res.status(404).json({ message: 'الدرس غير موجود' });
        }
        res.status(200).json({ message: 'تم حذف الدرس بنجاح.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLessonsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params; // الـ courseId بيجي من الـ URL (مثال: /api/lessons/course/123)
        const lessons = await Lesson.find({ courseID: courseId }).populate('courseID', 'title description');
        if (lessons.length === 0) {
            return res.status(404).json({ message: 'لا توجد دروس لهذا الكورس أو الكورس غير موجود.' });
        }
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};