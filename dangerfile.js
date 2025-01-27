const {eslintchecking,packagejsonchanging} =require("dangerrule")

eslintchecking()
packagejsonchanging()


//rule 3 check secrets file are changed:



const modifiedFiles=danger.git.modified_files || danger.git.created_files
console.log("++++++Modified file is",modifiedFiles)
modifiedFiles.forEach((file=>{
    if(file=="secrets.js")
    {
        fail("Secrets env file are changed please monitor the secrets env file")
    }
}))



