const Meeting = require('../models/meeting');

exports.addMeeting = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const time = req.body.time;

    Meeting.create({
        name: name,
        email: email,
        time: time,
    })
    .then((newMeeting) => {
        console.log('Meeting added!');
        res.status(201).json({newMeetingDetail: newMeeting});
    })
    .catch(err => console.log(err));
} 

exports.getAllMeetings = (req, res, next) => {
    Meeting.findAll()
    .then((meetings) => {
        res.status(200).json({allMeetings: meetings});
    })
    .catch(err => console.log(err));
}

exports.deleteMeeting = (req, res, next) => {
    const meetingId = req.params.id;
    Meeting.destroy({where: {id: meetingId}})
    .then(() => {
        console.log('Meeting deleted!');
        res.status(200).json({deletedMeeting: meetingId});
    })
    .catch(err => console.log(err));
}