exports.heartbeat = (req,res,next) => {
    res.send({message: 'connected'});
}

