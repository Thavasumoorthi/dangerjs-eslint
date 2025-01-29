const { execSync } = require("child_process")
const {eslintchecking,packagejsonchanging,ModifiedFiles,createdFilterAddedFiles} =require("dangerrule")

eslintchecking()
packagejsonchanging()



const latestmodifiedfile = execSync('git diff --name-only  --diff-filter=AM ').toString().split('\n').filter(Boolean);

console.log("latest modifed file is",latestmodifiedfile)



// if (danger.github.pr.title.length < 10) {
//     fail("PR title should be at least 10 characters long.");
//   }
  
//   if (!danger.github.pr.body || danger.github.pr.body.length < 20) {
//     fail("PR description should provide enough context (at least 20 characters).");
//   }



//   //Rule 6:Ensure PR have assignee
// const pr = danger.github.pr
// if (pr.assignee === null) {
//   fail("Please assign someone to merge this PR, and optionally include people who should review.");
// }


//rule 3 check secrets file are changed:

function secretFileChanged()
{
console.log("source modified file is ",ModifiedFiles)

console.log("get created and modified files from git",createdFilterAddedFiles)

  if(latestmodifiedfile.length>0){latestmodifiedfile.forEach((file=>{
    if(file=="secrets.js")
    {
        fail("Secrets env file are changed please monitor the secrets env file")
    }
}))
  }

}

secretFileChanged()


