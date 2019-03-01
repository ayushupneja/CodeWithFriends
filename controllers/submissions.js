var fs = require('fs');
var cp = require('child_process');

exports.test = async function(req,res) {
    var identifier = Date.now().toString() + req.body.username
    var filename = identifier + '.c'
    await postSubmission(req,res,filename);
    await setTimeout(() => {compileCode(identifier,filename,res)},2);
    /*
    var w = fs.watch('submissions/' + filename, {persistent : false}, () => {
        compileCode(identifier, filename,res);
        w.close();
    });
    */
}

// Create endpoint /submissions for POST
postSubmission = function(req, res, filename) {
    var submission = req.body.submission;
    fs.writeFile('./submissions/' + filename, submission, function(err) {
        if(err) {
            res.send(err);
        }
    })
}

compileCode = function(identifier,filename,res) {
    cp.execSync('gcc -o submissions/' + identifier + ' ' +  'submissions/' + filename, (e, stdout, stderr) => {
        if (e instanceof Error) {
            res.send(e);
        }
        console.log('stdout ',stdout);
        console.log('stderr ',stderr);
    });
    cp.execSync('rm submissions/' + filename);
    cp.execFile('submissions/' + identifier, (e, stdout, stderr) => {
        if (e instanceof Error) {
            res.send(e);
        }
        console.log('stdout ',stdout);
        console.log('stderr ',stderr);
        res.json({
            output: stdout
        })
    });
    cp.execSync('rm submissions/' + identifier);
}


// Have to set up queue here later for backlogged submissions

