var fs = require('fs');
var cp = require('child_process');

exports.test = async function(req,res) {
    var identifier = Date.now().toString() + req.body.username
    var filename = identifier + '.' + req.body.language
    await postSubmission(req,res,filename);
    await setTimeout(() => {compileCode(identifier,filename,res,req.body.language)},2);
    /*
    var w = fs.watch('submissions/' + filename, {persistent : false}, () => {
        compileCode(identifier, filename,res);
        w.close();
    });
    */
}

postSubmission = function(req, res, filename) {
    var submission = req.body.submission;
    fs.writeFile('./submissions/' + filename, submission, function(err) {
        if(err) {
            res.send(err);
        }
    })
}

compileCode = function(identifier,filename,res,language) {
    var compileInstruction;
    if (language === 'c')
        compileInstruction = 'gcc -o submissions/' + identifier + ' ' + 'submissions/' + filename
    if (language === 'cpp')
        compileInstruction = 'g++ -o submissions/' + identifier + ' ' + 'submissions/' + filename
    if (language === 'py')
        compileInstruction = 'python3 submissions/' + filename

    try {
        if (language === 'c' || language === 'cpp') {
            cp.execSync(compileInstruction, (e,stdout,stderr) => {
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

        if (language === 'py') {
            cp.exec('python3 submissions/' + filename, (e, stdout, stderr) => {
                /*
                if (e instanceof Error) {
                    res.send(e);
                }
                */

                console.log('stdout ', stdout);
                console.log('stderr ',stderr);
                if (e instanceof Error) {
                    res.json({
                        output: stderr
                    })
                } else {
                    res.json({
                        output: stdout
                    })
                }
            });
        }
    }
    catch(error) {
        console.log('bruh')
        console.log(Object.keys(error));
        var abc = JSON.stringify(error.stderr.toString('utf8'))
        console.log(abc.indexOf("error"))
        var errorOut = abc.substring(abc.indexOf("error")-1)
        var errorOut2 = errorOut.substring(errorOut.indexOf("line")-1)
        var newError = errorOut.replace("\n","<br\>")
        console.log(newError)
        res.json(
          {
            output: errorOut2
          }
        )
        /*
        var output = [];
        push each line to output
      }
        */
    }
}
    /*
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
    */



// Have to set up queue here later for backlogged submissions
// Have to run things concurrently later
