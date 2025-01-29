import DangerClass from './sub.js'

class esLintCheck extends DangerClass{
    ruleChecker()
    {
        console.log("Eslint Rule Checking.....")
    }
}

class sensitiveFailChanging extends DangerClass{
    ruleChecker()
    {
        console.log("Sensitive fail are changed...")
        console.log("Sensitive fail are changed...")

    }
}

class consoleChecking extends DangerClass{
    ruleChecker()
    {
        console.log("console log checking...")
    }
}


const BaseRuleCheck=new DangerClass();

BaseRuleCheck.firstRukechecking();
BaseRuleCheck.secondRuleChecking()

 const escheck=new esLintCheck();
 escheck.ruleChecker();


 const sensitivefilecheck=new sensitiveFailChanging();
 sensitivefilecheck.ruleChecker();

const consoleCheck =new consoleChecking();
consoleCheck.ruleChecker()

