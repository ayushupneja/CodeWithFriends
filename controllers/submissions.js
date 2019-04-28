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

exports.runProblem = async function(req,res) {
    //console.log(req)
    console.log(req.body.problem_title)
    let identifier = Date.now().toString() + req.body.username
    if (req.body.problem_title === "" && req.body.function_definition === "") {
        let filename = identifier + '.' + req.body.language
        await postSubmission(req,res,filename);
        await setTimeout(() => {compileCode(identifier,filename,res,req.body.language)},2);
    } else {
        let language = req.body.language
        await writeFiles(req,res,identifier,language)
        await setTimeout(() => {compileFiles(req, res, identifier, language)},2);
    }
}

writeFiles = function(req,res,identifier,language) {
    let declaration = req.body.function_definition;
    let code = declaration + '{' + req.body.submission + '}'
    fs.writeFile('./submissions/' + identifier + '.' + language, code, function(err) {
        if(err) {
            res.send(err);
        }
    })

    if (language === "cpp" || language === "c") {
        fs.writeFile('./submissions/' + identifier + '.h', declaration + ';', function(err) {
            if(err) {
                res.send(err);
            }
        })
    }
}

postSubmission = function(req, res, filename) {
    var submission = req.body.submission;
    fs.writeFile('./submissions/' + filename, submission, function(err) {
        if(err) {
            res.send(err);
        }
    })
}

compileFiles = function(req, res, identifier, language) {
    console.log("hello!");
    let path = './submissions/main' + identifier + '.' + language
    let mainPath = './mains/' + req.body.problem_title + '/main.' + language;
    let include = '#include "' + identifier + '.h"\n';
    let mainCode = include + fs.readFileSync(mainPath,'utf8')

    fs.writeFileSync(path, mainCode);
    
    var compileInstruction;
    if (language === 'c')
        compileInstruction = 'gcc ' + path + ' ' + './submissions/' + identifier + '.c -o ./submissions/' + identifier;
    if (language === 'cpp')
        compileInstruction = 'g++ ' + path + ' ' + './submissions/' + identifier + '.cpp -o ./submissions/' + identifier;
    //if (language === 'py')
    //    compileInstruction = 'python3 submissions/' + path

    try {
        if (language === 'c' || language === 'cpp') {
            cp.execSync(compileInstruction, (e,stdout,stderr) => {
                if (e instanceof Error) {
                    res.send(e);
                }
            });

            cp.execSync('rm ' + './submissions/' + identifier + '.h' + ' ' + './submissions/' + identifier + '.' + language + ' ' + path);
            cp.execFile('submissions/' + identifier, (e,stdout,stderr) => {
                if (e instanceof Error) {
                    res.send(e);
                }
                console.log('stdout: ', stdout);
                console.log('stderr: ', stderr);
                let numCorrect = stdout.substring(stdout.lastIndexOf("Correct: ") + "Correct: ".length, stdout.lastIndexOf("\n"))
                let total = stdout.substring(stdout.lastIndexOf("Total: ") + "Total: ".length)
                res.json({
                    output: stdout,
                    total: total,
                    numCorrect: numCorrect,
                    score: req.body.submission.length
                })
            });
            cp.execSync('rm submissions/' + identifier);
        }
        if (language === 'py') {
            console.log("do this later! :)")
        }
    }
    catch(error) {
        cp.execSync('rm ' + './submissions/' + identifier + '.h' + ' ' + './submissions/' + identifier + '.' + language + ' ' + path);
        let abc = JSON.stringify(error.stderr.toString('utf8'));
        let errorOut = abc.substring(abc.indexOf("error")-1)
        errorOut = errorOut.replace(/\\n/g,"\n")
        res.json(
            {
                output: errorOut,
            }
        )
    }

        /*
        var output = [];
        push each line to output
      }
    /*
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
/*
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
            output: newError
          }
        )
        /*
        var output = [];
        push each line to output
      }
        */
    }

/*
    fs.writeFileSync(path, 'include "' + identifier + '.h' + '"', function(err) {
        if(err) {
            console.log("shit")
            res.send(err);
        } else {
            console.log("hello")
            fs.readFileSync(path, (err, code) => {
                if (err) {
                    res.send(err);
                } else {
                    console.log(code);
                }
            })
        }
    })
    */
    /*
    fs.appendFileSync(path, )


    fs.copyFileSync('./mains/' + req.body.problem_title + '/main.' + language, path, (err) => {
        if (err) {
            console.log("shit!")
            res.send(err);
        }
    });

    let buffer = Buffer.from('include "' + identifier + '.h' + '"');
    fs.openSync(path, 'w', function(err, fd) {
        console.log('whats going on')
        if (err) {
            console.log("shit2!")
            res.send(err)
        } else {
            fs.writeSync(fd, buffer, 0, buffer.length, 0, function(err) {
                if (err) {
                    console.log("shit3!")
                    res.send(err)
                }
                console.log("alkjsdlkfjasdf")
                fs.close(fd, function() {
                    console.log("wrote to file succesfully :)")
                })
            })
        }
    })
    
}
*/

compileCode = function(identifier,filename,res,language) {
    var compileInstruction;
    if (language === 'c')
        compileInstruction = 'gcc -o submissions/' + identifier + ' ' + 'submissions/' + filename
    if (language === 'cpp')
        compileInstruction = 'g++ -o submissions/' + identifier + ' ' + 'submissions/' + filename
    if (language === 'py')
        compileInstruction = 'python3 submissions/' + filename


    try {
        console.log("compile: " + compileInstruction)
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
        cp.execSync('rm ' + './submissions/' + identifier + '.' + language);
        let abc = JSON.stringify(error.stderr.toString('utf8'));
        let errorOut = abc.substring(abc.indexOf("error")-1)
        errorOut = errorOut.replace(/\\n/g,"\n")
        res.json(
            {
                output: errorOut,
            }
        )
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
