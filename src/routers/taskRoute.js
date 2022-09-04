const express       =   require('express');
const { ObjectId }  =   require('mongodb');
const { task }      =   require('../db/taskModel');
const auth          =   require('../middleware/auth');
const router        =   new express.Router();

//Add Task API 
router.post('/addTask', auth , async (req, res) =>{
    const taskDetails   =   new task({
        ...req.body,
        owner : req.user._id
    });
    try{
        await taskDetails.save();
        res.status(200).send(taskDetails);  
    }catch(error){
        res.status(400).send(error);
    }
});
//Get All Task
router.get('/getAllTask', auth ,  async(req, res) =>{
    try{
       const allTask =  await task.find({owner : req.user._id});
        res.status(200).send(allTask);
    }catch(error){
        console.log('error'+ error)
        res.status(400).send(error);
    }
});
// Get Task By Task Status [pagination & sorting]
router.get('/getTaskByStatus', auth , async(req, res) => {
    try{
        const limit         =   req.query.limit;
        const page          =   req.query.page;
        const taskDetails   =   await task.find({
            status  :   req.query.completed, 
            owner   :   req.user._id
        }).limit(limit * 1).skip((page - 1) * limit).sort({createdAt : -1}).exec();
        res.status(200).send(taskDetails);
    }catch(error){
        res.status(500).send(error);
    }    
});

// Get User By Unique Id
router.get('/getTaskById/:id', auth , async(req, res) => {
    try{
        const taksDetail = await task.findById({_id: req.params.id, owner:req.user._id});
            if(!taksDetail){
                return res.status(404).send({message : 'Oops! Task Not Found'});
            }
            res.status(200).send(taksDetail);
    }catch(error){
        res.status(400).send(error);
    }
});
// Update Task By Id
router.patch('/updateTaskById/:id', auth , async (req, res)=> {
    const updates        =   Object.keys(req.body);
    const allowUpdates   =   ['description', 'status','task'];
    const isValid        =   updates.every((update) => allowUpdates.includes(update));
    if(!isValid){
        return res.status(400).send({error : 'Invalid Update'});
    }

    try{
        const taskUpdate    =   await task.findOne({_id : req.params.id, owner : req.user._id});
        // const taskUpdate    =   await task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators : true});
        if(!taskUpdate){
            res.status(400).send({error: 'User Not Found!'});
        }
        updates.forEach((update) => taskUpdate[update] =  req.body[update]);
        await taskUpdate.save();
        res.status(200).send(taskUpdate);
    }catch(error){
        res.status(500).send(error);
    }
});
//Delete Task By Id
router.delete('/deleteTaskById/:id', auth , async(req, res) => {
    try{
        const deletedTask   =   await task.findOneAndDelete({_id: req.params.id, owner : req.user._id});
        if(!deletedTask){
            return res.status(400).send({error : 'Task Not Found!'});
        }
        res.status(200).send(deletedTask);
    }catch(error){
        res.status(500).send(error);
    }
});

module.exports  =   router;