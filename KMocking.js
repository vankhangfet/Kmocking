
function getFuncName(funcCall)
{  
    let param = funcCall.toString();
    let tempData = param.split(".")[1];
    let targetFunc = tempData.split("(")[0];
    return targetFunc;
}

function Mock()
{   
    return {
        
        mole: function(obj)
        {   
            this.mole = obj;
            this.exec = [];
            this.targetsFunc = [];
            return this;
        },

        setup: function(funcCall)
        {  
           //let param = funcCall.toString();
           //let tempData = param.split(".")[1];
           //let targetFunc = tempData.split("(")[0];

           let  targetFunc = getFuncName(funcCall);

           this.exec[targetFunc] = 0;
           this.targetsFunc[targetFunc] = targetFunc;
           this.targetFunc = targetFunc; 
           return this;
        },
        returns: function(value)
        {    
            let invokeFun = this.targetFunc;
            this.targetFunc = "";
            this.mole.mockval = this;
            this.mole[invokeFun] = function() {
                this.mockval.exec[invokeFun]++;
                //console.log(this.mockval);
                return value;
            }

            return this;
        },
        verify: function(func,times)
        {   
           
            let  nameFunc = getFuncName(func);
            let currentInvoke = this.exec[nameFunc];
            //console.log(this.exec[this.targetFunc]);
            if(times.checkingType == InvokeType.exactly)
               return currentInvoke == times.times?true:false;
            if(times.checkingType == InvokeType.atLeast)
               return currentInvoke >= times.times?true:false;
        },
        throws: function(errorMessage)
        {   this.errorMessage = errorMessage;
            return this.errorMessage;
        }

    }
}

let InvokeType = {
    exactly: 'exactly',
    atLeast: 'atLeast'
}

function Times()
{   
    return {
      
        exact: function(times){
            return {
                     times: times,
                     checkingType: InvokeType.exactly
                   }
        },
        atLeast: function(times)
        {
            return {
                times:times,
                checkingType: InvokeType.atLeast
            };
        }

    };
}

module.exports = {
    Mock:Mock,
    Times: new Times()
}