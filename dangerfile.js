const {eslintchecking,packagejsonchanging} =require("dangerrule")

eslintchecking()
packagejsonchanging()


//rule 3 check secrets file are changed:



const modifiedFiles=danger.git.modified_files

modifiedFiles.forEach((file=>{
    if(file=="secrets.env")
    {
        fail("Secrets env file are changed please monitor the secrets env file")
    }
}))



